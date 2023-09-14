import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MediaService } from "../../services";
import { Part } from "../../services/peoplesmarkets/media/v1/media";
import { ProgressBar } from "../assets/ProgressBar";
import {
  ActionButton,
  DiscardConfirmation,
  FileField,
  TextField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

const CHUNKSIZE = 1024 * 1024 * 5;

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
  const [uploadedBytes, setUploadedBytes] = createSignal<number>();
  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  async function handleAddMedia(event: SubmitEvent) {
    event.preventDefault();

    setUploading(true);

    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      if (form.file.size < CHUNKSIZE) {
        await uploadSimple();
      } else {
        await uploadMultipart();
      }
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);
      console.error(err);
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

  async function uploadSimple() {
    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    await mediaService.create({
      marketBoothId: props.marketBoothId,
      name: form.name || form.file.name,
      file: {
        contentType: form.file.type,
        data: await readAsUint8Array(form.file, 0, form.file.size),
      },
    });
  }

  async function uploadMultipart() {
    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    const media = (
      await mediaService.create({
        marketBoothId: props.marketBoothId,
        name: form.name || form.file.name,
      })
    ).media;

    if (_.isNil(media)) {
      setUploading(false);
      return;
    }

    const initialized = await mediaService.initiateMultipartUpload({
      mediaId: media.mediaId,
      contentType: form.file.type,
    });

    let totalRead = 0;
    let partNumber = 1;
    const parts: Part[] = [];

    for (let i = 0; i <= form.file.size; i += CHUNKSIZE) {
      const end = i + CHUNKSIZE;
      const chunk = await readAsUint8Array(form.file, i, end);
      totalRead += chunk.length;
      const part = await mediaService.putMultipartChunk({
        mediaId: media.mediaId,
        uploadId: initialized.uploadId,
        partNumber,
        chunk,
      });
      partNumber += 1;
      parts.push(part.part!);
      setUploadedBytes(totalRead);
    }

    await mediaService.completeMultipartUpload({
      mediaId: media.mediaId,
      uploadId: initialized.uploadId,
      parts,
    });
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
            <Show
              when={!uploading()}
              fallback={
                <ProgressBar
                  total={form.file?.size}
                  current={() => uploadedBytes()}
                />
              }
            >
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
