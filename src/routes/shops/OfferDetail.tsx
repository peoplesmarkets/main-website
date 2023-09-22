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

import { OfferImages, OfferPrice } from "../../components/commerce";
import { ContentError, Multiline, isResolved } from "../../components/content";
import { Border, Section } from "../../components/layout";
import { OfferBuy, OfferList } from "../../components/shops";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import {
  OfferResponse,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferDetail.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";

export default function OfferDetail() {
  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offerId, setOfferId] = createSignal<string>();
  const [offer] = createResource(offerId, fetchOffer);

  const [otherOffers] = createResource(() => offer(), fetchOtherOffers);

  createEffect(() => {
    setOfferId(useParams().offerId);
  });

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  async function fetchOtherOffers(offer: OfferResponse) {
    const response = await offerService.list({
      marketBoothId: offer.marketBoothId,
    });
    return response.offers.filter((o) => o.offerId !== offer.offerId);
  }

  return (
    <div class={styles.OfferDetail}>
      <Switch>
        <Match when={offer.state === "errored"}>
          <Section>
            <ContentError />
          </Section>
        </Match>
        <Match when={isResolved(offer.state)}>
          <Section class={styles.Images}>
            <Show when={!_.isNil(offer()) && !_.isEmpty(offer()?.images)}>
              <OfferImages offer={() => offer()!} />
            </Show>
          </Section>

          <Section class={styles.Summary} padded>
            <div>
              <OfferPrice class={styles.Price} offer={() => offer()} />

              <span class={styles.Title}>{offer()?.name}</span>

              <span class={styles.Annotation}>
                <Show when={offer()?.type == OfferType.OFFER_TYPE_DIGITAL}>
                  <Trans key={TKEYS.offer["downloadable-content"]} />
                </Show>
              </span>
            </div>

            <div>
              <OfferBuy offer={() => offer()!} />
            </div>
          </Section>

          <Section class={styles.Information} padded>
            <Show when={!_.isEmpty(offer()?.description)}>
              <span class={styles.Subtitle}>
                <Trans key={TKEYS.offer.labels.Description} />:
              </span>

              <span class={styles.Description}>
                <Multiline text={() => offer()?.description} />
              </span>
            </Show>
          </Section>
        </Match>
      </Switch>

      <div class={styles.OtherOffers}>
        <Show when={!_.isEmpty(otherOffers())}>
          <Border />

          <Section>
            <span class={styles.Subtitle}>
              <Trans key={TKEYS.offer["other-offers"]} />:
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
        </Show>
      </div>
    </div>
  );
}
