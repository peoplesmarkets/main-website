import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readFileBase64 } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import { MediaUploadEncoding } from "../../services/peoplesmarkets/media/v1/media";
import { ActionButton, DiscardConfirmation, FileField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

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

    try {
      await offerService.addImage({
        offerId: props.offerId,
        image: {
          name: form.image.name,
          encoding: MediaUploadEncoding.MEDIA_UPLOAD_ENCODING_BASE64,
          data: await readFileBase64(form.image, 0, form.image.size),
        },
        ordering: form.ordering!,
      });
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      if (err.code) {
        if (err.code === grpc.Code.ResourceExhausted) {
          setErrors("image", [
            trans(TKEYS.form.errors["item-too-large"], {
              item: trans(TKEYS.common.file),
            }),
          ]);
          return;
        }
        if (err.code === grpc.Code.InvalidArgument) {
          setErrors("image", [trans(TKEYS.form.errors["wrong-type"])]);
          return;
        }
      }

      return;
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
      } else {
        setForm("image", _.first(files));
      }
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
            <FileField
              name="image"
              label="image"
              required
              errors={errors.image}
              onValue={handleImageInput}
            />
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              onClick={handleAddImage}
              disabled={formHasErrors()}
            >
              <Trans key={TKEYS.form.action.Save} />
            </ActionButton>
          </div>
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
