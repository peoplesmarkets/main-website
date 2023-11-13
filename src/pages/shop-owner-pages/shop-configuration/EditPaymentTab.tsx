import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";

import { StripeLogo } from "../../../components/assets/StripeLogo";
import { ContentError } from "../../../components/content";
import { ActionButton, MdButton, MdTextField } from "../../../components/form";
import { OpenInNewIcon } from "../../../components/icons";
import { MdDialog } from "../../../components/layout/MdDialog";
import { MdLoading } from "../../../components/navigation";
import { Redirect } from "../../../components/navigation/Redirect";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { buildBaseUrl, resourceIsReady } from "../../../lib";
import { TKEYS } from "../../../locales";
import { buildOffersConfigurationPath } from "../../../routes/shops/shop-routing";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { PublishShopDialog } from "../PublishShopDialog";
import styles from "./EditPaymentTab.module.scss";

type Dialogs = "none" | "empty-offers" | "publish-shop";

type Props = {
  shop: ShopResponse | undefined;
  prev: () => void;
  onUpdate?: () => void;
};

export function EditPaymentTab(props: Props) {
  const location = useLocation();
  const [trans] = useTransContext();

  const { shopService, offerService, stripeService } =
    useServiceClientContext();

  const [redirecting, setRedirecting] = createSignal(false);
  const [showDialog, setShowDialg] = createSignal<Dialogs>("none");

  const [stripeAccountDetails] = createResource(
    () => props.shop?.shopId,
    fetchStripeAccountDetails
  );

  const emptyUpdateEmailRequest = {
    shopId: undefined as string | undefined,
    contactEmailAddress: undefined as string | undefined,
  } as UpdateShopRequest;

  const updateEmailFields = Object.keys(emptyUpdateEmailRequest);

  const [updateEmailRequest, setUpdateEmailRequest] = createStore(
    _.clone(emptyUpdateEmailRequest)
  );

  const [errors, setErrors] = createStore({
    contactEmailAddress: [] as string[],
  });

  async function fetchStripeAccountDetails(shopId: string) {
    try {
      const response = await stripeService.getAccountDetails(shopId);
      return response;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        return;
      }

      throw err;
    }
  }

  createEffect(() => {
    if (
      _.isNil(updateEmailRequest.shopId) ||
      _.isEmpty(updateEmailRequest.shopId)
    ) {
      setUpdateEmailRequest(_.clone(_.pick(props.shop, updateEmailFields)));
    }
  });

  function resetErrors() {
    setErrors({ contactEmailAddress: [] });
  }

  function updateEmailDataWasChanged() {
    return !_.isEqual(
      _.pick(props.shop, updateEmailFields),
      _.pick(updateEmailRequest, updateEmailFields)
    );
  }

  function dataWasChanged() {
    return updateEmailDataWasChanged();
  }

  function stripeAccountState() {
    if (stripeAccountDetails.state === "errored") {
      return "errored";
    }
    if (stripeAccountDetails.state === "pending") {
      return "pending";
    }
    if (resourceIsReady(stripeAccountDetails)) {
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

  function handleContactEmailAddressInput(value: string) {
    resetErrors();
    setUpdateEmailRequest("contactEmailAddress", value.trim());
  }

  async function handleUpdateEmail() {
    await shopService.update(updateEmailRequest);
    handleUpdate();
  }

  async function handleSave() {
    if (updateEmailDataWasChanged()) {
      await handleUpdateEmail();
    }
  }

  async function handleStartPublish(event: SubmitEvent) {
    event.preventDefault();

    await handleSave();

    const offersResponse = await offerService.list({
      shopId: props.shop?.shopId,
    });

    if (_.isEmpty(offersResponse.offers)) {
      setShowDialg("empty-offers");
    } else {
      setShowDialg("publish-shop");
    }
  }

  function handleCloseDialog() {
    setShowDialg("none");
  }

  function handleUpdate() {
    handleCloseDialog();
    props.onUpdate?.();
  }

  return (
    <>
      <form class={commonStyles.Form} onSubmit={handleStartPublish}>
        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <span class={commonStyles.Headline}>
              <Trans key={TKEYS.dashboard.shop.stripe.integration} />
            </span>

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

          <div class={commonStyles.Field}>
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
                  onClick={handleCreateStripeIntegration}
                >
                  <Trans
                    key={TKEYS.dashboard.shop.stripe["start-integration"]}
                  />
                  <StripeLogo class={styles.StripeLogo} />
                </ActionButton>
              </Match>
              <Match when={stripeAccountState() === "in-progress"}>
                <ActionButton
                  actionType="active"
                  wide
                  onClick={handleContinueStripeIntegration}
                >
                  <Trans
                    key={TKEYS.dashboard.shop.stripe["continue-integration"]}
                  />{" "}
                  <StripeLogo class={styles.StripeLogo} />
                </ActionButton>
              </Match>
              <Match when={stripeAccountState() === "configured"}>
                <span class={styles.Ok}>
                  <Trans key={TKEYS.form.action.OK} />
                </span>
              </Match>
            </Switch>
          </div>

          <div class={commonStyles.FieldInfo}>
            <span class={commonStyles.Headline}>
              <Trans key={TKEYS.shop.labels["contact-email-address"]} />
            </span>
            <span class={commonStyles.Details}>
              <Trans key={TKEYS.dashboard.shop.contact.info} />
            </span>
          </div>

          <div class={commonStyles.Field}>
            <MdTextField
              label={trans(TKEYS.shop.labels["contact-email-address"])}
              value={updateEmailRequest.contactEmailAddress}
              onValue={handleContactEmailAddressInput}
              error={!_.isEmpty(errors.contactEmailAddress)}
              errorText={errors.contactEmailAddress}
            />
          </div>
        </div>

        <div class={commonStyles.Actions}>
          <div class={commonStyles.ActionsLeft}>
            <ActionButton actionType="neutral" onClick={props.prev}>
              <Trans key={TKEYS.form.action.Previous} />
            </ActionButton>
          </div>

          <div class={commonStyles.ActionsRight}>
            <Show
              when={!props.shop?.isActive}
              fallback={
                <ActionButton
                  actionType="active-filled"
                  onClick={handleUpdateEmail}
                  disabled={!dataWasChanged()}
                >
                  <Trans key={TKEYS.form.action.Save} />
                </ActionButton>
              }
            >
              <ActionButton
                actionType="active-filled"
                onClick={handleStartPublish}
              >
                <Trans key={TKEYS.dashboard.shop.visibility["publish-shop"]} />
              </ActionButton>
            </Show>
          </div>
        </div>
      </form>

      <MdDialog
        open={showDialog() === "empty-offers"}
        onClose={handleCloseDialog}
      >
        <div slot="headline">
          <span>
            <Trans key={TKEYS.dashboard.shop["empty-offers-warning-title"]} />
          </span>
        </div>
        <div slot="content">
          <span class={commonStyles.Details}>
            <Trans key={TKEYS.dashboard.shop["empty-offers-warning-content"]} />{" "}
            <A
              class={commonStyles.Link}
              href={buildOffersConfigurationPath(props.shop?.slug!)}
            >
              <Trans key={TKEYS.dashboard.offers["create-your-first-offer"]} />
            </A>
          </span>
        </div>
        <div slot="actions">
          <MdButton type="outlined" onClick={handleCloseDialog}>
            <Trans key={TKEYS.form.action.Cancel} />
          </MdButton>
          <MdButton type="outlined" onClick={() => {}}>
            <Trans key={TKEYS.dashboard.shop.visibility["publish-anyway"]} />
          </MdButton>
        </div>
      </MdDialog>

      <PublishShopDialog
        shop={props.shop}
        show={showDialog() === "publish-shop"}
        onClose={handleCloseDialog}
        onUpdate={handleUpdate}
      />

      <Show when={redirecting()}>
        <Redirect />
      </Show>
    </>
  );
}
