import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  buildInventoryUrl,
  buildOfferPath,
  buildOfferUrl,
} from "../../routes/shops/shop-routing";
import { MediaSubscriptionService, StripeService } from "../../services";
import {
  OfferResponse,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { PriceType } from "../../services/peoplesmarkets/commerce/v1/price";
import { isResolved } from "../content";
import { ActionButton } from "../form";
import { LinkButton } from "../form/LinkButton";
import styles from "./OfferBuy.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
};

export function OfferBuy(props: Props) {
  const { accessToken, isAuthenticated } = useAccessTokensContext();

  const stripeService = new StripeService(accessToken);
  const mediaSubscriptionService = new MediaSubscriptionService(accessToken);

  const shopData = useRouteData<typeof ShopData>();

  const [mediaSubscription] = createResource(
    () => props.offer()?.offerId,
    fetchMediaSubscription
  );

  async function fetchMediaSubscription(offerId: string) {
    const response = await mediaSubscriptionService.get({ offerId });
    return response.mediaSubscription;
  }

  function actionState() {
    if (isResolved(mediaSubscription.state) && !_.isNil(mediaSubscription())) {
      return "already-subscribed";
    }

    if (_.isNil(shopData?.stripeAccount())) {
      return "loading";
    }

    if (!shopData.stripeAccount()?.enabled) {
      if (shopData?.shop()?.contactEmailAddress) {
        return "contact-email";
      }
      return "no-payment-method";
    } else if (
      props.offer().price?.priceType === PriceType.PRICE_TYPE_RECURRING &&
      props.offer().type === OfferType.OFFER_TYPE_DIGITAL &&
      !isAuthenticated()
    ) {
      return "login";
    } else if (
      props.offer().price?.priceType === PriceType.PRICE_TYPE_RECURRING
    ) {
      return "subscribe";
    } else {
      return "buy";
    }
  }

  function contactEmailAddress() {
    const contactEmailAddress = shopData?.shop()?.contactEmailAddress;
    return contactEmailAddress || "";
  }

  async function handleCheckout() {
    const offerId = props.offer().offerId;
    const shopSlug = props.offer().shopSlug;
    const inventoryUrl = buildInventoryUrl(shopSlug);
    const offerUrl = buildOfferUrl(props.offer().shopSlug, offerId);

    const response = await stripeService.createCheckoutSession(
      offerId,
      inventoryUrl,
      offerUrl
    );

    window.location.href = response.link;
  }

  async function handleSignIn() {
    const signInUrl = await buildAuthorizationRequest(
      "login",
      buildOfferPath(shopData.shop()!.slug, props.offer().offerId)
    );
    window.location.href = signInUrl.toString();
  }

  return (
    <div class={styles.OfferBuy}>
      <Show when={!_.isNil(props.offer().price)}>
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
