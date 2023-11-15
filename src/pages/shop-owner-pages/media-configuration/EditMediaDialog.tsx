import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { ProgressBar } from "../../../components/assets";
import { Font } from "../../../components/content";
import {
  ActionButton,
  FileField,
  Form,
  MdTextField,
} from "../../../components/form";
import { DiscardConfirmationDialog } from "../../../components/form/DiscardConfirmationDialog";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { readAsUint8Array } from "../../../lib";
import { TKEYS } from "../../../locales";
import { MediaResponse } from "../../../services/peoplesmarkets/media/v1/media";

type Props = {
  readonly media: MediaResponse | undefined;
  readonly show: boolean;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { mediaService } = useServiceClientContext();

  const [form, setForm] = createStore({
    name: undefined as string | undefined,
    file: undefined as File | undefined,
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    file: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (props.show) {
      setForm("name", props.media?.name);
    }
  });

  async function handleAddMedia(event: SubmitEvent) {
    event.preventDefault();

    const mediaId = props.media?.mediaId;

    if (_.isNil(mediaId)) {
      return;
    }

    setUploading(true);

    try {
      const file = form.file
        ? {
            contentType: form.file.type,
            data: await readAsUint8Array(form.file, 0, form.file.size),
          }
        : undefined;

      await mediaService.update({
        mediaId,
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
    if (!_.isNil(form.file) || form.name !== props.media?.name) {
      setShowDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleConfirmCloseDialog() {
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
          <Font type="title" key={TKEYS.dashboard.media["edit-file"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleAddMedia}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <MdTextField
                type="text"
                value={form.name}
                label={trans(TKEYS.media.labels.name)}
                onValue={handleNameInput}
                error={!_.isEmpty(errors.name)}
                errorText={errors.name}
              />

              <FileField
                label={trans(TKEYS.media.labels.file)}
                errors={errors.file}
                onValue={handleFileInput}
              />
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
            onClick={handleAddMedia}
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
