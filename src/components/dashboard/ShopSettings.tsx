import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildBaseUrl } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import { ShopService, StripeService } from "../../services";
import { ContentError, ContentLoading, isResolved } from "../content";
import { ActionButton } from "../form";
import { ConfirmationDialog } from "../form/ConfirmationDialog";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { Message } from "../form/Message";
import { Cover } from "../layout/Cover";
import { Section } from "../layout/Section";
import { EditShopBannerDialog } from "./EditShopBannerDialog";
import { EditShopDialog } from "./EditShopDialog";
import { EditShopDomainDialog } from "./EditShopDomainDialog";
import { EditShopLogoDialog } from "./EditShopLogoDialog";
import { EditShopSlugDialog } from "./EditShopSlugDialog";
import { EditShopThemeDialog } from "./EditShopThemeDialog";
import styles from "./ShopSettings.module.scss";

type Props = {
  onUpdate: () => Promise<void>;
  onDelete: () => void;
};

type DIALOG =
  | "none"
  | "delete"
  | "message"
  | "edit-shop"
  | "make-visible"
  | "make-not-visible"
  | "edit-image"
  | "edit-logo"
  | "edit-theme"
  | "edit-slug"
  | "edit-domain";

export function ShopSettings(props: Props) {
  const location = useLocation();

  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const shopService = new ShopService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");
  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccountDetails] = createResource(
    () => shopData?.shop()?.shopId,
    fetchStripeAccountDetails
  );

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

  function stripeTkeys() {
    return TKEYS.dashboard.shop.stripe;
  }

  function stripeAccountState() {
    if (stripeAccountDetails.state === "errored") {
      return "errored";
    }
    if (stripeAccountDetails.state === "pending") {
      return "pending";
    }
    if (isResolved(stripeAccountDetails.state) && !_.isNil(shopData.shop())) {
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

  function handleOpenDialog(dialog: DIALOG) {
    setShowDialog(dialog);
  }

  function handleCloseDialog() {
    setShowDialog("none");
    shopData.refetch();
  }

  async function handleVisibility(isActive: boolean) {
    const shopId = shopData?.shop()?.shopId;
    if (!_.isNil(shopId) && !_.isEmpty(shopId)) {
      try {
        await shopService.update({
          shopId,
          isActive,
        });
        props.onUpdate();
        setShowDialog("none");
      } catch (err: any) {
        setShowDialog("message");
      }
    }
  }

  async function handleConfirmDeletion() {
    if (!_.isNil(shopData?.shop())) {
      try {
        await shopService.delete(shopData?.shop()!.shopId);
      } catch (err: any) {
        if (err.code && err.code === grpc.Code.FailedPrecondition) {
          setShowDialog("message");
          return;
        } else {
          throw err;
        }
      }
    }
    props.onDelete();
    setShowDialog("none");
  }

  async function handleCreateStripeIntegration() {
    if (_.isNil(shopData?.shop())) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount(shopData?.shop()!.shopId);
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    if (_.isNil(shopData?.shop())) {
      return;
    }

    setRedirecting(true);
    try {
      const { link } = await stripeService.createAccountLink(
        shopData?.shop()!.shopId,
        buildBaseUrl(location.pathname)
      );
      setRedirecting(false);
      window.location.href = link;
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  return (
    <>
      <Section bordered>
        <span class={styles.Title}>
          <Trans key={TKEYS.form.action.Edit} />
        </span>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-name-and-description"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-shop")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={stripeTkeys().integration} />
          </p>
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
              <ContentLoading />
            </Match>
            <Match when={stripeAccountState() === "missing"}>
              <ActionButton
                actionType="active-filled"
                onClick={handleCreateStripeIntegration}
              >
                <Trans key={stripeTkeys()["start-integration"]} />
              </ActionButton>
            </Match>
            <Match when={stripeAccountState() === "in-progress"}>
              <ActionButton
                actionType="active-filled"
                onClick={handleContinueStripeIntegration}
              >
                <Trans key={stripeTkeys()["continue-integration"]} />
              </ActionButton>
            </Match>
            <Match when={stripeAccountState() === "configured"}>
              <span class={styles.Ok}>
                <Trans key={TKEYS.form.action.OK} />
              </span>
            </Match>
          </Switch>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-image"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-image")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-logo"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-logo")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-theme"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-theme")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-path"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-slug")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["edit-domain"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-domain")}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <Show
          when={
            !_.isNil(shopData?.shop()?.isActive) && !shopData.shop()?.isActive
          }
        >
          <div class={styles.EditSection}>
            <p class={styles.Body}>
              <Trans key={TKEYS.dashboard.shop["public-visibility"]} />
            </p>
            <ActionButton
              actionType="active"
              onClick={() => handleOpenDialog("make-visible")}
            >
              <Trans key={TKEYS.form.action.Publish} />
            </ActionButton>
          </div>
        </Show>
      </Section>

      <Section danger>
        <span class={styles.Title}>
          <Trans key={TKEYS.form["danger-zone"]} />
        </span>

        <Show
          when={
            !_.isNil(shopData?.shop()?.isActive) && shopData.shop()?.isActive
          }
        >
          <div class={styles.EditSection}>
            <p class={styles.Body}>
              <Trans key={TKEYS.dashboard.shop["public-visibility"]} />
            </p>
            <ActionButton
              actionType="danger"
              onClick={() => handleOpenDialog("make-not-visible")}
            >
              <Trans key={TKEYS.form.action.Hide} />
            </ActionButton>
          </div>
        </Show>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard.shop["delete-this-shop"]} />
          </p>
          <ActionButton
            actionType="danger"
            onClick={() => handleOpenDialog("delete")}
          >
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </Section>

      <Show when={showDialog() === "edit-shop" && !_.isNil(shopData?.shop())}>
        <EditShopDialog
          shop={() => shopData?.shop()!}
          class={styles.EditShop}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show
        when={showDialog() === "make-visible" && !_.isNil(shopData?.shop())}
      >
        <ConfirmationDialog
          actionType="active"
          title={trans(TKEYS.dashboard.shop["publish-notification-title"])}
          message={trans(TKEYS.dashboard.shop["publish-notification-message"])}
          onCancel={handleCloseDialog}
          onOk={() => handleVisibility(true)}
        />
      </Show>
      <Show
        when={showDialog() === "make-not-visible" && !_.isNil(shopData?.shop())}
      >
        <ConfirmationDialog
          actionType="danger"
          title={trans(TKEYS.dashboard.shop["unpublish-notification-title"])}
          message={trans(
            TKEYS.dashboard.shop["unpublish-notification-message"]
          )}
          onCancel={handleCloseDialog}
          onOk={() => handleVisibility(false)}
        />
      </Show>
      <Show when={showDialog() === "delete"}>
        <DeleteConfirmation
          item={trans(TKEYS.shop.title)}
          itemName={shopData?.shop()?.name}
          onCancel={handleCloseDialog}
          onConfirmation={handleConfirmDeletion}
        />
      </Show>
      <Show when={showDialog() === "message"}>
        <Message
          title={trans(TKEYS.form.errors.Conflict)}
          onClose={handleCloseDialog}
        >
          <Trans key={TKEYS.shop.errors["ensure-offers-deleted"]} />
        </Message>
      </Show>
      <Show when={showDialog() === "edit-image" && !_.isNil(shopData?.shop())}>
        <EditShopBannerDialog
          shopId={shopData?.shop()!.shopId}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show when={showDialog() === "edit-logo" && !_.isNil(shopData?.shop())}>
        <EditShopLogoDialog
          shopId={shopData?.shop()!.shopId}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show when={showDialog() === "edit-theme" && !_.isNil(shopData?.shop())}>
        <EditShopThemeDialog
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show when={showDialog() === "edit-slug" && !_.isNil(shopData?.shop())}>
        <EditShopSlugDialog onClose={handleCloseDialog} />
      </Show>
      <Show when={showDialog() === "edit-domain" && !_.isNil(shopData?.shop())}>
        <EditShopDomainDialog onClose={handleCloseDialog} />
      </Show>
      <Show when={redirecting()}>
        <Cover pageLoad />
      </Show>
    </>
  );
}
