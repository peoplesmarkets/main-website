import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import CreateMarketBoothDialog from "../components/commerce/CreateMarketBoothDialog";
import { ActionButton } from "../components/form";
import { Select } from "../components/navigation/Select";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { TKEYS } from "../locales/dev";
import styles from "./UserSettings.module.scss";

export default function UserSettings() {
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

    console.log(
      trans(TKEYS["user-settings-page"]["market-booth"]["no-market-booth-yet"])
    );
  });

  function marketBoothOptions() {
    if (_.isEmpty(marketBoothList())) {
      return [
        {
          key: "",
          name: trans(
            TKEYS["user-settings-page"]["market-booth"]["no-market-booth-yet"]
          ),
        },
      ];
    } else {
      return marketBoothList().map(({ marketBoothId, name }) => ({
        key: marketBoothId,
        name,
      }));
    }
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
    <div class={styles.UserSettings}>
      <span class={styles.Title}>
        <Trans key={TKEYS["user-settings-page"].title} />
      </span>

      <Select
        label={trans(
          TKEYS["user-settings-page"]["market-booth"]["current-market-booth"]
        )}
        options={marketBoothOptions}
        onValue={setCurrentMarketBooth}
        selected={() => currentMarketBooth()?.marketBoothId}
      />

      <ActionButton
        actionType="active-filled"
        onClick={handleOpenCreateMarketBooth}
      >
        <Trans key={TKEYS.dashboard["create-a-new-market-booth"]} />
      </ActionButton>

      <Show when={showCreateMarketBooth()}>
        <CreateMarketBoothDialog
          onClose={handleCloseCreateMarketBooth}
          onUpdate={handleMarketBoothUpdate}
        />
      </Show>
    </div>
  );
}
