import { Trans } from "@mbarzda/solid-i18next";
import { A, useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import { DASHBOARD_PATH, USER_SETTINGS_PATH, buildPath } from "../App";
import MarketBoothSettings from "../components/commerce/MarketBoothSettings";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { TKEYS } from "../locales/dev";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    currentMarketBooth,
    setCurrentMarketBooth,
    refetchCurrentMarketBooth,
    refetchMarketBoothList,
    initializeMarketBoothList,
  } = useMarketBoothContext();

  const [showCreateMarketBooth] = createSignal(false);

  onMount(async () => {
    const marketBoothId = useParams().marketBoothId;
    await initializeMarketBoothList();

    if (_.isNil(marketBoothId)) {
      // Dashboard path called without marketBoothId
      checkCurrentMarketBoothOrRedirect();
    } else if (setCurrentMarketBooth(marketBoothId)) {
      // Successfully set current market booth from market booth list
      navigate(buildPath(DASHBOARD_PATH, marketBoothId), { replace: true });
    } else {
      // Could not find current market booth in market booth list
      await refetchMarketBoothList();
      navigate(DASHBOARD_PATH, { replace: true });
    }
  });

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
    <div class={styles.Dashboard}>
      <Show when={currentMarketBooth()}>
        <div class={styles.Settings}>
          <span class={styles.Title}>{currentMarketBooth()?.name}</span>

          <MarketBoothSettings
            marketBooth={() => currentMarketBooth()}
            onUpdate={handleMarketBoothUpdate}
          />
        </div>
      </Show>
      <Show when={showCreateMarketBooth()}>
        <A href={USER_SETTINGS_PATH}>
          <Trans key={TKEYS["main-navigation"].actions["user-settings"]} />
        </A>
      </Show>
    </div>
  );
}
