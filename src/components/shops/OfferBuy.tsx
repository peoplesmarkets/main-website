import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, Suspense, createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import {
  buildAuthorizationRequest,
  buildBaseUrl,
  resourceIsReady,
} from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  buildInventoryPath,
  buildInventoryUrl,
} from "../../routes/shops/shop-routing";
import {
  OfferResponse,
  OfferType,
} from "../../services/sited_io/commerce/v1/offer";
import { PriceType } from "../../services/sited_io/commerce/v1/price";
import { ContentLoading, Font } from "../content";
import { MdButton } from "../form";
import { LinkButton } from "../form/LinkButton";
import styles from "./OfferBuy.module.scss";

type Props = {
  readonly offer: OfferResponse | undefined;
};

export function OfferBuy(props: Props) {
  const location = useLocation();

  const { isAuthenticated } = useAccessTokensContext();

  const { stripeService, mediaSubscriptionService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [mediaSubscription] = createResource(
    () => props.offer?.offerId,
    fetchMediaSubscription
  );

  const [registerUrl] = createResource(
    () => !isAuthenticated(),
    async () => {
      const registerUrl = await buildAuthorizationRequest(
        "create",
        location.pathname,
        shopData.shop()?.clientId
      );
      return registerUrl.toString();
    }
  );

  const [signInUrl] = createResource(
    () => !isAuthenticated(),
    async () => {
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        location.pathname,
        shopData.shop()?.clientId
      );

      return signInUrl.toString();
    }
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
    if (resourceIsReady(mediaSubscription)) {
      const subscription = mediaSubscription();
      if (
        !_.isNil(subscription) &&
        subscription.payedUntil > new Date().getTime() / 1000
      ) {
        return "already-subscribed";
      }
    }

    if (stripeAccount.loading) {
      return "loading";
    }

    if (!stripeAccount()?.enabled) {
      if (!_.isEmpty(shopData.shop()?.contactEmailAddress)) {
        return "contact-email";
      }
      return "no-payment-method";
    }

    if (
      props.offer?.price?.priceType === PriceType.PRICE_TYPE_RECURRING &&
      props.offer?.type === OfferType.OFFER_TYPE_DIGITAL &&
      !isAuthenticated()
    ) {
      return "login";
    }

    if (props.offer?.price?.priceType === PriceType.PRICE_TYPE_RECURRING) {
      return "subscribe";
    }

    return "buy";
  }

  function contactEmailAddress() {
    const shop = shopData.shop();
    if (!_.isNil(shop?.contactEmailAddress)) {
      return shop.contactEmailAddress;
    }
    return "";
  }

  function inventoryPath() {
    const shopSlug = props.offer?.shopSlug;
    if (!_.isNil(shopSlug)) {
      return buildInventoryPath(shopSlug);
    }
    return "#";
  }

  async function handleCheckout() {
    const offerId = props.offer?.offerId;
    const shopSlug = props.offer?.shopSlug;

    if (!_.isNil(offerId) && !_.isNil(shopSlug)) {
      const inventoryUrl = buildInventoryUrl(shopSlug);

      const response = await stripeService.createCheckoutSession(
        offerId,
        inventoryUrl,
        buildBaseUrl(location.pathname)
      );

      window.location.href = response.link;
    }
  }

  return (
    <div class={styles.OfferBuy}>
      <Show when={!_.isNil(props.offer?.price)}>
        <Show when={actionState() === "login"}>
          <div>
            <Font type="label" key={TKEYS.offer["downloadable-content"]} />
            <Font type="body" key={TKEYS.offer["downloadable-content-info"]} />
          </div>

          <div class={styles.Actions}>
            <Suspense>
              <MdButton type="outlined" square wide href={signInUrl()}>
                <Trans key={TKEYS.authentication["sign-in"]} />
              </MdButton>
              <Font type="label" key={TKEYS.common.or} />
              <MdButton type="outlined" square wide href={registerUrl()}>
                <Trans key={TKEYS.authentication.register} />
              </MdButton>
            </Suspense>
          </div>
        </Show>

        <Show when={actionState() === "no-payment-method"}>
          <MdButton type="filled" wide square disabled>
            <Trans key={TKEYS.offer["currently-not-available"]} />
          </MdButton>
        </Show>

        <Show when={actionState() === "subscribe"}>
          <MdButton type="filled" wide square onClick={handleCheckout}>
            <Trans key={TKEYS.form.action.Subscribe} />
          </MdButton>
        </Show>

        <Show when={actionState() === "contact-email"}>
          <MdButton
            type="filled"
            square
            wide
            href={"mailto:" + contactEmailAddress()}
          >
            <Trans key={TKEYS.offer["contact-shop"]} />
          </MdButton>
        </Show>

        <Show when={actionState() === "buy"}>
          <MdButton type="filled" square wide onClick={handleCheckout}>
            <Trans key={TKEYS.form.action.Buy} />
          </MdButton>
        </Show>

        <Show when={actionState() === "loading"}>
          <div class={styles.Loading}>
            <ContentLoading />
          </div>
        </Show>

        <Show when={actionState() === "already-subscribed"}>
          <Font type="label" key={TKEYS.subscription["already-subscribed"]} />
          <LinkButton actionType="active" wide href={inventoryPath()}>
            <Trans key={TKEYS.media.Inventory} />
          </LinkButton>
        </Show>
      </Show>
    </div>
  );
}
