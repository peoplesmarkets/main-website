import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MediaService } from "../../services";
import {
  MediaResponse,
  Part,
} from "../../services/peoplesmarkets/media/v1/media";
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
  readonly offerId?: string;
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
      let media: MediaResponse;
      if (form.file.size < CHUNKSIZE) {
        media = await uploadSimple();
      } else {
        media = await uploadMultipart();
      }

      if (!_.isNil(props.offerId)) {
        await mediaService.addMediaToOffer({
          mediaId: media.mediaId,
          offerId: props.offerId,
        });
      }

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

  async function uploadSimple(): Promise<MediaResponse> {
    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      throw new Error();
    }

    const response = await mediaService.create({
      marketBoothId: props.marketBoothId,
      name: form.name || form.file.name,
      file: {
        contentType: form.file.type,
        data: await readAsUint8Array(form.file, 0, form.file.size),
      },
    });

    return response.media!;
  }

  async function uploadMultipart(): Promise<MediaResponse> {
    if (_.isNil(form.file)) {
      setErrors("file", [trans(TKEYS.form.errors["required-field"])]);
      throw new Error();
    }

    const response = await mediaService.create({
      marketBoothId: props.marketBoothId,
      name: form.name || form.file.name,
    });

    if (_.isNil(response.media)) {
      setUploading(false);
      throw new Error();
    }

    const initialized = await mediaService.initiateMultipartUpload({
      mediaId: response.media.mediaId,
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
        mediaId: response.media.mediaId,
        uploadId: initialized.uploadId,
        partNumber,
        chunk,
      });
      partNumber += 1;
      parts.push(part.part!);
      setUploadedBytes(totalRead);
    }

    await mediaService.completeMultipartUpload({
      mediaId: response.media.mediaId,
      uploadId: initialized.uploadId,
      parts,
    });

    return response.media;
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
