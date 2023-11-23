import { Trans } from "@mbarzda/solid-i18next";
import { useParams } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
} from "solid-js";

import { ContentError } from "../../components/content";
import { Border, Section } from "../../components/layout";
import { OfferDetailView } from "../../components/shops";
import { OfferList } from "../../components/shops/OfferList";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferDetail.module.scss";

export default function OfferDetail() {
  const { offerService } = useServiceClientContext();

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
      <ErrorBoundary fallback={<ContentError />}>
        <Suspense>
          <Section>
            <OfferDetailView offer={() => offer()!} />
          </Section>
        </Suspense>
      </ErrorBoundary>

      <Show when={!_.isEmpty(otherOffers())}>
        <Border />

        <Section>
          <span class={styles.Subtitle}>
            <Trans key={TKEYS.offer["other-offers"]} />:
          </span>
          <ErrorBoundary fallback={<ContentError />}>
            <Suspense>
              <Section>
                <OfferList offers={otherOffers()} />
              </Section>
            </Suspense>
          </ErrorBoundary>
        </Section>
      </Show>
    </>
  );
}
