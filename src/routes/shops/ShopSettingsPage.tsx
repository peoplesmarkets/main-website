import { useNavigate, useRouteData } from "@solidjs/router";
import { Show, createEffect } from "solid-js";

import {
  ShopImage,
  ShopSettings,
  OfferSettings,
} from "../../components/dashboard";
import { Page, Section } from "../../components/layout";
import { buildDashboardPath } from "../MainRoutes";
import { ShopData } from "./ShopData";
import styles from "./ShopSettingsPage.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import _ from "lodash";
import { buildIndexPath } from "../MainRoutes";

export default function ShopSettingsPage() {
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
            <ShopImage onUpdate={handleShopUpdate} />

            <Section flat>
              <span class={styles.Title}>{shopData.shop.data()?.name}</span>
            </Section>

            <OfferSettings />

            <ShopSettings
              onUpdate={handleShopUpdate}
              onDelete={handleDeleteShop}
            />
          </div>
        </Show>
      </div>
    </Page>
  );
}
