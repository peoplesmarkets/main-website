import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { ProgressBar } from "../../../components/assets/ProgressBar";
import { Font } from "../../../components/content";
import { ActionButton, FileField, Form } from "../../../components/form";
import { DiscardConfirmationDialog } from "../../../components/form/DiscardConfirmationDialog";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { readAsUint8Array } from "../../../lib";
import { resizeImage } from "../../../lib/image";
import { TKEYS } from "../../../locales";
import {
  getAllowedTypesFromError,
  getMaxSizeFromError,
} from "../../../services";
import styles from "./CreateOfferImageDialog.module.scss";

type Props = {
  readonly show: boolean;
  readonly offerId: string | undefined;
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
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isNil(form?.ordering)) {
      setForm("ordering", props.lastOrdering + 1);
    }
  });

  async function handleAddImage(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(props.offerId)) {
      return;
    }

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
      handleConfirmCloseDialog();
    } else {
      setShowDiscardConfirmation(true);
    }
  }

  function handleConfirmCloseDialog() {
    setForm({ image: undefined, imageUrl: undefined, ordering: undefined });
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function handleContinueEditing() {
    setShowDiscardConfirmation(false);
  }

  return (
    <>
      <MdDialog
        open={props.show && !showDiscardConfirmation()}
        onClose={handleCloseDialog}
      >
        <div slot="headline">
          <Font type="title" key={TKEYS.dashboard.offers["add-image"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleAddImage}>
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
          </Form>
        </div>

        <div slot="actions">
          <ActionButton actionType="neutral-borderless" onClick={handleCloseDialog}>
            <Trans key={TKEYS.form.action.Close} />
          </ActionButton>

          <ActionButton
            actionType="active-filled"
            submit
            onClick={handleAddImage}
            disabled={formHasErrors() || uploading()}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </MdDialog>

      <DiscardConfirmationDialog
        show={showDiscardConfirmation()}
        onCancel={handleContinueEditing}
        onDiscard={handleConfirmCloseDialog}
      />
    </>
  );
}
