import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { buildAuthorizationRequest, resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  buildInventoryUrl,
  buildOfferPath,
  buildOfferUrl,
} from "../../routes/shops/shop-routing";
import {
  OfferResponse,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { PriceType } from "../../services/peoplesmarkets/commerce/v1/price";
import { ActionButton } from "../form";
import { LinkButton } from "../form/LinkButton";
import styles from "./OfferBuy.module.scss";

type Props = {
  readonly offer: () => OfferResponse | undefined;
};

export function OfferBuy(props: Props) {
  const { isAuthenticated } = useAccessTokensContext();

  const { stripeService, mediaSubscriptionService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [mediaSubscription] = createResource(
    () => props.offer()?.offerId,
    fetchMediaSubscription
  );

  const [stripeAccount] = createResource(shopData?.shopId, fetchStripeAccount);

  async function fetchMediaSubscription(offerId: string) {
    const response = await mediaSubscriptionService.get({ offerId });
    return response.mediaSubscription;
  }

  async function fetchStripeAccount(shopId: string) {
    let stripeAccount = {
      shopId,
      enabled: false,
    };

    try {
      const response = await stripeService.getAccount(shopId);
      if (!_.isNil(response.account)) {
        stripeAccount = response.account;
      }
    } catch (err) {
      return stripeAccount;
    }

    return stripeAccount;
  }

  function actionState() {
    if (resourceIsReady(mediaSubscription) && !_.isNil(mediaSubscription())) {
      return "already-subscribed";
    }

    if (!resourceIsReady(stripeAccount)) {
      return "loading";
    }

    if (!stripeAccount()?.enabled) {
      if (!_.isEmpty(shopData.shop()?.contactEmailAddress)) {
        return "contact-email";
      }
      return "no-payment-method";
    }

    if (
      props.offer()?.price?.priceType === PriceType.PRICE_TYPE_RECURRING &&
      props.offer()?.type === OfferType.OFFER_TYPE_DIGITAL &&
      !isAuthenticated()
    ) {
      return "login";
    }

    if (props.offer()?.price?.priceType === PriceType.PRICE_TYPE_RECURRING) {
      return "subscribe";
    }

    return "buy";
  }

  function contactEmailAddress() {
    if (resourceIsReady(shopData.shop)) {
      return shopData.shop()?.contactEmailAddress || "";
    }
    return "";
  }

  async function handleCheckout() {
    const offerId = props.offer()?.offerId;
    const shopSlug = props.offer()?.shopSlug;

    if (!_.isNil(offerId) && !_.isNil(shopSlug)) {
      const inventoryUrl = buildInventoryUrl(shopSlug);
      const offerUrl = buildOfferUrl(shopSlug, offerId);

      const response = await stripeService.createCheckoutSession(
        offerId,
        inventoryUrl,
        offerUrl
      );

      window.location.href = response.link;
    }
  }

  async function handleSignIn() {
    const offerId = props.offer()?.offerId;
    const shopSlug = shopData.shop()?.slug;
    if (
      !resourceIsReady(shopData.shop) ||
      _.isNil(shopSlug) ||
      _.isNil(offerId)
    ) {
      return;
    }

    const signInUrl = await buildAuthorizationRequest(
      "login",
      buildOfferPath(shopSlug, offerId)
    );
    window.location.href = signInUrl.toString();
  }

  return (
    <div class={styles.OfferBuy}>
      <Show when={!_.isNil(props.offer()?.price)}>
        <Show when={actionState() === "login"}>
          <ActionButton actionType="active" onClick={handleSignIn} wide>
            <Trans key={TKEYS.offer["sign-in-to-subscribe"]} />
          </ActionButton>
        </Show>

        <Show when={actionState() === "no-payment-method"}>
          <ActionButton
            actionType="neutral-filled"
            onClick={() => {}}
            wide
            disabled
          >
            <Trans key={TKEYS.offer["currently-not-available"]} />
          </ActionButton>
        </Show>

        <Show when={actionState() === "subscribe"}>
          <ActionButton
            actionType="active-filled"
            onClick={handleCheckout}
            wide
          >
            <Trans key={TKEYS.form.action.Subscribe} />
          </ActionButton>
        </Show>

        <Show when={actionState() === "contact-email"}>
          <LinkButton
            actionType="active-filled"
            href={"mailto:" + contactEmailAddress()}
            mail
            wide
          >
            <Trans key={TKEYS.offer["contact-shop"]} />
          </LinkButton>
        </Show>

        <Show when={actionState() === "buy"}>
          <ActionButton
            actionType="active-filled"
            onClick={handleCheckout}
            wide
          >
            <Trans key={TKEYS.form.action.Buy} />
          </ActionButton>
        </Show>

        <Show when={actionState() === "loading"}>
          <ActionButton
            actionType="active-filled"
            wide
            disabled
            onClick={() => {}}
          >
            {""}
          </ActionButton>
        </Show>

        <Show when={actionState() === "already-subscribed"}>
          <ActionButton
            actionType="active-filled"
            wide
            disabled
            onClick={() => {}}
          >
            <Trans key={TKEYS.subscription["already-subscribed"]} />
          </ActionButton>
        </Show>
      </Show>
    </div>
  );
}
