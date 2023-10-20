import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { EditMediaDialog } from "../dashboard/EditMediaDialog";
import { ActionButton, DeleteConfirmation } from "../form";
import styles from "./MediaList.module.scss";

type Props = {
  medias: () => MediaResponse[] | undefined;
  onUpdate: () => void;
  offer?: () => OfferResponse;
};

export function MediaList(props: Props) {
  const [trans] = useTransContext();

  const { mediaService } = useServiceClientContext();

  const [showEditMedia, setShowEditMedia] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  const [mediaToEdit, setMediaToEdit] = createSignal<MediaResponse>();
  const [mediaToDelete, setMediaToDelete] = createSignal<MediaResponse>();

  const [errors, setErrors] = createStore<Record<string, string>>();

  function handleOpenEditMedia(media: MediaResponse) {
    setMediaToEdit(media);
    setShowEditMedia(true);
  }

  function handleStartDelete(media: MediaResponse) {
    setMediaToDelete(media);
    setShowDeleteConfirmation(true);
  }

  function handleCancelEdit() {
    setShowEditMedia(false);
    setShowDeleteConfirmation(false);
  }

  async function handleDeleteConfirmation() {
    const mediaId = mediaToDelete()?.mediaId;
    if (!_.isNil(mediaId) && !_.isEmpty(mediaId)) {
      try {
        setShowDeleteConfirmation(false);
        const offer = props.offer?.();
        if (!_.isNil(offer)) {
          await mediaService.removeMediaFromOffer({
            mediaId,
            offerId: offer.offerId,
          });
        }
        await mediaService.delete(mediaId);
        props.onUpdate();
      } catch (err: any) {
        if (err.code && err.code === grpc.Code.FailedPrecondition) {
          setErrors(
            mediaId,
            trans(TKEYS.media.errors["still-part-of-an-offer"])
          );
        } else {
          throw err;
        }
      }
    }
  }

  return (
    <>
      <div class={styles.MediaList}>
        <For each={props.medias()}>
          {(media) => (
            <div class={styles.Row}>
              <span class={styles.Label}>{media.name}</span>

              <Show
                when={
                  !_.isNil(errors[media.mediaId]) &&
                  !_.isEmpty(errors[media.mediaId])
                }
              >
                <span class={styles.Errors}>{errors[media.mediaId]}</span>
              </Show>

              <div class={styles.RowActions}>
                <ActionButton
                  actionType="neutral"
                  small
                  onClick={() => handleOpenEditMedia(media)}
                >
                  <Trans key={TKEYS.form.action.Edit} />
                </ActionButton>
                <ActionButton
                  actionType="danger"
                  small
                  onClick={() => handleStartDelete(media)}
                >
                  <Trans key={TKEYS.form.action.Delete} />
                </ActionButton>
              </div>
            </div>
          )}
        </For>
      </div>

      <Show when={showEditMedia()}>
        <EditMediaDialog
          media={() => mediaToEdit()!}
          onClose={handleCancelEdit}
          onUpdate={props.onUpdate}
        />
      </Show>
      <Show when={showDeleteConfirmation()}>
        <DeleteConfirmation
          item={trans(TKEYS.media.Title)}
          itemName={mediaToDelete()?.name}
          onCancel={handleCancelEdit}
          onConfirmation={handleDeleteConfirmation}
        />
      </Show>
    </>
  );
}
