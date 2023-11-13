import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Match,
  Show,
  Suspense,
  Switch,
  createResource,
  createSignal,
} from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { buildBaseUrl, resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { MyShopData } from "../../pages/shop-owner-pages/MyShopData";
import { ContentError, ContentLoading } from "../content";
import { ActionButton } from "../form";
import { ConfirmationDialog } from "../form/ConfirmationDialog";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { Message } from "../form/Message";
import { Cover } from "../layout/Cover";
import { Section } from "../layout/Section";
import { EditShopContactEmailDialog } from "../shops/settings/EditShopContactEmailDialog";
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
  | "message"
  | "edit-shop"
  | "edit-contact-email"
  | "edit-image"
  | "edit-logo"
  | "edit-theme"
  | "edit-slug"
  | "edit-domain"
  | "make-visible"
  | "make-not-visible"
  | "delete";

export function ShopSettings(props: Props) {
  const location = useLocation();

  const [trans] = useTransContext();

  const { shopService, stripeService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");
  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccountDetails] = createResource(
    shopData?.shop()?.shopId,
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

  function handleOpenDialog(dialog: DIALOG) {
    setShowDialog(dialog);
  }

  function handleCloseDialog() {
    setShowDialog("none");
  }

  async function handleVisibility(isActive: boolean) {
    const shopId = shopData.shop()?.shopId;
    if (!_.isNil(shopId) && !_.isEmpty(shopId)) {
      await shopService.update({
        shopId,
        isActive,
      });
      handleCloseDialog();
    }
  }

  async function handleConfirmDeletion() {
    const shopId = shopData.shop()?.shopId;
    if (_.isNil(shopId)) {
      setShowDialog("message");
      return;
    }

    try {
      await shopService.delete(shopId);
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.FailedPrecondition) {
        setShowDialog("message");
        return;
      }

      throw err;
    }

    props.onDelete();
    setShowDialog("none");
  }

  async function handleCreateStripeIntegration() {
    const shopId = shopData.shop()?.shopId;
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
    const shopId = shopData.shop()?.shopId;
    if (_.isNil(shopId)) {
      return;
    }

    setRedirecting(true);
    try {
      const { link } = await stripeService.createAccountLink(
        shopId,
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
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Section bordered>
          <span class={styles.Label}>
            <Trans key={TKEYS.form.action.Edit} />
          </span>

          <div class={styles.EditSection}>
            <p class={styles.Body}>
              <Trans key={TKEYS.shop.labels["Name-and-Description"]} />
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
              <Trans key={TKEYS.shop.labels["contact-email-address"]} />
            </p>
            <ActionButton
              actionType="neutral"
              onClick={() => handleOpenDialog("edit-contact-email")}
            >
              <Trans key={TKEYS.form.action.Edit} />
            </ActionButton>
          </div>

          <div class={styles.EditSection}>
            <p class={styles.Body}>
              <Trans key={TKEYS.shop.labels.Image} />
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
              <Trans key={TKEYS.shop.labels.Logo} />
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
              <Trans key={TKEYS.shop.labels.Theme} />
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
              <Trans key={TKEYS.shop.labels.Path} />
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
              <Trans key={TKEYS.shop.labels.Domain} />
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
                <Trans key={TKEYS.dashboard.shop.visibility.Title} />
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
          <span class={styles.Label}>
            <Trans key={TKEYS.form["critical-settings"]} />
          </span>

          <Show
            when={
              !_.isNil(shopData?.shop()?.isActive) && shopData.shop()?.isActive
            }
          >
            <div class={styles.EditSection}>
              <p class={styles.Body}>
                <Trans key={TKEYS.dashboard.shop.visibility.Title} />
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

        {/* DIALOGS */}
        <Show when={showDialog() === "message"}>
          <Message
            title={trans(TKEYS.form.errors.Conflict)}
            onClose={handleCloseDialog}
          >
            <Trans key={TKEYS.shop.errors["ensure-offers-deleted"]} />
          </Message>
        </Show>

        <Show when={showDialog() === "edit-shop"}>
          <EditShopDialog
            shop={() => shopData.shop()}
            class={styles.EditShop}
            onClose={handleCloseDialog}
            onUpdate={() => props.onUpdate()}
          />
        </Show>

        <Show when={showDialog() === "edit-contact-email"}>
          <EditShopContactEmailDialog
            shop={() => shopData.shop()}
            onClose={handleCloseDialog}
            onUpdate={() => props.onUpdate()}
          />
        </Show>

        <Show when={showDialog() === "edit-image"}>
          <EditShopBannerDialog
            onClose={handleCloseDialog}
            onUpdate={() => props.onUpdate()}
          />
        </Show>

        <Show when={showDialog() === "edit-logo"}>
          <EditShopLogoDialog
            onClose={handleCloseDialog}
            onUpdate={() => props.onUpdate()}
          />
        </Show>

        <Show when={showDialog() === "edit-theme"}>
          <EditShopThemeDialog
            onClose={handleCloseDialog}
            onUpdate={() => props.onUpdate()}
          />
        </Show>

        <Show when={showDialog() === "edit-slug"}>
          <EditShopSlugDialog onClose={handleCloseDialog} />
        </Show>

        <Show when={showDialog() === "edit-domain"}>
          <EditShopDomainDialog onClose={handleCloseDialog} />
        </Show>

        <Show when={showDialog() === "make-visible"}>
          <ConfirmationDialog
            actionType="active"
            title={trans(
              TKEYS.dashboard.shop.visibility["publish-notification-title"]
            )}
            message={trans(
              TKEYS.dashboard.shop.visibility[
                "publish-notification-message-left"
              ]
            )}
            onCancel={handleCloseDialog}
            onOk={() => handleVisibility(true)}
          />
        </Show>

        <Show when={showDialog() === "make-not-visible"}>
          <ConfirmationDialog
            actionType="danger"
            title={trans(
              TKEYS.dashboard.shop.visibility["unpublish-notification-title"]
            )}
            message={trans(
              TKEYS.dashboard.shop.visibility["unpublish-notification-message"]
            )}
            onCancel={handleCloseDialog}
            onOk={() => handleVisibility(false)}
          />
        </Show>

        <Show when={showDialog() === "delete"}>
          <DeleteConfirmation
            item={trans(TKEYS.shop.title)}
            itemName={shopData.shop()?.name}
            onCancel={handleCloseDialog}
            onConfirmation={handleConfirmDeletion}
          />
        </Show>

        <Show when={redirecting()}>
          <Cover pageLoad />
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
