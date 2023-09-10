import { For } from "solid-js";

import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferList.module.scss";
import { OfferListItem } from "./OfferListItem";

type Props = {
  readonly offers: () => OfferResponse[];
  readonly showMarketBooth?: boolean;
};

export function OfferList(props: Props) {
  return (
    <div class={styles.OfferList}>
      <For each={props.offers()}>
        {(offer) => (
          <OfferListItem
            offer={() => offer}
            showMarketBooth={props.showMarketBooth}
          />
        )}
      </For>
    </div>
  );
}
