import { grpc } from "@improbable-eng/grpc-web";
import { useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { ActionButton } from "@peoplesmarkets/frontend-lib/components";

import { MarketBoothServiceClient } from "../../clients";
import { DASHBOARD_PATH, GET_STARTED_PATH, buildPath } from "../App";
import CreateMarketBoothDialog from "../components/commerce/CreateMarketBoothDialog";
import MarketBoothSettings from "../components/commerce/MarketBoothSettings";
import DashboardPanel from "../components/dashboard/DashboardPanel";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { authGuardRedirect } from "../lib/auth";
import styles from "./Dashboard.module.scss";
import { GetMarketBoothResponse } from "../../clients/peoplesmarkets/commerce/v1/market_booth";

export default function Dashboard() {
  const navigate = useNavigate();

  const { accessToken, currentSession } = useAccessTokensContext();

  const [marketBoothId, setMarketBoothId] = createSignal(
    useParams().marketBoothId
  );

  const marketBoothService = new MarketBoothServiceClient(accessToken);

  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  const [marketBoothList, marketBoothListActions] = createResource(
    currentSession()?.userId,
    listMarketBooths
  );

  const [marketBooth, marketBoothActions] = createResource(
    marketBoothId,
    getMarketBooth
  );

  onMount(async () => {
    await authGuardRedirect(GET_STARTED_PATH);

    if (_.isNil(marketBoothId())) {
      const marketBoothList = await listMarketBooths(currentSession().userId!);

      if (_.isEmpty(marketBoothList.marketBooths)) {
        setShowCreateMarketBooth(true);
      } else {
        navigate(
          buildPath(
            DASHBOARD_PATH,
            _.first(marketBoothList.marketBooths)!.marketBoothId
          ),
          { replace: true }
        );
      }
    }
  });

  async function listMarketBooths(userId: string) {
    return await marketBoothService.client.ListMarketBooths(
      { userId },
      await marketBoothService.withAuthHeader()
    );
  }

  async function getMarketBooth(
    marketBoothId: string
  ): Promise<GetMarketBoothResponse> {
    try {
      return await marketBoothService.client.GetMarketBooth(
        { marketBoothId },
        await marketBoothService.withAuthHeader()
      );
    } catch (err: any) {
      if (err?.code === grpc.Code.NotFound) {
        navigate(DASHBOARD_PATH);
      }

      throw err;
    }
  }

  function handleUpdate(newMarketBoothId?: string) {
    if (!_.isNil(newMarketBoothId)) {
      handleMarketBoothSelect(newMarketBoothId);
    }

    marketBoothActions.refetch();
    marketBoothListActions.refetch();
  }

  function handleCloseCreateMarketBooth() {
    setShowCreateMarketBooth(false);
  }

  function handleOpenCreateMarketBooth() {
    setShowCreateMarketBooth(true);
  }

  function handleMarketBoothSelect(selected: string) {
    setMarketBoothId(selected);
    navigate(buildPath(DASHBOARD_PATH, selected));
  }

  return (
    <div class={styles.Dashboard}>
      <DashboardPanel
        marketBoothList={marketBoothList}
        selectedMarketBooth={marketBooth}
        onSelectMarketBooth={handleMarketBoothSelect}
      />

      <div class={styles.Settings}>
        <div class={styles.SettingsNav}>
          <div class={styles.SettingsNavTitle}>
            <h2>{marketBooth()?.marketBooth?.name}</h2>
          </div>

          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateMarketBooth}
          >
            Create a new Market Booth
          </ActionButton>
        </div>

        <div class={styles.SettingsBody}>
          <Show when={!_.isNil(marketBooth()?.marketBooth)}>
            <MarketBoothSettings
              marketBooth={marketBooth}
              onUpdate={handleUpdate}
            />
          </Show>
        </div>
      </div>

      <Show when={showCreateMarketBooth()}>
        <CreateMarketBoothDialog
          onClose={handleCloseCreateMarketBooth}
          onUpdate={handleUpdate}
        />
      </Show>
    </div>
  );
}
