import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";

import { isResolved } from "../../components/content";
import { CreateMediaDialog } from "../../components/dashboard/CreateMediaDialog";
import { ActionButton } from "../../components/form";
import { Section } from "../../components/layout";
import { MediaList } from "../../components/media";
import { ShopBanner } from "../../components/shops";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MediaService } from "../../services";
import { ShopData } from "../shops/ShopData";
import styles from "./MediaSettings.module.scss";

export default function MediaSettings() {
  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const mediaService = new MediaService(accessToken);

  const [medias, mediasActions] = createResource(
    () => shopData?.shop?.data()?.marketBoothId,
    fetchMedias
  );

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

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
      <ShopBanner
        shopCustomization={() => shopData.shopCustomization.data()!}
      />

      <Section>
        <Show when={isResolved(shopData.shop.data.state)}>
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

      <Show when={showCreateMedia()}>
        <CreateMediaDialog
          marketBoothId={shopData.shop.data()?.marketBoothId!}
          onClose={handleCancelEdit}
          onUpdate={handleRefreshMedias}
        />
      </Show>
    </>
  );
}
