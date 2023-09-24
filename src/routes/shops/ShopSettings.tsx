import { useNavigate, useRouteData } from "@solidjs/router";
import { Show, createEffect } from "solid-js";

import {
  MarketBoothImage,
  MarketBoothSettings,
  OfferSettings,
} from "../../components/dashboard";
import { Page, Section } from "../../components/layout";
import { buildDashboardPath } from "../dashboard/DashboardRoutes";
import { ShopData } from "./ShopData";
import styles from "./ShopSettings.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import _ from "lodash";
import { buildIndexPath } from "../MainRoutes";

export default function ShopSettings() {
  const navigate = useNavigate();

  const { currentSession } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  createEffect(() => {
    if (
      _.isNil(currentSession().userId) ||
      (!_.isNil(shopData.shop.data()?.userId) &&
        currentSession().userId !== shopData.shop.data()!.userId)
    ) {
      navigate(buildIndexPath());
    }
  });

  async function handleShopUpdate() {
    shopData.refetch();
  }

  async function handleDeleteShop() {
    navigate(buildDashboardPath(), { replace: true });
  }

  return (
    <Page>
      <div class={styles.ShopSettings}>
        <Show when={shopData?.shop?.data()}>
          <div class={styles.Settings}>
            <MarketBoothImage
              shopCustomization={() => shopData.shopCustomization.data()}
              onUpdate={handleShopUpdate}
            />

            <Section flat>
              <span class={styles.Title}>{shopData.shop.data()?.name}</span>
            </Section>

            <OfferSettings marketBooth={() => shopData.shop.data()!} />

            <MarketBoothSettings
              onUpdate={handleShopUpdate}
              onDelete={handleDeleteShop}
            />
          </div>
        </Show>
      </div>
    </Page>
  );
}
