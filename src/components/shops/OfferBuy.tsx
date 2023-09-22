import { Trans } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildAuthorizationRequest } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import { StripeService } from "../../services";
import {
  OfferResponse,
  OfferType,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { PriceType } from "../../services/peoplesmarkets/commerce/v1/price";
import { isResolved } from "../content";
import { ActionButton } from "../form";
import styles from "./OfferBuy.module.scss";
import { buildOfferPath } from "../../routes/shops/ShopRoutes";

type Props = {
  readonly offer: () => OfferResponse;
};

export function OfferBuy(props: Props) {
  const { accessToken, isAuthenticated } = useAccessTokensContext();

  const stripeService = new StripeService(accessToken);

  const shopData = useRouteData<typeof ShopData>();

  function actionState() {
    if (isResolved(shopData.stripeAccount.data.state)) {
      if (!shopData.stripeAccount.data()?.enabled) {
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
    } else if (shopData.stripeAccount.data.state === "errored") {
      return "no-payment-method";
    }

    return "loading";
  }

  async function handleCheckout() {
    const response = await stripeService.createCheckoutSession(
      props.offer().shopSlug,
      props.offer().offerId
    );
    window.location.href = response.link;
  }

  async function handleSignIn() {
    window.location.href = (
      await buildAuthorizationRequest(
        "login",
        buildOfferPath(
          shopData.shop.data()!.slug,
          props.offer().offerId
        )
      )
    ).toString();
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
      </Show>
    </div>
  );
}
