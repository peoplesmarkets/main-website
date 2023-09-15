import { Trans } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import {
  MarketBoothContext,
  OfferImages,
  OfferList,
} from "../../components/commerce";
import { OfferPrice } from "../../components/commerce/OfferPrice";
import { ContentError, Multiline, isResolved } from "../../components/content";
import { ActionButton } from "../../components/form";
import { Border, Section } from "../../components/layout";
import { secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import {
  MarketBoothService,
  OfferService,
  StripeService,
} from "../../services";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferDetail.module.scss";

export default function OfferDetail() {
  const offerService = new OfferService();
  const marketBoothService = new MarketBoothService();
  const stripeService = new StripeService();

  const [offerId, setOfferId] = createSignal<string>();
  const [offer] = createResource(offerId, fetchOffer);
  const [marketBooth] = createResource(
    () => offer()?.marketBoothId,
    fetchMarketBooth
  );
  const [otherOffers] = createResource(() => offer(), fetchOtherOffers);
  const [stripeAccount] = createResource(
    () => offer()?.marketBoothId,
    fetchStripeAccount
  );

  createEffect(() => {
    setOfferId(useParams().offerId);
  });

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  async function fetchMarketBooth(marketBoothId: string) {
    const response = await marketBoothService.get(marketBoothId);
    return response.marketBooth;
  }

  async function fetchOtherOffers(offer: OfferResponse) {
    const response = await offerService.list({
      marketBoothId: offer.marketBoothId,
    });
    return response.offers.filter((o) => o.offerId !== offer.offerId);
  }

  async function fetchStripeAccount(marketBoothId: string) {
    const response = await stripeService.getAccount(marketBoothId);
    return response.account;
  }

  async function handleCheckout() {
    const offerId_ = offerId();
    if (!_.isNil(offerId_) && !_.isEmpty(offerId_)) {
      const response = await stripeService.createCheckoutSession(offerId_);
      window.location.href = response.link;
    }
  }

  return (
    <MarketBoothContext marketBooth={() => marketBooth()} withLink>
      <Switch>
        <Match when={offer.state === "errored"}>
          <Section>
            <ContentError />
          </Section>
        </Match>
        <Match when={isResolved(offer.state)}>
          <Show when={!_.isNil(offer()) && !_.isEmpty(offer()?.images)}>
            <Section>
              <OfferImages offer={() => offer()!} />
            </Section>
          </Show>

          <Section flat>
            <span class={styles.Title}>{offer()?.name}</span>
          </Section>

          <Section>
            <OfferPrice offer={() => offer()} />
          </Section>

          <Section>
            <span class={styles.Description}>
              <Show
                when={!_.isEmpty(offer()?.description)}
                fallback={
                  <span class={styles.Label}>
                    <Trans key={TKEYS.offer["no-description"]} />
                  </span>
                }
              >
                <Multiline text={() => offer()?.description} />
              </Show>
            </span>
          </Section>

          <Show when={!_.isNil(offer()?.price)}>
            <Section>
              <div class={styles.Buy}>
                <Show
                  when={
                    isResolved(stripeAccount.state) && stripeAccount()?.enabled
                  }
                >
                  <ActionButton
                    actionType="active-filled"
                    onClick={handleCheckout}
                  >
                    <Trans key={TKEYS.form.action.Buy} />
                  </ActionButton>
                </Show>

                <Show
                  when={
                    isResolved(stripeAccount.state) && !stripeAccount()?.enabled
                  }
                >
                  <span class="font-body">
                    <Trans key={TKEYS.offer["currently-no-payment-method"]} />
                  </span>
                </Show>
              </div>
            </Section>
          </Show>

          <Section>
            <div class={styles.Details}>
              <p>
                <Trans key={TKEYS.offer.labels["Created-at"]} />:{" "}
                {secondsToLocaleString(offer()?.createdAt)}
              </p>
              <p>
                <Trans key={TKEYS.offer.labels["Updated-at"]} />:{" "}
                {secondsToLocaleString(offer()?.updatedAt)}
              </p>
            </div>
          </Section>
        </Match>
      </Switch>

      <Border />

      <Section>
        <span class={styles.Subtitle}>
          <Trans key={TKEYS.offer["other-offers-by"]} />
          <span class={styles.Bold}>{marketBooth()?.name}</span>
        </span>
        <Switch>
          <Match when={otherOffers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={isResolved(otherOffers.state)}>
            <OfferList offers={() => otherOffers()!} />
          </Match>
        </Switch>
      </Section>
    </MarketBoothContext>
  );
}
