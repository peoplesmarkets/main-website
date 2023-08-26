import { Trans } from "@mbarzda/solid-i18next";
import { A, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { DASHBOARD_PATH, USER_SETTINGS_PATH } from "../../App";
import { MarketBoothSettings, OfferSettings } from "../../components/dashboard";
import { Page } from "../../components/layout/Page";
import { useMarketBoothContext } from "../../contexts/MarketBoothContext";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales/dev";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    currentMarketBooth,
    refetchCurrentMarketBooth,
    refetchMarketBoothList,
  } = useMarketBoothContext();

  const [showCreateMarketBooth] = createSignal(false);

  function checkCurrentMarketBoothOrRedirect() {
    if (_.isNil(currentMarketBooth())) {
      navigate(USER_SETTINGS_PATH, { replace: true });
    } else {
      navigate(buildPath(DASHBOARD_PATH, currentMarketBooth()!.marketBoothId), {
        replace: true,
      });
    }
  }

  async function handleMarketBoothUpdate() {
    await refetchMarketBoothList();
    await refetchCurrentMarketBooth();
    checkCurrentMarketBoothOrRedirect();
  }

  return (
    <Page>
      <div class={styles.Dashboard}>
        <Show when={currentMarketBooth()}>
          <div class={styles.Settings}>
            <span class={styles.Title}>{currentMarketBooth()?.name}</span>

            <OfferSettings marketBooth={() => currentMarketBooth()!} />

            <MarketBoothSettings
              marketBooth={currentMarketBooth}
              onUpdate={handleMarketBoothUpdate}
            />
          </div>
        </Show>
        <Show when={showCreateMarketBooth()}>
          <A href={USER_SETTINGS_PATH}>
            <Trans key={TKEYS["main-navigation"].links["user-settings"]} />
          </A>
        </Show>
      </div>
    </Page>
  );
}
