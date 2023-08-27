import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";

import { USER_SETTINGS_PATH } from "../../App";
import { MarketBoothSettings, OfferSettings } from "../../components/dashboard";
import { Page } from "../../components/layout/Page";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService } from "../../services";
import styles from "./Dashboard.module.scss";

export default function Dashboard() {
  const navigate = useNavigate();
  const { marketBoothId } = useParams();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooth, { refetch }] = createResource(
    () => marketBoothId,
    fetchMarketBooth
  );

  async function fetchMarketBooth(marketBoothId: string) {
    const response = await marketBoothService.get(marketBoothId);
    return response.marketBooth;
  }

  async function handleMarketBoothUpdate() {
    refetch();
  }

  async function handleDeleteMarketBooth() {
    navigate(USER_SETTINGS_PATH, { replace: true });
  }

  return (
    <Page>
      <div class={styles.Dashboard}>
        <Show when={marketBooth()}>
          <div class={styles.Settings}>
            <span class={styles.Title}>{marketBooth()?.name}</span>

            <OfferSettings marketBooth={() => marketBooth()!} />

            <MarketBoothSettings
              marketBooth={() => marketBooth()}
              onUpdate={handleMarketBoothUpdate}
              onDelete={handleDeleteMarketBooth}
            />
          </div>
        </Show>
      </div>
    </Page>
  );
}
