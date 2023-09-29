import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildBaseUrl, secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { ShopData } from "../../routes/shops/ShopData";
import { MarketBoothService, StripeService } from "../../services";
import { ContentError, ContentLoading, isResolved } from "../content";
import { Multiline } from "../content/Multiline";
import { ActionButton } from "../form";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { Message } from "../form/Message";
import { Cover } from "../layout/Cover";
import { Section } from "../layout/Section";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import { EditShopBannerDialog } from "./EditShopBannerDialog";
import { EditShopDomainDialog } from "./EditShopDomainDialog";
import { EditShopLogoDialog } from "./EditShopLogoDialog";
import { EditShopSlugDialog } from "./EditShopSlugDialog";
import { EditShopThemeDialog } from "./EditShopThemeDialog";
import styles from "./MarketBoothSettings.module.scss";
import { buildMediasSettingsPath } from "../../routes/shops/ShopRoutes";

type Props = {
  onUpdate: () => Promise<void>;
  onDelete: () => void;
};

type DIALOG =
  | "none"
  | "delete"
  | "message"
  | "edit-shop"
  | "edit-image"
  | "edit-logo"
  | "edit-theme"
  | "edit-slug"
  | "edit-domain";

export function MarketBoothSettings(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const marketBoothService = new MarketBoothService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");
  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccountDetails] = createResource(
    () => shopData?.shop?.data()?.marketBoothId,
    fetchStripeAccountDetails
  );

  async function fetchStripeAccountDetails(marketBoothId: string) {
    try {
      const response = await stripeService.getAccountDetails(marketBoothId);
      return response;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        return;
      }

      throw err;
    }
  }

  function stripeTkeys() {
    return TKEYS.dashboard["market-booth"].stripe;
  }

  function stripeAccountState() {
    if (stripeAccountDetails.state === "errored") {
      return "errored";
    }
    if (stripeAccountDetails.state === "pending") {
      return "pending";
    }
    if (
      isResolved(stripeAccountDetails.state) &&
      !_.isNil(shopData.shop.data())
    ) {
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

  function handleEditMedias() {
    const slug = shopData?.shop?.data()?.slug;
    if (!_.isNil(slug)) {
      navigate(buildMediasSettingsPath(slug));
    }
  }

  async function confirmDeleteion() {
    if (!_.isNil(shopData?.shop?.data())) {
      try {
        await marketBoothService.delete(shopData?.shop?.data()!.marketBoothId);
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
    if (_.isNil(shopData?.shop?.data())) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount(shopData?.shop?.data()!.marketBoothId);
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    if (_.isNil(shopData?.shop?.data())) {
      return;
    }

    setRedirecting(true);
    try {
      const { link } = await stripeService.createAccountLink(
        shopData?.shop?.data()!.marketBoothId,
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
      <Section>
        <span class={styles.Label}>
          <Trans key={TKEYS["market-booth"].labels.Description} />:
        </span>

        <Show
          when={!_.isEmpty(shopData?.shop?.data()?.description)}
          fallback={
            <span class={styles.Details}>
              <Trans key={TKEYS["market-booth"]["no-description"]} />
            </span>
          }
        >
          <Multiline text={() => shopData?.shop?.data()?.description} />
        </Show>
      </Section>

      <Section>
        <span class={styles.Label}>
          <Trans key={TKEYS.dashboard["market-booth"].Details} />:
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS["market-booth"].labels["Created-at"]} />:{" "}
          {secondsToLocaleString(shopData?.shop?.data()?.createdAt)}
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS["market-booth"].labels["Updated-at"]} />:{" "}
          {secondsToLocaleString(shopData?.shop?.data()?.updatedAt)}
        </span>
      </Section>

      <Section bordered>
        <span class={styles.Title}>
          <Trans key={TKEYS.form.action.Edit} />
        </span>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans
              key={TKEYS.dashboard["market-booth"]["edit-name-and-description"]}
            />
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
            <Trans key={TKEYS.dashboard["market-booth"]["edit-image"]} />
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
            <Trans key={TKEYS.dashboard["market-booth"]["edit-logo"]} />
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
            <Trans key={TKEYS.dashboard["market-booth"]["edit-theme"]} />
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
            <Trans key={TKEYS.dashboard["market-booth"]["edit-path"]} />
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
            <Trans key={TKEYS.dashboard["market-booth"]["edit-domain"]} />
          </p>
          <ActionButton
            actionType="neutral"
            onClick={() => handleOpenDialog("edit-domain")}
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
                <Trans
                  key={TKEYS.dashboard["market-booth"]["no-market-booth-yet"]}
                />
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
            <Trans key={TKEYS.media["Title-plural"]} />
          </p>
          <ActionButton actionType="neutral" onClick={handleEditMedias}>
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>
      </Section>

      <Section danger>
        <span class={styles.Title}>
          <Trans key={TKEYS.form["danger-zone"]} />
        </span>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans
              key={TKEYS.dashboard["market-booth"]["delete-this-market-booth"]}
            />
          </p>
          <ActionButton
            actionType="danger"
            onClick={() => handleOpenDialog("delete")}
          >
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </Section>

      <Show
        when={showDialog() === "edit-shop" && !_.isNil(shopData?.shop?.data())}
      >
        <EditMarketBoothDialog
          marketBooth={() => shopData?.shop?.data()!}
          class={styles.EditMarketBooth}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show when={showDialog() === "delete"}>
        <DeleteConfirmation
          item={trans(TKEYS["market-booth"].title)}
          itemName={shopData?.shop?.data()?.name}
          onCancel={handleCloseDialog}
          onConfirmation={confirmDeleteion}
        />
      </Show>
      <Show when={showDialog() === "message"}>
        <Message
          title={trans(TKEYS.form.errors.Conflict)}
          onClose={handleCloseDialog}
        >
          <Trans key={TKEYS["market-booth"].errors["ensure-offers-deleted"]} />
        </Message>
      </Show>
      <Show
        when={showDialog() === "edit-image" && !_.isNil(shopData?.shop?.data())}
      >
        <EditShopBannerDialog
          shopId={shopData?.shop?.data()!.marketBoothId}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show
        when={showDialog() === "edit-logo" && !_.isNil(shopData?.shop?.data())}
      >
        <EditShopLogoDialog
          shopId={shopData?.shop?.data()!.marketBoothId}
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show
        when={showDialog() === "edit-theme" && !_.isNil(shopData?.shop?.data())}
      >
        <EditShopThemeDialog
          onClose={handleCloseDialog}
          onUpdate={() => props.onUpdate()}
        />
      </Show>
      <Show
        when={showDialog() === "edit-slug" && !_.isNil(shopData?.shop?.data())}
      >
        <EditShopSlugDialog onClose={handleCloseDialog} />
      </Show>
      <Show
        when={
          showDialog() === "edit-domain" && !_.isNil(shopData?.shop?.data())
        }
      >
        <EditShopDomainDialog onClose={handleCloseDialog} />
      </Show>
      <Show when={redirecting()}>
        <Cover pageLoad />
      </Show>
    </>
  );
}
