import { Show, createSignal } from "solid-js";

import styles from "./CreateEditDialg.module.scss";
import { Dialog } from "../layout";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  FileField,
} from "../form";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";
import _ from "lodash";
import { createStore } from "solid-js/store";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService } from "../../services";
import { MediaUploadEncoding } from "../../services/peoplesmarkets/media/v1/media";
import { readFileBase64 } from "../../lib";
import { grpc } from "@improbable-eng/grpc-web";

type Props = {
  readonly marketBoothId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditImageDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [form, setForm] = createStore({
    image: undefined as File | undefined,
  });
  const [errors, setErrors] = createStore({
    image: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);
  const [deleteConfirmation, setDeleteConfirmation] = createSignal(false);

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(form.image)) {
      setErrors("image", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      await marketBoothService.updateImage({
        marketBoothId: props.marketBoothId,
        image: {
          name: form.image.name,
          encoding: MediaUploadEncoding.MEDIA_UPLOAD_ENCODING_BASE64,
          data: await readFileBase64(form.image, 0, form.image.size),
        },
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

      throw err;
    }
  }

  async function deleteImage() {
    await marketBoothService.removeImage(props.marketBoothId);
    props.onUpdate();
    props.onClose();
  }

  function handleImageInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      setForm("image", _.first(files));
    }
  }

  function resetErrors() {
    setErrors({ image: [] });
  }

  function removeImage() {
    setDeleteConfirmation(true);
  }

  function closeDialog() {
    if (_.isNil(form.image)) {
      props.onClose();
    } else {
      setDiscardConfirmation(true);
    }
  }

  function confirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    setDiscardConfirmation(false);
    setDeleteConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS["market-booth"]["edit-image"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <FileField
              name="image"
              label="image"
              required
              errors={errors.image}
              onValue={handleImageInput}
            />
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton actionType="danger" onClick={removeImage}>
              <Trans key={TKEYS["market-booth"]["delete-image"]} />
            </ActionButton>
            <ActionButton actionType="active-filled" onClick={updateImage}>
              <Trans key={TKEYS.form.action.Save} />
            </ActionButton>
          </div>
        </Dialog>
      </Show>

      <Show when={deleteConfirmation()}>
        <DeleteConfirmation
          message={trans(TKEYS["market-booth"]["delete-confirmation-message"])}
          onCancel={continueEditing}
          onConfirmation={deleteImage}
        />
      </Show>
      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
