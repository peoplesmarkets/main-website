import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { isResolved } from "../../../components/content";
import { CreateMediaDialog } from "../../../components/dashboard/CreateMediaDialog";
import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { MediaList } from "../../../components/media";
import { ShopBanner } from "../../../components/shops";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { TKEYS } from "../../../locales";
import { MediaService } from "../../../services";
import { ShopData } from "../ShopData";
import styles from "./MediaSettings.module.scss";
import _ from "lodash";
import { requireAuthentication } from "../../../lib";

export default function MediaSettings() {
  const location = useLocation();
  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const mediaService = new MediaService(accessToken);

  const [medias, mediasActions] = createResource(
    () => shopData?.shop()?.shopId,
    fetchMedias
  );

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  onMount(async () => {
    await requireAuthentication(location.pathname);
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
    <>
      <ShopBanner shopCustomization={() => shopData.shopCustomization()} />

      <Section>
        <Show when={!_.isNil(shopData.shop())}>
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
        </Show>
      </Section>

      <Show when={showCreateMedia() && !_.isNil(shopData.shop())}>
        <CreateMediaDialog
          shopId={shopData.shop()!.shopId}
          onClose={handleCancelEdit}
          onUpdate={handleRefreshMedias}
        />
      </Show>
    </>
  );
}
