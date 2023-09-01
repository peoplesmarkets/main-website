import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { DASHBOARD_PATH } from "../App";
import { CreateMarketBoothDialog } from "../components/dashboard";
import { ActionButton } from "../components/form";
import { Page } from "../components/layout";
import { Select } from "../components/navigation";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useMarketBoothContext } from "../contexts/MarketBoothContext";
import { TKEYS } from "../locales/dev";
import { MarketBoothService } from "../services";
import styles from "./UserSettings.module.scss";

export default function UserSettings() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { accessToken, currentSession } = useAccessTokensContext();
  const { currentMarketBooth, setCurrentMarketBooth } = useMarketBoothContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooths, { refetch }] = createResource(
    () => currentSession().userId,
    fetchMarketBooths
  );

  async function fetchMarketBooths(userId: string) {
    const response = await marketBoothService.listDefault({
      userId,
      pagination: {
        page: 1,
        size: 100,
      },
    });
    return response.marketBooths;
  }

  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  function marketBoothOptions() {
    if (_.isEmpty(marketBooths())) {
      return [
        {
          key: "",
          name: trans(TKEYS.dashboard["market-booth"]["no-market-booth-yet"]),
        },
      ];
    } else {
      return marketBooths()!.map(({ marketBoothId, name }) => ({
        key: marketBoothId,
        name,
      }));
    }
  }

  function handleMarketBoothSelected(marketBoothId: string) {
    const selectedMarketBooth = marketBooths()?.find(
      (m) => m.marketBoothId === marketBoothId
    );
    setCurrentMarketBooth(selectedMarketBooth);
    if (!_.isNil(selectedMarketBooth)) {
      navigate(DASHBOARD_PATH);
    }
  }

  function handleOpenCreateMarketBooth() {
    setShowCreateMarketBooth(true);
  }

  function handleCloseCreateMarketBooth() {
    setShowCreateMarketBooth(false);
  }

  async function handleMarketBoothUpdate() {
    refetch();
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
