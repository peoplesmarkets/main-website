import { grpc } from "@improbable-eng/grpc-web";
import { Trans } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { DASHBOARD_MARKET_BOOTH_PATH, USER_SETTINGS_PATH } from "../../App";
import { MediaList } from "../../components/commerce";
import { MarketBoothList } from "../../components/commerce/MarketBoothList";
import { ContentError, isResolved } from "../../components/content";
import { CreateMarketBoothDialog } from "../../components/dashboard";
import { ActionButton } from "../../components/form";
import { Border, Section } from "../../components/layout";
import { Page } from "../../components/layout/Page";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MarketBoothService, MediaService } from "../../services";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();

  const { accessToken, currentSession } = useAccessTokensContext();

  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  const marketBoothService = new MarketBoothService(accessToken);
  const mediaService = new MediaService(accessToken);

  const [marketBooths, { refetch }] = createResource(
    () => currentSession().userId || undefined,
    fetchMarketBooths
  );
  const [medias] = createResource(
    () => currentSession().userId || undefined,
    fetchMedias
  );

  async function fetchMarketBooths(userId: string) {
    try {
      const response = await marketBoothService.listDefault({
        userId,
      });
      return response.marketBooths;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(USER_SETTINGS_PATH, { replace: true });
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
            <Match when={marketBooths.state === "errored"}>
              <ContentError />
            </Match>
            <Match
              when={
                isResolved(marketBooths.state) && !_.isEmpty(marketBooths())
              }
            >
              <MarketBoothList
                marketBooths={() => marketBooths()!}
                basePath={DASHBOARD_MARKET_BOOTH_PATH}
              />
            </Match>
            <Match
              when={isResolved(marketBooths.state) && _.isEmpty(marketBooths())}
            >
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
