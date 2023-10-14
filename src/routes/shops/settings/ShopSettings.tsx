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
import { requireAuthentication, secondsToLocaleDateTime } from "../../../lib";
import { buildDashboardPath } from "../../main-routing";
import { ShopData } from "../ShopData";
import styles from "./ShopSettings.module.scss";
import { Trans } from "@mbarzda/solid-i18next";
import { Multiline } from "../../../components/content";
import { TKEYS } from "../../../locales";

export default function ShopSettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentSession, isAuthenticated } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  createEffect(() => {
    const ownerUserId = shopData?.shop()?.userId;

    if (!isAuthenticated()) {
      requireAuthentication(location.pathname);
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

            <Section>
              <span class={styles.Label}>
                <Trans key={TKEYS["shop"].labels.Description} />:
              </span>

              <Show
                when={!_.isEmpty(shopData?.shop()?.description)}
                fallback={
                  <span class={styles.Details}>
                    <Trans key={TKEYS["shop"]["no-description"]} />
                  </span>
                }
              >
                <Multiline text={() => shopData?.shop()?.description} />
              </Show>
            </Section>

            <Section>
              <span class={styles.Label}>
                <Trans key={TKEYS.dashboard["shop"].Details} />:
              </span>

              <span class={styles.Details}>
                <Trans key={TKEYS.offer.visibility.title} />:{" "}
                <Show
                  when={Boolean(shopData?.shop()?.isActive)}
                  fallback={
                    <span class={styles.Warning}>
                      <Trans key={TKEYS.offer.visibility["not-visible"]} />
                    </span>
                  }
                >
                  <span class={styles.Active}>
                    <Trans key={TKEYS.offer.visibility.visible} />
                  </span>
                </Show>
              </span>

              <span class={styles.Details}>
                <Trans key={TKEYS["shop"].labels["Created-at"]} />:{" "}
                {secondsToLocaleDateTime(shopData?.shop()?.createdAt)}
              </span>

              <span class={styles.Details}>
                <Trans key={TKEYS["shop"].labels["Updated-at"]} />:{" "}
                {secondsToLocaleDateTime(shopData?.shop()?.updatedAt)}
              </span>
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
