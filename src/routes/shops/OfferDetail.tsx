import { Trans } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createEffect, createResource } from "solid-js";

import { ContentError, isResolved } from "../../components/content";
import { Border, Section } from "../../components/layout";
import { OfferDetailView, OfferList } from "../../components/shops";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferDetail.module.scss";

export default function OfferDetail() {
  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offer, { refetch }] = createResource(
    () => useParams().offerId,
    fetchOffer
  );

  const [otherOffers] = createResource(() => offer(), fetchOtherOffers);

  createEffect(() => {
    refetch(useParams().offerId);
  });

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  async function fetchOtherOffers(offer: OfferResponse) {
    const response = await offerService.list({
      shopId: offer.shopId,
    });
    return response.offers.filter((o) => o.offerId !== offer.offerId);
  }

  return (
    <>
      <Switch>
        <Match when={offer.state === "errored"}>
          <Section>
            <ContentError />
          </Section>
        </Match>
        <Match when={isResolved(offer.state) && !_.isNil(offer())}>
          <Section>
            <OfferDetailView offer={() => offer()!} />
          </Section>
        </Match>
      </Switch>

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
    </>
  );
}
