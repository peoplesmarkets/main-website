import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";
import { StripeLogo } from "../../../components/assets";
import { ContentError, Font } from "../../../components/content";
import { ActionButton, MdButton } from "../../../components/form";
import { OpenInNewIcon } from "../../../components/icons";
import { MdLoading } from "../../../components/navigation";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/sited_io/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import styles from "./UpdateStripeForm.module.scss";
import { buildBaseUrl } from "../../../lib";
import { Redirect } from "../../../components/navigation/Redirect";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdateStripeForm(props: Props) {
  const location = useLocation();
  const [trans] = useTransContext();

  const { stripeService } = useServiceClientContext();

  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccountDetails] = createResource(
    () => props.shop?.shopId,
    async (shopId: string) => {
      return stripeService
        .getAccountDetails(shopId)
        .then((res) => res)
        .catch((err) => {
          if (err.code && err.code === grpc.Code.NotFound) {
            return;
          }
          throw err;
        });
    }
  );

  function stripeAccountState() {
    if (stripeAccountDetails.state === "errored") {
      return "errored";
    }
    if (stripeAccountDetails.state === "pending") {
      return "pending";
    }

    if (_.isNil(stripeAccountDetails())) {
      return "missing";
    } else if (
      !stripeAccountDetails()?.details?.chargesEnabled ||
      !stripeAccountDetails()?.details?.detailsSubmitted
    ) {
      return "in-progress";
    } else {
      return "configured";
    }
  }

  async function handleCreateStripeIntegration() {
    const shopId = props.shop?.shopId;
    if (_.isNil(shopId)) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount(shopId);
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    const shopId = props.shop?.shopId;
    if (_.isNil(shopId)) {
      return;
    }

    setRedirecting(true);

    try {
      const { link } = await stripeService.createAccountLink(
        shopId,
        `${buildBaseUrl(location.pathname)}${location.search}`
      );
      window.location.href = link;
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  return (
    <>
      <div class={commonStyles.Form}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.dashboard.shop.stripe.integration}
        />

        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <span class={commonStyles.Details}>
              <Trans
                key={TKEYS.dashboard.shop.stripe["integration-info-left"]}
              />{" "}
              <A
                class={commonStyles.Link}
                href={trans(TKEYS.dashboard.shop.stripe.url)}
                target="_blank"
              >
                <Trans key={TKEYS.dashboard.shop.stripe.title} />
                <OpenInNewIcon class={commonStyles.OpenInNewIcon} />
              </A>
              <Trans
                key={TKEYS.dashboard.shop.stripe["integration-info-right"]}
              />
            </span>
          </div>

          <Switch
            fallback={
              <span>
                <Trans key={TKEYS.dashboard.shop["no-shop-yet"]} />
              </span>
            }
          >
            <Match when={stripeAccountState() === "errored"}>
              <ContentError />
            </Match>
            <Match when={stripeAccountState() === "pending"}>
              <MdButton type="text" disabled>
                <MdLoading style={{ height: "48px" }} />
              </MdButton>
            </Match>
            <Match when={stripeAccountState() === "missing"}>
              <ActionButton
                actionType="active"
                wide
                tall
                onClick={handleCreateStripeIntegration}
              >
                <Trans key={TKEYS.dashboard.shop.stripe["start-integration"]} />
                <StripeLogo class={styles.StripeLogo} />
              </ActionButton>
            </Match>
            <Match when={stripeAccountState() === "in-progress"}>
              <ActionButton
                actionType="active"
                wide
                tall
                onClick={handleContinueStripeIntegration}
              >
                <Trans
                  key={TKEYS.dashboard.shop.stripe["continue-integration"]}
                />
                <StripeLogo class={styles.StripeLogo} />
              </ActionButton>
            </Match>
            <Match when={stripeAccountState() === "configured"}>
              <span class={styles.Ok}>
                <Font
                  type="label"
                  key={TKEYS.dashboard.shop.stripe.connected}
                />
              </span>
            </Match>
          </Switch>
        </div>
      </div>

      <Show when={redirecting()}>
        <Redirect />
      </Show>
    </>
  );
}
