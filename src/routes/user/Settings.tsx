import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { DASHBOARD_PATH } from "../../App";
import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../../components/content";
import { CreateMarketBoothDialog } from "../../components/dashboard";
import { ActionButton, Select } from "../../components/form";
import { Page, Section } from "../../components/layout";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useMarketBoothContext } from "../../contexts/MarketBoothContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService, StripeService } from "../../services";
import styles from "./Settings.module.scss";

export default function Settings() {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { accessToken, currentSession, refreshToken } =
    useAccessTokensContext();
  const { currentMarketBooth, setCurrentMarketBooth } = useMarketBoothContext();

  const stripeService = new StripeService(accessToken);
  const marketBoothService = new MarketBoothService(accessToken);

  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  const [stripeAccount] = createResource(
    () => currentSession()?.userId,
    fetchStripeAccount
  );
  const [marketBooths, { refetch }] = createResource(
    () => currentSession().userId,
    fetchMarketBooths
  );

  async function fetchStripeAccount() {
    try {
      const response = await stripeService.getAccount();
      return response;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        return;
      }

      throw err;
    }
  }

  async function fetchMarketBooths(userId: string) {
    const response = await marketBoothService.listDefault({
      userId,
      pagination: {
        page: 1,
        size: 100,
      },
    });
    return response.marketBooths;
  }

  function stripeAccountState() {
    if (_.isNil(stripeAccount())) {
      return "missing";
    } else if (
      !stripeAccount()?.chargesEnabled ||
      !stripeAccount()?.detailsSubmitted
    ) {
      return "in-progress";
    } else {
      return "configured";
    }
  }

  function stripeTkeys() {
    return TKEYS["user-settings-page"]["payment-integration"].stripe;
  }

  function marketBoothOptions() {
    if (_.isEmpty(marketBooths())) {
      return [
        {
          key: "",
          name: trans(TKEYS.dashboard["market-booth"]["no-market-booth-yet"]),
        },
      ];
    } else {
      return marketBooths()!.map(({ marketBoothId, name }) => ({
        key: marketBoothId,
        name,
      }));
    }
  }

  function currentMarketBoothOption() {
    return (
      currentMarketBooth() && {
        key: currentMarketBooth()!.marketBoothId,
        name: currentMarketBooth()!.name,
      }
    );
  }

  async function handleCreateStripeIntegration() {
    await stripeService.createAccount();
    await refreshToken();
    handleContinueStripeIntegration();
  }

  async function handleContinueStripeIntegration() {
    const { link } = await stripeService.createAccountLink();
    window.location.href = link;
  }

  function handleMarketBoothSelected(marketBoothId: string | null) {
    const selectedMarketBooth = marketBooths()?.find(
      (m) => m.marketBoothId === marketBoothId
    );
    setCurrentMarketBooth(selectedMarketBooth);
    if (!_.isNil(selectedMarketBooth)) {
      navigate(DASHBOARD_PATH);
    }
  }

  function handleOpenCreateMarketBooth() {
    setShowCreateMarketBooth(true);
  }

  function handleCloseCreateMarketBooth() {
    setShowCreateMarketBooth(false);
  }

  async function handleMarketBoothUpdate() {
    refetch();
  }

  return (
    <Page>
      <span class={styles.Headline}>
        <Trans key={TKEYS["user-settings-page"].title} />
      </span>

      <Section bordered>
        <span class={styles.Title}>
          <Trans
            key={TKEYS["user-settings-page"]["payment-integration"].title}
          />
        </span>

        <div class={styles.Setting}>
          <span class={styles.Label}>
            <Trans key={stripeTkeys().title} />
          </span>

          <Show when={stripeAccount.state === "errored"}>
            <ContentError />
          </Show>
          <Show when={stripeAccount.state === "pending"}>
            <ContentLoading />
          </Show>
          <Show when={isResolved(stripeAccount.state)}>
            <Show when={stripeAccountState() === "missing"}>
              <ActionButton
                actionType="active-filled"
                onClick={handleCreateStripeIntegration}
              >
                <Trans key={stripeTkeys()["start-integration"]} />
              </ActionButton>
            </Show>
            <Show when={stripeAccountState() === "in-progress"}>
              <ActionButton
                actionType="active-filled"
                onClick={handleContinueStripeIntegration}
              >
                <Trans key={stripeTkeys()["continue-integration"]} />
              </ActionButton>
            </Show>
            <Show when={stripeAccountState() === "configured"}>
              <span class={styles.Ok}>
                <Trans key={TKEYS.form.action.OK} />
              </span>
            </Show>
          </Show>
        </div>
      </Section>

      <Section bordered>
        <span class={styles.Title}>
          <Trans key={TKEYS["user-settings-page"]["market-booths-subtitle"]} />
        </span>

        <div class={styles.Setting}>
          <Select
            class={styles.Select}
            label={trans(
              TKEYS.dashboard["market-booth"]["current-market-booth"]
            )}
            options={marketBoothOptions}
            onValue={handleMarketBoothSelected}
            nullable
            initial={currentMarketBoothOption()}
          />
        </div>

        <div class={styles.ActionButtons}>
          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateMarketBooth}
          >
            <Trans
              key={TKEYS.dashboard["market-booth"]["create-new-market-booth"]}
            />
          </ActionButton>
        </div>
      </Section>

      <Show when={showCreateMarketBooth()}>
        <CreateMarketBoothDialog
          onClose={handleCloseCreateMarketBooth}
          onUpdate={handleMarketBoothUpdate}
        />
      </Show>
    </Page>
  );
}
