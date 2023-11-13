import { useLocation, useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createSignal,
} from "solid-js";

import { Trans } from "@mbarzda/solid-i18next";
import { ContentError, Multiline } from "../../../components/content";
import {
  OfferSettings,
  ShopImage,
  ShopSettings,
} from "../../../components/dashboard";
import { Cover, Section } from "../../../components/layout";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { resourceIsReady, secondsToLocaleDateTime } from "../../../lib";
import { TKEYS } from "../../../locales";
import { buildDashboardPath } from "../../main-routing";
import { ShopData } from "../ShopData";
import styles from "./ShopSettings.module.scss";
import { requireAuthentication } from "../../../guards/authentication";

export default function ShopSettingsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentSession, isAuthenticated } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const [owned, setOwned] = createSignal(false);

  createEffect(() => {
    if (!isAuthenticated()) {
      requireAuthentication(location.pathname);
      return;
    }

    if (!_.isNil(shopData.shop.error)) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    if (!resourceIsReady(shopData.shop)) {
      return;
    }

    if (currentSession().userId !== shopData?.shop()?.userId) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    setOwned(true);
  });

  async function handleShopUpdate() {
    shopData.refetch();
  }

  async function handleDeleteShop() {
    navigate(buildDashboardPath(), { replace: true });
  }

  return (
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Show when={owned()} fallback={<Cover />}>
          <div class={styles.ShopSettings}>
            <div class={styles.Settings}>
              <ShopImage onUpdate={handleShopUpdate} />

              <Section flat>
                <span class={styles.Title}>{shopData.shop()?.name}</span>
              </Section>

              <Section>
                <span class={styles.Label}>
                  <Trans key={TKEYS.shop.labels.Description} />:
                </span>

                <Show
                  when={!_.isEmpty(shopData.shop()?.description)}
                  fallback={
                    <span class={styles.Details}>
                      <Trans key={TKEYS.shop["no-description"]} />
                    </span>
                  }
                >
                  <Multiline text={shopData.shop()?.description} />
                </Show>
              </Section>

              <Section>
                <span class={styles.Label}>
                  <Trans key={TKEYS.dashboard.shop.Details} />:
                </span>

                <span class={styles.Details}>
                  <Trans key={TKEYS.offer.visibility.title} />:{" "}
                  <Show
                    when={Boolean(shopData.shop()?.isActive)}
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

                <Show when={!_.isEmpty(shopData.shop()?.contactEmailAddress)}>
                  <span class={styles.Details}>
                    <Trans key={TKEYS.shop.labels["contact-email-address"]} />:{" "}
                    {shopData.shop()?.contactEmailAddress}
                  </span>
                </Show>

                <span class={styles.Details}>
                  <Trans key={TKEYS.shop.labels["Created-at"]} />:{" "}
                  {secondsToLocaleDateTime(shopData.shop()?.createdAt)}
                </span>

                <span class={styles.Details}>
                  <Trans key={TKEYS.shop.labels["Updated-at"]} />:{" "}
                  {secondsToLocaleDateTime(shopData.shop()?.updatedAt)}
                </span>
              </Section>

              <OfferSettings shop={() => shopData.shop()} />

              <ShopSettings
                onUpdate={handleShopUpdate}
                onDelete={handleDeleteShop}
              />
            </div>
          </div>
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
