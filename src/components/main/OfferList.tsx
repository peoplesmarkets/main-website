import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";
import { TKEYS } from "../../locales";

import {
  buildOfferPathOrUrl,
  buildShopPathOrUrl,
} from "../../routes/shops/shop-routing";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { OfferPrice } from "../commerce/OfferPrice";
import styles from "../shops/OfferList.module.scss";

type Props = {
  readonly offers: OfferResponse[] | undefined;
};

export function OfferList(props: Props) {
  return (
    <div class={styles.OfferList}>
      <For each={props.offers}>
        {(offer) => (
          <div class={styles.ListItem}>
            <div class={styles.Card}>
              <A
                class={styles.CardImage}
                href={buildOfferPathOrUrl(
                  offer.shopSlug,
                  offer.offerId,
                  offer.shopDomain
                )}
                target="_blank"
              >
                <Show when={!_.isEmpty(offer.images)}>
                  <img
                    class={styles.Image}
                    src={_.first(offer.images)?.imageUrl}
                    alt=""
                  />
                </Show>

                <Show when={_.isEmpty(offer.images)}>
                  <PlaceholderImage />
                </Show>
              </A>

              <div class={styles.CardInfo}>
                <A
                  class={styles.Name}
                  href={buildOfferPathOrUrl(
                    offer.shopSlug,
                    offer.offerId,
                    offer.shopDomain
                  )}
                  target="_blank"
                >
                  {offer.name}
                </A>

                <span class={styles.Info}>
                  <Trans key={TKEYS.common.by} />:{" "}
                  <A
                    class={styles.InfoLink}
                    href={buildShopPathOrUrl(offer.shopDomain, offer.shopSlug)}
                    target="_blank"
                  >
                    {offer.shopName}
                  </A>
                </span>

                <div class={styles.Price}>
                  <Show when={!_.isNil(offer?.price)}>
                    <OfferPrice offer={() => offer} small />
                  </Show>
                </div>
              </div>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
