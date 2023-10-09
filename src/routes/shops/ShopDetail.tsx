import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Match, Show, Switch, createResource } from "solid-js";

import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import { Border, Section } from "../../components/layout";
import { OfferDetailView, OfferList, ShopBanner } from "../../components/shops";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { OfferService } from "../../services";
import {
  OffersFilterField,
  OffersOrderByField,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { ShopData } from "./ShopData";
import styles from "./ShopDetail.module.scss";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales";

export default function ShopDetail() {
  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const shopData = useRouteData<typeof ShopData>();

  function shopId() {
    return shopData?.shop?.data?.()?.shopId;
  }

  const [featuredOffers] = createResource(shopId, fetchFeaturedOffers);
  const [offers] = createResource(shopId, fetchNotFeaturedOffers);

  async function fetchNotFeaturedOffers(shopId: string) {
    return fetchOffers(shopId, "false");
  }

  async function fetchFeaturedOffers(shopId: string) {
    return fetchOffers(shopId, "true");
  }

  async function fetchOffers(shopId: string, isFeatured: string) {
    const response = await offerService.list({
      shopId,
      orderBy: {
        field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
      filter: {
        field: OffersFilterField.OFFERS_FILTER_FIELD_IS_FEATURED,
        query: isFeatured,
      },
    });
    return response.offers;
  }

  return (
    <>
      <Show when={isResolved(shopData?.shopCustomization?.data?.state)}>
        <ShopBanner
          shopCustomization={() => shopData.shopCustomization.data()!}
        />
      </Show>

      <Show when={isResolved(shopData?.shop?.data?.state)}>
        <Show when={!_.isEmpty(shopData?.shop?.data()?.description)}>
          <Section>
            <span class={styles.Description}>
              <Multiline text={() => shopData.shop.data()?.description} />
            </span>
          </Section>
        </Show>

        <Show when={!_.isEmpty(featuredOffers())}>
          <Section>
            <For each={featuredOffers()}>
              {(offer) => <OfferDetailView offer={() => offer} />}
            </For>
          </Section>
        </Show>

        <Switch>
          <Match when={offers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offers.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offers.state)}>
            <Show when={!_.isEmpty(featuredOffers())}>
              <Border />
            </Show>

            <Section>
              <span class={styles.Title}>
                <Show
                  when={!_.isEmpty(featuredOffers())}
                  fallback={
                    <>
                      <Trans key={TKEYS.offer["title-plural"]} />:
                    </>
                  }
                >
                  <Trans key={TKEYS.offer["other-offers"]} />:
                </Show>
              </span>
              <OfferList offers={() => offers()!} />
            </Section>
          </Match>
        </Switch>
      </Show>
    </>
  );
}
