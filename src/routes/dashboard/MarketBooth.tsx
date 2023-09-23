import { A, useNavigate, useRouteData } from "@solidjs/router";
import { Show } from "solid-js";

import {
  MarketBoothImage,
  MarketBoothSettings,
  OfferSettings,
} from "../../components/dashboard";
import { Section } from "../../components/layout";
import { Page } from "../../components/layout/Page";
import { ShopData } from "../shops/ShopData";
import { buildDashboardPath } from "./DashboardRoutes";
import styles from "./MarketBooth.module.scss";
import { buildShopDetailPath } from "../shops/ShopRoutes";

export default function MarketBooth() {
  const navigate = useNavigate();

  const shopData = useRouteData<typeof ShopData>();

  async function handleMarketBoothUpdate() {
    shopData.shop.refetch();
  }

  async function handleDeleteMarketBooth() {
    navigate(buildDashboardPath(), { replace: true });
  }

  return (
    <Page>
      <div class={styles.MarketBooth}>
        <Show when={shopData?.shop?.data()}>
          <div class={styles.Settings}>
            <MarketBoothImage
              marketBooth={() => shopData.shop.data()}
              onUpdate={handleMarketBoothUpdate}
            />

            <Section flat>
              <A
                class={styles.Title}
                href={buildShopDetailPath(shopData.shop.data()!.slug)}
              >
                {shopData.shop.data()?.name}
              </A>
            </Section>

            <OfferSettings marketBooth={() => shopData.shop.data()!} />

            <MarketBoothSettings
              marketBooth={() => shopData.shop.data()}
              onUpdate={handleMarketBoothUpdate}
              onDelete={handleDeleteMarketBooth}
            />
          </div>
        </Show>
      </div>
    </Page>
  );
}
