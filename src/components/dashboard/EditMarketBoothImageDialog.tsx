import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  FileField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";
import { ProgressBar } from "../assets";

type Props = {
  readonly marketBoothId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditMarketBoothImageDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [form, setForm] = createStore({
    image: undefined as File | undefined,
  });
  const [errors, setErrors] = createStore({
    image: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(form.image)) {
      setErrors("image", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    setUploading(true);

    try {
      await marketBoothService.updateImage({
        marketBoothId: props.marketBoothId,
        image: {
          contentType: "",
          data: await readAsUint8Array(form.image, 0, form.image.size),
        },
      });
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);

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
    setShowDeleteConfirmation(true);
  }

  function closeDialog() {
    if (_.isNil(form.image)) {
      props.onClose();
    } else {
      setShowDiscardConfirmation(true);
    }
  }

  function confirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    setShowDiscardConfirmation(false);
    setShowDeleteConfirmation(false);
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS["market-booth"]["edit-image"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                name="image"
                label="image"
                required
                errors={errors.image}
                onValue={handleImageInput}
              />
            </Show>
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

      <Show when={showDeleteConfirmation()}>
        <DeleteConfirmation
          message={trans(TKEYS.image["delete-confirmation-message"])}
          onCancel={continueEditing}
          onConfirmation={deleteImage}
        />
      </Show>
      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
