import { Trans } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource } from "solid-js";

import { OfferImages } from "../../components/commerce";
import { OfferPrice } from "../../components/commerce/OfferPrice";
import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import { ActionButton } from "../../components/form";
import { Page, Section } from "../../components/layout";
import { secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferService, StripeService } from "../../services";
import styles from "./OfferDetail.module.scss";

export default function OfferDetail() {
  const { offerId } = useParams();

  const offerService = new OfferService();
  const stripeService = new StripeService();

  const [offer] = createResource(offerId, fetchOffer);
  const [stripeAccount] = createResource(
    () => offer()?.marketBoothId,
    fetchStripeAccount
  );

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  async function fetchStripeAccount(marketBoothId: string) {
    const response = await stripeService.getAccount(marketBoothId);
    return response.account;
  }

  async function handleCheckout() {
    try {
      const response = await stripeService.createCheckoutSession(offerId);
      window.location.href = response.link;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }

  return (
    <Page>
      <Switch>
        <Match when={offer.state === "errored"}>
          <Section>
            <ContentError />
          </Section>
        </Match>
        <Match when={offer.state === "pending"}>
          <Section>
            <ContentLoading />
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
            <OfferPrice class={styles.Price} offer={() => offer()} />
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
    </Page>
  );
}
