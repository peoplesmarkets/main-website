import { A } from "@solidjs/router";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Multiline } from "../content";
import styles from "./OfferListItem.module.scss";
import { OFFERS_PATH, buildPath } from "../../App";

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
