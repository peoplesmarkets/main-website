import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate, useRouteData } from "@solidjs/router";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import _ from "lodash";
import { ContentError } from "../../../components/content";
import { CreateMediaDialog } from "../../../components/dashboard/CreateMediaDialog";
import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { MediaList } from "../../../components/media";
import { ShopBanner } from "../../../components/shops";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication, resourceIsReady } from "../../../lib";
import { TKEYS } from "../../../locales";
import { buildDashboardPath } from "../../main-routing";
import { ShopData } from "../ShopData";
import styles from "./MediaSettings.module.scss";

export default function MediaSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  const shopData = useRouteData<typeof ShopData>();

  const { currentSession, isAuthenticated } = useAccessTokensContext();

  const { mediaService, shopCustomizationService } = useServiceClientContext();

  const [shopCustomization] = createResource(shopData?.shopId, async (shopId) =>
    shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );
  const [medias, mediasActions] = createResource(shopData?.shopId, fetchMedias);

  const [owned, setOwned] = createSignal(false);
  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  createEffect(() => {
    if (!isAuthenticated()) {
      requireAuthentication(location.pathname);
      return;
    }

    if (!_.isNil(shopData.shop.error)) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    if (!resourceIsReady(shopData.shop)) {
      return;
    }

    if (currentSession().userId !== shopData.shop()?.userId) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    setOwned(true);
  });

  async function fetchMedias(shopId: string) {
    const response = await mediaService.list({ shopId });
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
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Show when={owned()}>
          <ShopBanner shopCustomization={() => shopCustomization()} />

          <Section>
            <span class={styles.Title}>
              <Trans key={TKEYS.media["Title-plural"]} />
            </span>

            <MediaList medias={() => medias()} onUpdate={handleRefreshMedias} />

            <div class={styles.TableActions}>
              <ActionButton actionType="active" onClick={handleOpenCreateMedia}>
                <Trans key={TKEYS.dashboard.media["create-new-file"]} />
              </ActionButton>
            </div>
          </Section>

          <Show when={showCreateMedia()}>
            <CreateMediaDialog
              onClose={handleCancelEdit}
              onUpdate={handleRefreshMedias}
            />
          </Show>
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
