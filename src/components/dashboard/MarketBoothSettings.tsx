import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildUrl, secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService, StripeService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { ContentError, ContentLoading, isResolved } from "../content";
import { Multiline } from "../content/Multiline";
import { ActionButton } from "../form";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { Message } from "../form/Message";
import { Cover } from "../layout/Cover";
import { Section } from "../layout/Section";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import { EditMarketBoothImageDialog } from "./EditMarketBoothImageDialog";
import styles from "./MarketBoothSettings.module.scss";

type Props = {
  marketBooth: () => MarketBoothResponse | undefined;
  onUpdate?: () => Promise<void>;
  onDelete?: () => void;
};

type DIALOG = "none" | "delete" | "message" | "add-image";

export function MarketBoothSettings(props: Props) {
  const location = useLocation();
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [showEditMarketBooth, setShowEditMarketBooth] = createSignal(false);
  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");
  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccount] = createResource(
    () => props.marketBooth()?.marketBoothId,
    fetchStripeAccount
  );

  async function fetchStripeAccount(marketBoothId: string) {
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
    if (stripeAccount.state === "errored") {
      return "errored";
    }
    if (stripeAccount.state === "pending") {
      return "pending";
    }
    if (isResolved(stripeAccount.state) && !_.isNil(props.marketBooth())) {
      if (_.isNil(stripeAccount())) {
        return "missing";
      } else if (
        !stripeAccount()?.details?.chargesEnabled ||
        !stripeAccount()?.details?.detailsSubmitted
      ) {
        return "in-progress";
      } else {
        return "configured";
      }
    }
  }

  function handleEditMarketBooth() {
    setShowEditMarketBooth(true);
  }

  function handleCloseEditMarketBooth() {
    setShowEditMarketBooth(false);
  }

  function startDeletetion() {
    setShowDialog("delete");
  }

  function discardDeletion() {
    setShowDialog("none");
  }

  function handleCloseMessage() {
    setShowDialog("none");
  }

  function openAddImageDialog() {
    setShowDialog("add-image");
  }

  function handleCloseAddImage() {
    setShowDialog("none");
  }

  async function confirmDeleteion() {
    if (!_.isNil(props.marketBooth())) {
      try {
        await marketBoothService.delete(props.marketBooth()!.marketBoothId);
      } catch (err: any) {
        if (err.code && err.code === grpc.Code.FailedPrecondition) {
          setShowDialog("message");
          return;
        } else {
          throw err;
        }
      }
    }
    props.onDelete?.();
    setShowDialog("none");
  }

  async function handleCreateStripeIntegration() {
    if (_.isNil(props.marketBooth())) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount(props.marketBooth()!.marketBoothId);
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    if (_.isNil(props.marketBooth())) {
      return;
    }

    setRedirecting(true);
    try {
      const { link } = await stripeService.createAccountLink(
        props.marketBooth()!.marketBoothId,
        buildUrl(location.pathname)
      );
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
          when={!_.isEmpty(props.marketBooth()?.description)}
          fallback={
            <span class={styles.Details}>
              <Trans key={TKEYS["market-booth"]["no-description"]} />
            </span>
          }
        >
          <Multiline text={() => props.marketBooth()?.description} />
        </Show>
      </Section>

      <Section>
        <span class={styles.Label}>
          <Trans key={TKEYS.dashboard["market-booth"].Details} />
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS["market-booth"].labels["Created-at"]} />:{" "}
          {secondsToLocaleString(props.marketBooth()?.createdAt)}
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS["market-booth"].labels["Updated-at"]} />:{" "}
          {secondsToLocaleString(props.marketBooth()?.updatedAt)}
        </span>
      </Section>

      <Section bordered>
        <span class={styles.Title}>
          <Trans key={TKEYS.form.action.Edit} />
        </span>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans
              key={TKEYS.dashboard["market-booth"]["edit-market-booth-details"]}
            />
          </p>
          <ActionButton actionType="neutral" onClick={handleEditMarketBooth}>
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans
              key={TKEYS.dashboard["market-booth"]["add-or-update-image"]}
            />
          </p>
          <ActionButton actionType="neutral" onClick={openAddImageDialog}>
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
          <ActionButton actionType="danger" onClick={startDeletetion}>
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </Section>

      <Show when={showEditMarketBooth() && !_.isNil(props.marketBooth())}>
        <EditMarketBoothDialog
          marketBooth={props.marketBooth()!}
          class={styles.EditMarketBooth}
          onClose={handleCloseEditMarketBooth}
          onUpdate={() => props.onUpdate?.()}
        />
      </Show>
      <Show when={showDialog() === "delete"}>
        <DeleteConfirmation
          item={trans(TKEYS["market-booth"].title)}
          itemName={props.marketBooth()?.name}
          onCancel={discardDeletion}
          onConfirmation={confirmDeleteion}
        />
      </Show>
      <Show when={showDialog() === "message"}>
        <Message
          title={trans(TKEYS.form.errors.Conflict)}
          onClose={handleCloseMessage}
        >
          <Trans key={TKEYS["market-booth"].errors["ensure-offers-deleted"]} />
        </Message>
      </Show>
      <Show
        when={showDialog() === "add-image" && !_.isNil(props.marketBooth())}
      >
        <EditMarketBoothImageDialog
          marketBoothId={props.marketBooth()!.marketBoothId}
          onClose={handleCloseAddImage}
          onUpdate={() => props.onUpdate?.()}
        />
      </Show>
      <Show when={redirecting()}>
        <Cover />
      </Show>
    </>
  );
}
