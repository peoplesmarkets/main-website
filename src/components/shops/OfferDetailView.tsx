import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";

import { TKEYS } from "../../locales";
import {
  OfferResponse,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { OfferImages, OfferPrice } from "../commerce";
import { Font, Multiline } from "../content";
import { Section } from "../layout";
import { OfferBuy } from "./OfferBuy";
import styles from "./OfferDetailView.module.scss";

type Props = {
  readonly offer: () => OfferResponse | undefined;
};

export function OfferDetailView(props: Props) {
  return (
    <div class={styles.OfferDetailView}>
      <Section class={styles.Images}>
        <Show when={!_.isEmpty(props.offer()?.images)}>
          <OfferImages offer={() => props.offer()} />
        </Show>
      </Section>

      <Section class={styles.Summary} padded>
        <div>
          <OfferPrice class={styles.Price} offer={props.offer} />

          <span class={styles.Title}>{props.offer()?.name}</span>
        </div>

        <div>
          <OfferBuy offer={() => props.offer()} />

          <Show when={props.offer()?.type === OfferType.OFFER_TYPE_DIGITAL}>
            <Font type="label" key={TKEYS.offer["downloadable-content"]} />
            <Font
              type="detail"
              key={TKEYS.offer["downloadable-content-info"]}
            />
          </Show>
        </div>
      </Section>

      <Section class={styles.Information}>
        <Show when={!_.isEmpty(props.offer()?.description)}>
          <span class={styles.Subtitle}>
            <Trans key={TKEYS.offer.labels.Description} />:
          </span>

          <span class={styles.Description}>
            <Multiline text={props.offer()?.description} />
          </span>
        </Show>
      </Section>
    </div>
  );
}
