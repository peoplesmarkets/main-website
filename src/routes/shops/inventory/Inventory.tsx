import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  For,
  Show,
  Suspense,
  createResource,
  onMount,
} from "solid-js";

import { ContentError } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { ShopBanner } from "../../../components/shops";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import {
  requireAuthentication,
  resourceIsReady,
  secondsToLocaleDate,
} from "../../../lib";
import { TKEYS } from "../../../locales";
import { ShopData } from "../ShopData";
import { buildSubscriptionPath } from "../shop-routing";
import styles from "./Inventory.module.scss";

export default function Inventory() {
  const location = useLocation();
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { shopCustomizationService, offerService, mediaSubscriptionService } =
    useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [shopCustomization] = createResource(shopData?.shopId, async (shopId) =>
    shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const [mediaSubscriptions, { refetch }] = createResource(
    shopData.shopId,
    fetchMediaSubscriptions
  );

  onMount(async () => {
    await requireAuthentication(location.pathname);
    setTimeout(refetch, 2000);
  });

  async function fetchMediaSubscriptions(shopId: string) {
    const result = [];
    const response = await mediaSubscriptionService.list({ shopId });

    for (const mediaSubscription of response.mediaSubscriptions) {
      const offerRes = await offerService.get(mediaSubscription.offerId);
      result.push({
        ...mediaSubscription,
        offer: offerRes.offer,
      });
    }

    return result;
  }

  function toLocaleDate(timestamp: number) {
    return secondsToLocaleDate(timestamp, trans(TKEYS.lang));
  }

  function handleViewSubscription(mediaSubscriptionId: string) {
    if (!resourceIsReady(shopData.shop)) {
      return;
    }
    const shopSlug = shopData.shop()?.slug;
    if (!_.isNil(shopSlug)) {
      navigate(buildSubscriptionPath(shopSlug, mediaSubscriptionId));
    }
  }

  return (
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <ShopBanner shopCustomization={() => shopCustomization()} />

        <Section>
          <span class={styles.Title}>
            <Trans key={TKEYS.subscription["My-Subscriptions"]} />:
          </span>

          <div class={styles.Cards}>
            <Show
              when={!_.isEmpty(mediaSubscriptions())}
              fallback={
                <Trans key={TKEYS.subscription["no-subscriptions-yet"]} />
              }
            >
              <For each={mediaSubscriptions()}>
                {(mediaSubscription) => (
                  <div class={styles.Card}>
                    <span class={styles.Label}>
                      {mediaSubscription.offer?.name}
                    </span>

                    <div class={styles.Details}>
                      <span class={styles.Detail}>
                        <Trans key={TKEYS.subscription["payed-until"]} />:{" "}
                        {toLocaleDate(mediaSubscription.payedUntil)}
                      </span>
                      <Show when={!_.isNil(mediaSubscription.canceledAt)}>
                        <span class={styles.Detail}>
                          <Trans key={TKEYS.subscription["canceled-at"]} />:{" "}
                          {toLocaleDate(mediaSubscription.canceledAt!)}
                        </span>
                      </Show>
                    </div>

                    <div class={styles.Actions}>
                      <ActionButton
                        actionType="active"
                        small
                        onClick={() =>
                          handleViewSubscription(
                            mediaSubscription.mediaSubscriptionId
                          )
                        }
                      >
                        <Trans key={TKEYS.common.more} />
                      </ActionButton>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </Section>
      </Suspense>
    </ErrorBoundary>
  );
}
