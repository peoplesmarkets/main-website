import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Multiline } from "../content";
import styles from "./OfferListItem.module.scss";

type Props = {
  readonly offer: OfferResponse;
};

export function OfferListItem(props: Props) {
  return (
    <div class={styles.OfferListItem}>
      <span class={styles.Label}>{props.offer.name}</span>
      <span class={styles.Detail}>
        <Multiline text={() => props.offer.description} maxRows={6} />
      </span>
    </div>
  );
}
