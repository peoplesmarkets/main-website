import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildOfferPath } from "../../routes/shops/ShopRoutes";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { OfferPrice } from "../commerce/OfferPrice";
import styles from "./OfferList.module.scss";

type Props = {
  readonly offers: () => OfferResponse[];
};

export function OfferList(props: Props) {
  return (
    <div class={styles.OfferList}>
      <For each={props.offers()}>
        {(offer) => (
          <div class={styles.ListItem}>
            <A href={buildOfferPath(offer.marketBoothId, offer.offerId)}>
              <div class={styles.Card}>
                <Show when={!_.isEmpty(offer.images)}>
                  <div class={styles.CardImage}>
                    <img
                      class={styles.Image}
                      src={_.first(offer.images)?.imageUrl}
                      alt=""
                    />
                  </div>
                </Show>

                <div class={styles.CardInfo}>
                  <A
                    class={styles.Name}
                    href={buildOfferPath(offer.marketBoothId, offer.offerId)}
                  >
                    {offer.name}
                  </A>

                  <div class={styles.Price}>
                    <Show when={!_.isNil(offer?.price)}>
                      <OfferPrice offer={() => offer} small />
                    </Show>
                  </div>
                </div>
              </div>
            </A>
          </div>
        )}
      </For>
    </div>
  );
}
