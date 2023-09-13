import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readFileBase64 } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MediaService } from "../../services";
import { MediaUploadEncoding } from "../../services/peoplesmarkets/media/v1/media";
import { LoadingBar } from "../assets/LoadingBar";
import {
  ActionButton,
  DiscardConfirmation,
  FileField,
  TextField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly marketBoothId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function CreateMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const mediaService = new MediaService(accessToken);

  const [form, setForm] = createStore({
    name: "",
    file: undefined as File | undefined,
  });
  const [errors, setErrors] = createStore({
    name: [] as string[],
    file: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  async function handleAddMedia(event: SubmitEvent) {
    event.preventDefault();

    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    setUploading(true);

    try {
      await mediaService.create({
        marketBoothId: props.marketBoothId,
        name: form.name || form.file.name,
        data: {
          name: form.file.name,
          encoding: MediaUploadEncoding.MEDIA_UPLOAD_ENCODING_BASE64,
          data: await readFileBase64(form.file, 0, form.file.size),
        },
      });
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);

      if (
        err.code === grpc.Code.ResourceExhausted ||
        err.code === grpc.Code.OutOfRange
      ) {
        setErrors("file", [
          trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.media.Title),
          }),
        ]);
      } else if (err.code === grpc.Code.InvalidArgument) {
        setErrors("file", [trans(TKEYS.form.errors["wrong-type"])]);
      } else {
        throw err;
      }
    }
  }

  function handleFileInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      const file = _.first(files)!;
      if (file.size > import.meta.env.VITE_FILE_MAX_SIZE) {
        setErrors("file", [
          trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.media.Title),
          }),
        ]);
      } else {
        setForm("file", file);
      }
    }
  }

  function resetErrors() {
    setErrors({ file: [] });
  }

  function formHasErrors(): boolean {
    return !_.isEmpty(errors.file);
  }

  function handleNameInput(value: string) {
    setForm("name", value);
  }

  function handleCloseDialog() {
    if (_.isNil(form.file)) {
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
          title={trans(TKEYS.dashboard.media["create-new-file"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleAddMedia}>
            <Show when={!uploading()} fallback={<LoadingBar />}>
              <TextField
                name={trans(TKEYS.media.labels.name)}
                label={trans(TKEYS.media.labels.name)}
                value={form.name}
                onValue={handleNameInput}
                errors={errors.name}
              />

              <FileField
                name={trans(TKEYS.media.labels.file)}
                label={trans(TKEYS.media.labels.file)}
                required
                errors={errors.file}
                onValue={handleFileInput}
              />
            </Show>
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              onClick={handleAddMedia}
              disabled={formHasErrors() || uploading()}
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
