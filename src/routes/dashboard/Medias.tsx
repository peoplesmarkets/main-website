import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useParams } from "@solidjs/router";
import { For, Show, createResource, createSignal } from "solid-js";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { DASHBOARD_PATH } from "../../App";
import { MarketBoothContext } from "../../components/commerce";
import { isResolved } from "../../components/content";
import { CreateMediaDialog } from "../../components/dashboard/CreateMediaDialog";
import { EditMediaDialog } from "../../components/dashboard/EditMediaDialog";
import { ActionButton, DeleteConfirmation } from "../../components/form";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MarketBoothService, MediaService } from "../../services";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import styles from "./Medias.module.scss";

export default function Medias() {
  const navigate = useNavigate();
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const mediaService = new MediaService(accessToken);

  const [marketBooth] = createResource(
    () => useParams().marketBoothId,
    fetchMarketBooth
  );
  const [medias, mediasActions] = createResource(
    () => useParams().marketBoothId,
    fetchMedias
  );

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);
  const [showEditMedia, setShowEditMedia] = createSignal(false);
  const [mediaToEdit, setMediaToEdit] = createSignal<MediaResponse>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);
  const [mediaToDelete, setMediaToDelete] = createSignal<MediaResponse>();
  const [errors, setErrors] = createStore<Record<string, string>>();

  async function fetchMarketBooth(marketBoothId: string) {
    try {
      const response = await marketBoothService.get(marketBoothId);
      return response.marketBooth;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(DASHBOARD_PATH, { replace: true });
      } else {
        throw err;
      }
    }
  }

  async function fetchMedias(marketBoothId: string) {
    const response = await mediaService.list({ marketBoothId });
    return response.medias;
  }

  function handleOpenCreateMedia() {
    setShowCreateMedia(true);
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
    setShowCreateMedia(false);
    setShowEditMedia(false);
    setShowDeleteConfirmation(false);
  }

  async function handleDeleteConfirmation() {
    const mediaId = mediaToDelete()?.mediaId;
    if (!_.isNil(mediaId) && !_.isEmpty(mediaId)) {
      try {
        setShowDeleteConfirmation(false);
        await mediaService.delete(mediaId);
        handleRefreshMedias();
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

  function handleRefreshMedias() {
    mediasActions.refetch();
  }

  return (
    <>
      <Show when={isResolved(marketBooth.state)}>
        <MarketBoothContext marketBooth={() => marketBooth()!}>
          <span class={styles.Title}>
            <Trans key={TKEYS.media["Title-plural"]} />
          </span>

          <div class={styles.Table}>
            <Show when={isResolved(medias.state)}>
              <For each={medias()}>
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
                        onClick={() => handleOpenEditMedia(media)}
                      >
                        <Trans key={TKEYS.form.action.Edit} />
                      </ActionButton>
                      <ActionButton
                        actionType="danger"
                        onClick={() => handleStartDelete(media)}
                      >
                        <Trans key={TKEYS.form.action.Delete} />
                      </ActionButton>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>

          <div class={styles.TableActions}>
            <ActionButton actionType="active" onClick={handleOpenCreateMedia}>
              <Trans key={TKEYS.dashboard.media["create-new-file"]} />
            </ActionButton>
          </div>
        </MarketBoothContext>
      </Show>

      <Show when={showCreateMedia()}>
        <CreateMediaDialog
          marketBoothId={marketBooth()?.marketBoothId!}
          onClose={handleCancelEdit}
          onUpdate={handleRefreshMedias}
        />
      </Show>
      <Show when={showEditMedia()}>
        <EditMediaDialog
          media={() => mediaToEdit()!}
          onClose={handleCancelEdit}
          onUpdate={handleRefreshMedias}
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
