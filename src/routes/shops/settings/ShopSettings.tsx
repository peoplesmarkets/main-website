import { useLocation, useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect } from "solid-js";

import {
  OfferSettings,
  ShopImage,
  ShopSettings,
} from "../../../components/dashboard";
import { Page, Section } from "../../../components/layout";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { requireAuthentication } from "../../../lib";
import { buildDashboardPath } from "../../main-routing";
import { ShopData } from "../ShopData";
import styles from "./ShopSettings.module.scss";

export default function ShopSettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentSession, isAuthenticated } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  createEffect(() => {
    const ownerUserId = shopData?.shop()?.userId;

    if (!isAuthenticated()) {
      requireAuthentication(
        location.pathname,
        shopData?.shopDomain()?.clientId
      );
      return;
    } else if (shopData.error()) {
      navigate(buildDashboardPath(), { replace: true });
    } else if (
      !_.isNil(ownerUserId) &&
      currentSession().userId !== ownerUserId
    ) {
      navigate(buildDashboardPath(), { replace: true });
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
        <Show when={!_.isNil(shopData?.shop())}>
          <div class={styles.Settings}>
            <ShopImage onUpdate={handleShopUpdate} />

            <Section flat>
              <span class={styles.Title}>{shopData.shop()?.name}</span>
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
