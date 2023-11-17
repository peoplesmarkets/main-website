import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { ProgressBar } from "../../../components/assets/ProgressBar";
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
import {
  MediaResponse,
  Part,
} from "../../../services/peoplesmarkets/media/v1/media";
import { MyShopData } from "../MyShopData";

const CHUNKSIZE = 1024 * 1024 * 5;

type Props = {
  readonly offerId?: string | undefined;
  readonly show: boolean;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function CreateMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { mediaService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

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
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

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

      handleConfirmCloseDialog();
      props.onUpdate();
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

    const shopId = shopData.shop()?.shopId;

    if (_.isNil(shopId)) {
      throw new Error("No shopId");
    }

    const response = await mediaService.create({
      shopId,
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

    const shopId = shopData.shop()?.shopId;

    if (_.isNil(shopId)) {
      throw new Error("No shopId");
    }

    const response = await mediaService.create({
      shopId,
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
      handleConfirmCloseDialog();
    } else {
      setShowDiscardConfirmation(true);
    }
  }

  function handleConfirmCloseDialog() {
    setForm({ name: undefined, file: undefined });
    setShowDiscardConfirmation(false);
    setUploading(false);
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
          <Font type="title" key={TKEYS.dashboard.media["create-new-file"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleAddMedia}>
            <Show
              when={!uploading()}
              fallback={
                <ProgressBar
                  total={form.file?.size}
                  current={() => uploadedBytes()}
                />
              }
            >
              <MdTextField
                label={trans(TKEYS.media.labels.name)}
                value={form.name}
                onValue={handleNameInput}
                error={!_.isEmpty(errors.name)}
                errorText={errors.name}
              />

              <FileField
                label={trans(TKEYS.media.labels.file)}
                required
                errors={errors.file}
                onValue={handleFileInput}
              />
            </Show>
          </Form>
        </div>

        <div slot="actions">
          <ActionButton
            actionType="neutral-borderless"
            onClick={handleCloseDialog}
            disabled={uploading()}
          >
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
