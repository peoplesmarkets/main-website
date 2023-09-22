import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";

import { MarketBoothContext } from "../../components/commerce";
import { isResolved } from "../../components/content";
import { CreateMediaDialog } from "../../components/dashboard/CreateMediaDialog";
import { ActionButton } from "../../components/form";
import { MediaList } from "../../components/media";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MarketBoothService, MediaService } from "../../services";
import styles from "./Medias.module.scss";
import { buildDashboardPath } from "./DashboardRoutes";

export default function Medias() {
  const navigate = useNavigate();

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

  async function fetchMarketBooth(marketBoothId: string) {
    try {
      const response = await marketBoothService.get(marketBoothId);
      return response.marketBooth;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(buildDashboardPath(), { replace: true });
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

  function handleCancelEdit() {
    setShowCreateMedia(false);
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

          <Show when={isResolved(medias.state)}>
            <MediaList
              medias={() => medias()!}
              onUpdate={handleRefreshMedias}
            />
          </Show>

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
          offerId=""
          onClose={handleCancelEdit}
          onUpdate={handleRefreshMedias}
        />
      </Show>
    </>
  );
}
