import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MediaService } from "../../services";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { ProgressBar } from "../assets/ProgressBar";
import {
  ActionButton,
  DiscardConfirmation,
  FileField,
  TextField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly media: () => MediaResponse;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const mediaService = new MediaService(accessToken);

  const [form, setForm] = createStore({
    name: undefined as string | undefined,
    file: undefined as File | undefined,
  });
  const [errors, setErrors] = createStore({
    name: [] as string[],
    file: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (
      !_.isNil(props.media().name) &&
      !_.isEmpty(props.media().name) &&
      _.isEmpty(form.name)
    ) {
      setForm("name", props.media().name);
    }
  });

  async function handleAddMedia(event: SubmitEvent) {
    event.preventDefault();

    setUploading(true);

    try {
      const file = form.file
        ? {
            contentType: form.file.type,
            data: await readAsUint8Array(form.file, 0, form.file.size),
          }
        : undefined;

      await mediaService.update({
        mediaId: props.media().mediaId,
        name: form.name,
        file,
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
          title={trans(TKEYS.dashboard.media["edit-file"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleAddMedia}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <TextField
                label={trans(TKEYS.media.labels.name)}
                value={form.name}
                onValue={handleNameInput}
                errors={errors.name}
              />

              <FileField
                label={trans(TKEYS.media.labels.file)}
                errors={errors.file}
                onValue={handleFileInput}
              />
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={handleAddMedia}
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
