import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource } from "solid-js";

import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import { Section } from "../../components/layout";
import { OfferList } from "../../components/shops";
import { ShopBanner } from "../../components/shops/ShopBanner";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import { OffersOrderByField } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { ShopData } from "./ShopData";
import styles from "./ShopDetail.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";

export default function ShopDetail() {
  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const shopData = useRouteData<typeof ShopData>();
  const [offers] = createResource(
    () => shopData?.shop?.data?.()?.marketBoothId,
    fetchOffers
  );

  async function fetchOffers(marketBoothId: string) {
    const response = await offerService.list({
      marketBoothId,
      orderBy: {
        field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
    });
    return response.offers;
  }

  return (
    <Show when={isResolved(shopData?.shop?.data?.state)}>
      <ShopBanner shop={() => shopData.shop.data()!} />

      <Section>
        <span class={styles.Description}>
          <Multiline text={() => shopData.shop.data()?.description} />
        </span>
      </Section>

      <Section>
        <Switch>
          <Match when={offers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offers.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offers.state)}>
            <Show
              when={!_.isEmpty(offers())}
              fallback={
                <span class={styles.Body}>
                  <Trans key={TKEYS.offer["no-offers-yet"]} />
                </span>
              }
            >
              <OfferList offers={() => offers()!} />
            </Show>
          </Match>
        </Switch>
      </Section>
    </Show>
  );
}
