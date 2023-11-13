import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { readAsUint8Array } from "../../lib";
import { resizeImage } from "../../lib/image";
import { TKEYS } from "../../locales";
import { getAllowedTypesFromError, getMaxSizeFromError } from "../../services";
import { ProgressBar } from "../assets/ProgressBar";
import { ActionButton, DiscardConfirmation, FileField } from "../form";
import { Dialog } from "../layout";
import commonStyles from "./CreateEditDialg.module.scss";
import styles from "./CreateOfferImageDialog.module.scss";

type Props = {
  readonly offerId: string;
  readonly lastOrdering: number;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function CreateOfferImageDialog(props: Props) {
  const [trans] = useTransContext();

  const { offerService } = useServiceClientContext();

  const [form, setForm] = createStore({
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
    ordering: undefined as number | undefined,
  });

  const [errors, setErrors] = createStore({
    image: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isNil(form?.ordering)) {
      setForm("ordering", props.lastOrdering + 1);
    }
  });

  async function handleAddImage(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(form.image)) {
      setErrors("image", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    setUploading(true);

    try {
      await offerService.addImage({
        offerId: props.offerId,
        image: {
          contentType: "image/webp",
          data: await readAsUint8Array(form.image, 0, form.image.size),
        },
        ordering: form.ordering!,
      });
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);
      if (err.code) {
        if (err.code === grpc.Code.ResourceExhausted) {
          const toLarge = trans(TKEYS.form.errors["item-too-large-size"], {
            item: trans(TKEYS.common.file),
            maxSize: getMaxSizeFromError(err),
          });
          setErrors("image", [toLarge]);
          return;
        }
        if (err.code === grpc.Code.InvalidArgument) {
          const wrongType = trans(TKEYS.form.errors["wrong-type"], {
            types: getAllowedTypesFromError(err),
          });
          setErrors("image", [wrongType]);
          return;
        }
      }

      throw err;
    }
  }

  async function handleImageInput(files: FileList | null) {
    resetErrors();
    const file = _.first(files);
    if (!_.isNil(file)) {
      const file = _.first(files)!;
      const resized = await resizeImage(URL.createObjectURL(file), 800, 800);
      setForm("image", resized);
      setForm("imageUrl", URL.createObjectURL(resized));
    } else {
      setForm("image", undefined);
      setForm("imageUrl", undefined);
    }
  }

  function resetErrors() {
    setErrors({ image: [] });
  }

  function formHasErrors(): boolean {
    return !_.isEmpty(errors.image);
  }

  function handleCloseDialog() {
    if (_.isNil(form.image)) {
      props.onClose();
    } else {
      setDiscardConfirmation(true);
    }
  }

  function handleConfirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function handleContinueEditing() {
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.offers["add-image"])}
          onClose={handleCloseDialog}
        >
          <form class={commonStyles.Form} onSubmit={handleAddImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label="image"
                required
                errors={errors.image}
                onValue={handleImageInput}
              />

              <Show when={!_.isEmpty(form.imageUrl)}>
                <div class={styles.MainImage}>
                  <div class={styles.ImageContainer}>
                    <img class={styles.Image} src={form.imageUrl} alt="" />
                  </div>
                </div>
              </Show>
            </Show>

            <div class={commonStyles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={handleAddImage}
                disabled={formHasErrors() || uploading()}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={handleContinueEditing}
          onDiscard={handleConfirmCloseDialog}
        />
      </Show>
    </>
  );
}
