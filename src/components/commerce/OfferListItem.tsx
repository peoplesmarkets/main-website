import { A } from "@solidjs/router";

import { OFFERS_PATH } from "../../App";
import { buildPath } from "../../lib";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Multiline } from "../content";
import styles from "./OfferListItem.module.scss";

type Props = {
  readonly offer: OfferResponse;
};

export function OfferListItem(props: Props) {
  return (
    <A
      class={styles.OfferListItem}
      href={buildPath(OFFERS_PATH, props.offer.offerId)}
    >
      <span class={styles.Label}>{props.offer.name}</span>
      <span class={styles.Detail}>
        <Multiline text={() => props.offer.description} maxRows={6} />
      </span>
    </A>
  );
}
