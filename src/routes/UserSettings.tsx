import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import { CreateMarketBoothDialog } from "../components/dashboard";
import { ActionButton } from "../components/form";
import { Page } from "../components/layout";
import { Select } from "../components/navigation";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { TKEYS } from "../locales/dev";
import styles from "./UserSettings.module.scss";
import { useNavigate } from "@solidjs/router";
import { DASHBOARD_PATH } from "../App";

export default function UserSettings() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const {
    currentMarketBooth,
    setCurrentMarketBooth,
    marketBoothList,
    refetchMarketBoothList,
  } = useMarketBoothContext();

  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  onMount(async () => {
    await refetchMarketBoothList();
  });

  function marketBoothOptions() {
    if (_.isEmpty(marketBoothList())) {
      return [
        {
          key: "",
          name: trans(TKEYS.dashboard["market-booth"]["no-market-booth-yet"]),
        },
      ];
    } else {
      return marketBoothList().map(({ marketBoothId, name }) => ({
        key: marketBoothId,
        name,
      }));
    }
  }

  function handleMarketBoothSelected(marketBoothId: string) {
    setCurrentMarketBooth(marketBoothId);
    navigate(DASHBOARD_PATH);
  }

  function handleOpenCreateMarketBooth() {
    setShowCreateMarketBooth(true);
  }

  function handleCloseCreateMarketBooth() {
    setShowCreateMarketBooth(false);
  }

  async function handleMarketBoothUpdate() {
    await refetchMarketBoothList();
  }

  return (
    <Page>
      <div class={styles.UserSettings}>
        <span class={styles.Title}>
          <Trans key={TKEYS["user-settings-page"].title} />
        </span>

        <Select
          label={trans(TKEYS.dashboard["market-booth"]["current-market-booth"])}
          options={marketBoothOptions}
          onValue={handleMarketBoothSelected}
          selected={() => currentMarketBooth()?.marketBoothId}
        />

        <ActionButton
          actionType="active-filled"
          onClick={handleOpenCreateMarketBooth}
        >
          <Trans
            key={TKEYS.dashboard["market-booth"]["create-new-market-booth"]}
          />
        </ActionButton>

        <Show when={showCreateMarketBooth()}>
          <CreateMarketBoothDialog
            onClose={handleCloseCreateMarketBooth}
            onUpdate={handleMarketBoothUpdate}
          />
        </Show>
      </div>
    </Page>
  );
}
