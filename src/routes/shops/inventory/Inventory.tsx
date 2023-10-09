import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Show, createResource, onMount } from "solid-js";

import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { ShopBanner } from "../../../components/shops";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { secondsToLocaleDate } from "../../../lib";
import { TKEYS } from "../../../locales";
import { MediaSubscriptionService, OfferService } from "../../../services";
import { ShopData } from "../ShopData";
import { buildSubscriptionPath } from "../shop-routing";
import styles from "./Inventory.module.scss";

export default function Inventory() {
  const navigate = useNavigate();
  const [trans] = useTransContext();
  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const offerService = new OfferService(accessToken);
  const mediaSubscriptionService = new MediaSubscriptionService(accessToken);

  const [mediaSubscriptions, { refetch }] = createResource(
    () => shopData?.shop?.data()?.shopId,
    fetchMediaSubscriptions
  );

  onMount(async () => {
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
    const shopSlug = shopData.shop.data()?.slug;
    if (!_.isNil(shopSlug)) {
      navigate(buildSubscriptionPath(shopSlug, mediaSubscriptionId));
    }
  }
  return (
    <>
      <ShopBanner
        shopCustomization={() => shopData.shopCustomization.data()!}
      />

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
    </>
  );
}
