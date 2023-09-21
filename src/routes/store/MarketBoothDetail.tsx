import { Trans } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource } from "solid-js";

import { MarketBoothContext, OfferList } from "../../components/commerce";
import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import { Section } from "../../components/layout";
import { secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService, OfferService } from "../../services";
import { OffersOrderByField } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./MarketBoothDetail.module.scss";

export default function MarketBoothDetail() {
  const marketBoothService = new MarketBoothService();
  const offerService = new OfferService();

  const [marketBooth] = createResource(
    () => useParams().marketBoothId,
    fetchMarketBooth
  );
  const [offers] = createResource(() => useParams().marketBoothId, fetchOffers);

  async function fetchMarketBooth(marketBoothId: string) {
    const response = await marketBoothService.get(marketBoothId);
    return response.marketBooth;
  }

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
    <MarketBoothContext marketBooth={() => marketBooth()}>
      <Section>
        <span class={styles.Description}>
          <Multiline text={() => marketBooth()?.description} />
        </span>
      </Section>
      <Section>
        <span class={styles.Details}>
          <Trans key={TKEYS.offer.labels["Created-at"]} />:{" "}
          {secondsToLocaleString(marketBooth()?.createdAt)}
        </span>
        <span class={styles.Details}>
          <Trans key={TKEYS.offer.labels["Updated-at"]} />:{" "}
          {secondsToLocaleString(marketBooth()?.updatedAt)}
        </span>
      </Section>

      <Switch>
        <Match when={offers.state === "errored"}>
          <Section>
            <ContentError />
          </Section>
        </Match>
        <Match when={offers.state === "pending"}>
          <Section>
            <ContentLoading />
          </Section>
        </Match>
        <Match when={isResolved(marketBooth.state) && isResolved(offers.state)}>
          <Section>
            <span class={styles.Title}>
              <Trans key={TKEYS.offer["title-plural"]} />
            </span>

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
          </Section>
        </Match>
      </Switch>
    </MarketBoothContext>
  );
}
