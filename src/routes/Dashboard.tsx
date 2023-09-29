import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { MediaList } from "../components/commerce";
import { MarketBoothList } from "../components/dashboard";
import { ContentError, isResolved } from "../components/content";
import { CreateMarketBoothDialog } from "../components/dashboard";
import { ActionButton } from "../components/form";
import { Border, Section } from "../components/layout";
import { Page } from "../components/layout/Page";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { TKEYS } from "../locales";
import { MarketBoothService, MediaService } from "../services";
import styles from "./Dashboard.module.scss";
import { buildUserSettingsPath } from "./user/UserRoutes";

export default function Dashboard() {
  const navigate = useNavigate();

  const { accessToken, currentSession } = useAccessTokensContext();

  const [initiallyShowCreateShop, setInitiallyShowCreateShop] =
    createSignal(true);
  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  const marketBoothService = new MarketBoothService(accessToken);
  const mediaService = new MediaService(accessToken);

  const [shops, { refetch }] = createResource(
    () => currentSession().userId || undefined,
    fetchMarketBooths
  );
  const [medias] = createResource(
    () => currentSession().userId || undefined,
    fetchMedias
  );

  createEffect(() => {
    if (
      isResolved(shops.state) &&
      _.isEmpty(shops()) &&
      initiallyShowCreateShop()
    ) {
      setShowCreateMarketBooth(true);
    }
  });

  async function fetchMarketBooths(userId: string) {
    try {
      const response = await marketBoothService.listDefault({
        userId,
        extended: true,
      });
      return response.marketBooths;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(buildUserSettingsPath(), { replace: true });
      } else {
        throw err;
      }
    }
  }

  async function fetchMedias() {
    const response = await mediaService.listAccessible({});
    return response.medias;
  }

  async function handleMarketBoothUpdate() {
    refetch();
  }

  function handleOpenCreateMarketBooth() {
    setShowCreateMarketBooth(true);
  }

  function handleCloseCreateMarketBooth() {
    setInitiallyShowCreateShop(false);
    setShowCreateMarketBooth(false);
  }

  return (
    <>
      <Page>
        <Section>
          <div class={styles.TitleSection}>
            <span class={styles.Title}>
              <Trans
                key={TKEYS.dashboard["market-booth"]["my-market-booths"]}
              />
              :
            </span>
            <ActionButton
              actionType="neutral"
              onClick={handleOpenCreateMarketBooth}
            >
              <Trans key={TKEYS.form.action["Create-new"]} />
            </ActionButton>
          </div>

          <Switch>
            <Match when={shops.state === "errored"}>
              <ContentError />
            </Match>
            <Match when={isResolved(shops.state) && !_.isEmpty(shops())}>
              <MarketBoothList shops={() => shops()!} />
            </Match>
            <Match when={isResolved(shops.state) && _.isEmpty(shops())}>
              <Trans
                key={TKEYS.dashboard["market-booth"]["no-market-booth-yet"]}
              />
            </Match>
          </Switch>
        </Section>

        <Border />

        <Section>
          <span class={styles.Title}>
            <Trans key={TKEYS.dashboard.media["my-media"]} />:
          </span>
          <MediaList medias={() => medias()!} />
        </Section>
      </Page>

      <Show when={showCreateMarketBooth()}>
        <CreateMarketBoothDialog
          onClose={handleCloseCreateMarketBooth}
          onUpdate={handleMarketBoothUpdate}
        />
      </Show>
    </>
  );
}
