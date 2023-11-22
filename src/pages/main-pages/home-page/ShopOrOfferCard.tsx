import { Show } from "solid-js";

import { OfferResponse } from "../../../services/peoplesmarkets/commerce/v1/offer";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import { Offer, Shop, ShopOrOffer } from "./Page";
import styles from "./ShopOrOfferCard.module.scss";
import { A } from "@solidjs/router";
import {
  buildOfferPathOrUrl,
  buildShopDetailPathOrUrl,
} from "../../../routes/shops/shop-routing";
import { OfferPrice } from "../../OfferPrice";
import _ from "lodash";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../../locales";
import { PlaceholderImage } from "../../../components/assets";
import { Font } from "../../../components/content";

type Props = {
  readonly shopOrOffer: ShopOrOffer;
};

export function ShopOrOfferCard(props: Props) {
  return (
    <>
      <Show
        when={props.shopOrOffer.type === "shop"}
        fallback={<OfferCard offer={(props.shopOrOffer as Offer).offer} />}
      >
        <ShopCard shop={(props.shopOrOffer as Shop).shop} />
      </Show>
    </>
  );
}

function ShopCard(props: { shop: ShopResponse }) {
  return (
    <>
      <div class={styles.ShopCard}>
        <div class={styles.ShopLabel}>
          <Font type="label" active key={TKEYS.shop.title} />
        </div>

        <Show when={!_.isEmpty(props.shop.customization?.bannerImageLightUrl)}>
          <A
            class={styles.CardImage}
            href={buildShopDetailPathOrUrl(props.shop.domain, props.shop.slug)}
            target="_blank"
          >
            <img
              class={styles.Image}
              src={props.shop.customization?.bannerImageLightUrl}
              alt=""
            />
          </A>
        </Show>

        <div class={styles.CardInfo}>
          <A
            class={styles.Name}
            href={buildShopDetailPathOrUrl(props.shop.domain, props.shop.slug)}
            target="_blank"
          >
            {props.shop.name}
          </A>

          <Font type="detail">{props.shop.description}</Font>
        </div>
      </div>
    </>
  );
}

function OfferCard(props: { offer: OfferResponse }) {
  return (
    <>
      <div class={styles.OfferCard}>
        <div class={styles.Card}>
          <A
            class={styles.CardImage}
            href={buildOfferPathOrUrl(
              props.offer.shopSlug,
              props.offer.offerId,
              props.offer.shopDomain
            )}
            target="_blank"
          >
            <Show when={!_.isEmpty(props.offer.images)}>
              <img
                class={styles.Image}
                src={_.first(props.offer.images)?.imageUrl}
                alt=""
              />
            </Show>

            <Show when={_.isEmpty(props.offer.images)}>
              <div class={styles.Image}>
                <PlaceholderImage />
              </div>
            </Show>
          </A>

          <div class={styles.CardInfo}>
            <A
              class={styles.Name}
              href={buildOfferPathOrUrl(
                props.offer.shopSlug,
                props.offer.offerId,
                props.offer.shopDomain
              )}
              target="_blank"
            >
              {props.offer.name}
            </A>

            <span class={styles.Info}>
              <Trans key={TKEYS.common.by} />:{" "}
              <A
                class={styles.InfoLink}
                href={buildShopDetailPathOrUrl(
                  props.offer.shopDomain,
                  props.offer.shopSlug
                )}
                target="_blank"
              >
                {props.offer.shopName}
              </A>
            </span>

            <div class={styles.Price}>
              <Show when={!_.isNil(props.offer?.price)}>
                <OfferPrice offer={props.offer} small />
              </Show>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
