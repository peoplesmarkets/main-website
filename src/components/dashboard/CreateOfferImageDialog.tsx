import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales";
import {
  OfferService,
  getAllowedTypesFromError,
  getMaxSizeFromError,
} from "../../services";
import { ActionButton, DiscardConfirmation, FileField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";
import { ProgressBar } from "../assets/ProgressBar";

type Props = {
  readonly offerId: string;
  readonly lastOrdering: number;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function CreateOfferImageDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [form, setForm] = createStore({
    image: undefined as File | undefined,
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
          contentType: "",
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

  function handleImageInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      const file = _.first(files)!;
      if (file.size > import.meta.env.VITE_IMAGE_MAX_SIZE) {
        setErrors("image", [
          trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.common.file),
          }),
        ]);
        return;
      }

      setForm("image", file);
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
          <form class={styles.Form} onSubmit={handleAddImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label="image"
                required
                errors={errors.image}
                onValue={handleImageInput}
              />
            </Show>

            <div class={styles.DialogFooter}>
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
