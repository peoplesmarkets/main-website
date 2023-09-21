import { grpc } from "@improbable-eng/grpc-web";
import { useNavigate, useParams } from "@solidjs/router";
import { Show, createResource } from "solid-js";

import {
  MarketBoothImage,
  MarketBoothSettings,
  OfferSettings,
} from "../../components/dashboard";
import { Section } from "../../components/layout";
import { Page } from "../../components/layout/Page";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService } from "../../services";
import styles from "./MarketBooth.module.scss";
import { buildDashboardPath } from "./DashboardRoutes";

export default function MarketBooth() {
  const navigate = useNavigate();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooth, { refetch }] = createResource(
    () => useParams().marketBoothId,
    fetchMarketBooth
  );

  async function fetchMarketBooth(marketBoothId: string) {
    try {
      const response = await marketBoothService.get(marketBoothId);
      return response.marketBooth;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        navigate(buildDashboardPath(), { replace: true });
      } else {
        throw err;
      }
    }
  }

  async function handleMarketBoothUpdate() {
    refetch();
  }

  async function handleDeleteMarketBooth() {
    navigate(buildDashboardPath(), { replace: true });
  }

  return (
    <Page>
      <div class={styles.MarketBooth}>
        <Show when={marketBooth()}>
          <div class={styles.Settings}>
            <MarketBoothImage
              marketBooth={() => marketBooth()}
              onUpdate={handleMarketBoothUpdate}
            />

            <Section flat>
              <span class={styles.Title}>{marketBooth()?.name}</span>
            </Section>

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
