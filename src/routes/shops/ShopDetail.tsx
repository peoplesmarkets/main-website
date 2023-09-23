import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Match, Show, Switch, createResource } from "solid-js";

import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import { Section } from "../../components/layout";
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

export default function ShopDetail() {
  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const shopData = useRouteData<typeof ShopData>();

  function marketBoothId() {
    return shopData?.shop?.data?.()?.marketBoothId;
  }

  const [featuredOffers] = createResource(marketBoothId, fetchFeaturedOffers);
  const [offers] = createResource(marketBoothId, fetchNotFeaturedOffers);

  async function fetchNotFeaturedOffers(marketBoothId: string) {
    return fetchOffers(marketBoothId, "false");
  }

  async function fetchFeaturedOffers(marketBoothId: string) {
    return fetchOffers(marketBoothId, "true");
  }

  async function fetchOffers(marketBoothId: string, isFeatured: string) {
    const response = await offerService.list({
      marketBoothId,
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
    <Show when={isResolved(shopData?.shop?.data?.state)}>
      <ShopBanner shop={() => shopData.shop.data()!} />

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
          <Show when={!_.isEmpty(offers())}>
            <Section>
              <OfferList offers={() => offers()!} />
            </Section>
          </Show>
        </Match>
      </Switch>
    </Show>
  );
}
