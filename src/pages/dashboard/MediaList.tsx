import { grpc } from "@improbable-eng/grpc-web";
import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import {
  DragDropProvider,
  DragDropSensors,
  SortableProvider,
  closestCenter,
} from "@thisbeyond/solid-dnd";
import { MdList } from "../../components/content/MdList";
import { DeleteConfirmationDialog } from "../../components/form/DeleteConfirmationDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { MediaListItem } from "./MediaListItem";
import { EditMediaDialog } from "./media-configuration/EditMediaDialog";

type Props = {
  medias: MediaResponse[] | undefined;
  onUpdate: () => void;
  offer?: OfferResponse | undefined;
};

export function MediaList(props: Props) {
  const [trans] = useTransContext();

  const { mediaService } = useServiceClientContext();

  const [showEditMedia, setShowEditMedia] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  const [mediaToDrag, setMediaToDrag] = createSignal<MediaResponse>();
  const [mediaToEdit, setMediaToEdit] = createSignal<MediaResponse>();
  const [mediaToDelete, setMediaToDelete] = createSignal<MediaResponse>();

  const [, setErrors] = createStore<Record<string, string>>();

  function mediaIds() {
    if (!_.isNil(props.medias)) {
      return props.medias.map((m) => m.mediaId);
    }
    return [];
  }

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
        const offer = props.offer;
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

  function handleDragStart({ draggable }: any) {
    setMediaToDrag(props.medias?.find((m) => m.mediaId === draggable.id));
  }

  async function handleDragEnd({ draggable, droppable }: any) {
    if (draggable && droppable && draggable.id !== droppable.id) {
      const fromMedia = _.find(props.medias, { mediaId: draggable.id });
      const toMedia = _.find(props.medias, { mediaId: droppable.id });

      if (!_.isNil(fromMedia) && !_.isNil(toMedia)) {
        await handleUpdateMediaOrder(fromMedia.mediaId, toMedia.ordering);
        await handleUpdateMediaOrder(toMedia.mediaId, fromMedia.ordering);
      }
    }
  }

  async function handleUpdateMediaOrder(mediaId: string, ordering: number) {
    if (!_.isNil(props.offer)) {
      await mediaService.updateMediaOfferOrdering({
        offerId: props.offer.offerId,
        mediaId,
        ordering,
      });
    }

    props.onUpdate();
  }

  return (
    <>
      <DragDropProvider
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetector={closestCenter}
      >
        <DragDropSensors />

        <MdList>
          <SortableProvider ids={mediaIds()}>
            <For each={props.medias}>
              {(media) => (
                <MediaListItem
                  media={media}
                  isActive={media.mediaId === mediaToDrag()?.mediaId}
                  onEditMedia={handleOpenEditMedia}
                  onStartDeleteMedia={handleStartDelete}
                />
              )}
            </For>
          </SortableProvider>
        </MdList>
      </DragDropProvider>

      <EditMediaDialog
        show={showEditMedia()}
        media={mediaToEdit()}
        onClose={handleCancelEdit}
        onUpdate={props.onUpdate}
      />

      <DeleteConfirmationDialog
        show={showDeleteConfirmation()}
        item={trans(TKEYS.media.Title)}
        itemName={mediaToDelete()?.name}
        onCancel={handleCancelEdit}
        onConfirmation={handleDeleteConfirmation}
      />
    </>
  );
}
