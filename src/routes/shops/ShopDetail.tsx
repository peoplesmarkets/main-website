import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { ErrorBoundary, For, Show, Suspense, createResource } from "solid-js";

import { ContentError, Multiline } from "../../components/content";
import { Border, Section } from "../../components/layout";
import { OfferDetailView, OfferList, ShopBanner } from "../../components/shops";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
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

  function shopId() {
    return shopData?.shop()?.shopId;
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
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Show when={!_.isNil(shopData?.shopCustomization())}>
          <ShopBanner shopCustomization={() => shopData.shopCustomization()} />
        </Show>

        <Show when={!_.isEmpty(shopData?.shop()?.description)}>
          <Section>
            <span class={styles.Description}>
              <Multiline text={() => shopData.shop()?.description} />
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

        <Show when={!_.isEmpty(offers())}>
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
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
