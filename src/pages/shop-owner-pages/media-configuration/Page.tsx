import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import { createResource, createSignal } from "solid-js";

import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication } from "../../../guards/authentication";
import { TKEYS } from "../../../locales";
import { MediaList } from "../MediaList";
import { MyShopData } from "../MyShopData";
import { CreateMediaDialog } from "./CreateMediaDialog";
import styles from "./Page.module.scss";

export default function MediaSettingsPage() {
  const location = useLocation();

  const shopData = useRouteData<typeof MyShopData>();

  const { mediaService } = useServiceClientContext();

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [medias, mediasActions] = createResource(
    () => shopData.shop()?.shopId,
    fetchMedias
  );

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  function loaded() {
    return authenticated();
  }

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
    <DefaultBoundary loaded={loaded}>
      <Section>
        <span class={styles.Title}>
          <Trans key={TKEYS.media["Title-plural"]} />
        </span>

        <MediaList medias={medias()} onUpdate={handleRefreshMedias} />

        <div class={styles.TableActions}>
          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateMedia}
          >
            <Trans key={TKEYS.dashboard.media["create-new-file"]} />
          </ActionButton>
        </div>
      </Section>

      <CreateMediaDialog
        show={showCreateMedia()}
        onClose={handleCancelEdit}
        onUpdate={handleRefreshMedias}
      />
    </DefaultBoundary>
  );
}
