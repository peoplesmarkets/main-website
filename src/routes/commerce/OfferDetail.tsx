import { useParams } from "@solidjs/router";
import { Page, Section } from "../../components/layout";
import { OfferService } from "../../services";
import { Match, Show, Switch, createResource } from "solid-js";
import {
  ContentError,
  ContentLoading,
  Multiline,
  isResolved,
} from "../../components/content";
import styles from "./OfferDetail.module.scss";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";
import { secondsToLocaleString } from "../../lib";
import _ from "lodash";
import { OfferImages } from "../../components/commerce";

export default function OfferDetail() {
  const { offerId } = useParams();

  const offerService = new OfferService();

  const [offer] = createResource(offerId, fetchOffer);

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
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
          <span class={styles.Headline}>{offer()?.name}</span>

          <Show when={!_.isNil(offer()) && !_.isEmpty(offer()?.images)}>
            <OfferImages offer={() => offer()!} />
          </Show>

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
          <Section>
            <span class={styles.Details}>
              <Trans key={TKEYS.offer.labels["Created-at"]} />:{" "}
              {secondsToLocaleString(offer()?.createdAt)}
            </span>
            <span class={styles.Details}>
              <Trans key={TKEYS.offer.labels["Updated-at"]} />:{" "}
              {secondsToLocaleString(offer()?.updatedAt)}
            </span>
          </Section>
        </Match>
      </Switch>
    </Page>
  );
}
