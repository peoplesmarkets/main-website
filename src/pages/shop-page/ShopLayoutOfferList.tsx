import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildOfferDetailPath } from "../../routes/shops/shop-routing";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { OfferPrice } from "../OfferPrice";
import styles from "./ShopLayoutOfferList.module.scss";

type Props = {
  readonly offers: OfferResponse[] | undefined;
};

export function ShopLayoutOfferList(props: Props) {
  return (
    <>
      <div class={styles.OfferList}>
        <For each={props.offers}>
          {(offer) => (
            <div class={styles.ListItem}>
              <A href={buildOfferDetailPath(offer.shopSlug, offer.offerId)}>
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
                      href={buildOfferDetailPath(offer.shopSlug, offer.offerId)}
                    >
                      {offer.name}
                    </A>

                    <div class={styles.Price}>
                      <Show when={!_.isNil(offer?.price)}>
                        <OfferPrice offer={offer} small />
                      </Show>
                    </div>
                  </div>
                </div>
              </A>
            </div>
          )}
        </For>
      </div>
    </>
  );
}
