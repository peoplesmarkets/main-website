import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../../components/content";
import { CreateMarketBoothDialog } from "../../components/dashboard";
import { ActionButton, Select } from "../../components/form";
import { Page, Section } from "../../components/layout";
import { Cover } from "../../components/layout/Cover";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useMarketBoothContext } from "../../contexts/MarketBoothContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService, StripeService } from "../../services";
import styles from "./Settings.module.scss";

export default function Settings() {
  const [trans] = useTransContext();

  const { accessToken, currentSession } = useAccessTokensContext();
  const { currentMarketBooth, setCurrentMarketBooth } = useMarketBoothContext();

  const stripeService = new StripeService(accessToken);
  const marketBoothService = new MarketBoothService(accessToken);

  const [redirecting, setRedirecting] = createSignal(false);
  const [showCreateMarketBooth, setShowCreateMarketBooth] = createSignal(false);

  const [stripeAccount] = createResource(
    () => currentMarketBooth()?.marketBoothId,
    fetchStripeAccount
  );
  const [marketBooth] = createResource(
    () => currentMarketBooth()?.marketBoothId,
    fetchMarketBooth
  );
  const [marketBooths, { refetch }] = createResource(
    () => currentSession().userId,
    fetchMarketBooths
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

  async function fetchMarketBooth(marketBoothId: string) {
    try {
      const response = await marketBoothService.get(marketBoothId);
      setCurrentMarketBooth(response.marketBooth);
      return response.marketBooth;
    } catch (err: any) {
      setCurrentMarketBooth();
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
    const first = _.first(response.marketBooths);
    if (_.isNil(currentMarketBooth()) && !_.isNil(first)) {
      setCurrentMarketBooth(first);
    }
    return response.marketBooths;
  }

  function stripeAccountState() {
    if (stripeAccount.state === "errored") {
      return "errored";
    }
    if (stripeAccount.state === "pending") {
      return "pending";
    }
    if (isResolved(stripeAccount.state) && !_.isNil(marketBooth())) {
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

  function stripeTkeys() {
    return TKEYS["user-settings-page"]["payment-integration"].stripe;
  }

  function marketBoothOptions() {
    return (
      marketBooths()?.map(({ marketBoothId, name }) => ({
        key: marketBoothId,
        name,
      })) || []
    );
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
    if (_.isNil(marketBooth())) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount(marketBooth()!.marketBoothId);
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    if (_.isNil(marketBooth())) {
      return;
    }

    setRedirecting(true);
    try {
      const { link } = await stripeService.createAccountLink(
        marketBooth()!.marketBoothId
      );
      window.location.href = link;
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  function handleMarketBoothSelected(marketBoothId: string | null) {
    const selectedMarketBooth = marketBooths()?.find(
      (m) => m.marketBoothId === marketBoothId
    );
    setCurrentMarketBooth(selectedMarketBooth);
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
          <Trans key={TKEYS["user-settings-page"]["market-booths-subtitle"]} />
        </span>

        <div class={styles.Setting}>
          <Select
            label={trans(TKEYS["market-booth"].title)}
            options={marketBoothOptions}
            onValue={handleMarketBoothSelected}
            value={currentMarketBoothOption}
            emptyLabel={trans(
              TKEYS.dashboard["market-booth"]["no-market-booth-yet"]
            )}
          />
        </div>
      </Section>

      <Section bordered>
        <span class={styles.Title}>
          <Trans
            key={TKEYS["user-settings-page"]["payment-integration"].title}
          />
        </span>

        <div class={styles.SettingRow}>
          <span class={styles.Label}>
            <Trans key={stripeTkeys().title} />
          </span>

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

      <Section bordered>
        <div class={styles.SettingRow}>
          <span class={styles.Label}>
            <Trans key={TKEYS["user-settings-page"]["add-market-booth"]} />
        </span>

            <ActionButton
            actionType="neutral"
              onClick={handleOpenCreateMarketBooth}
            >
            <Trans key={TKEYS.form.action.Add} />
            </ActionButton>
          </div>
      </Section>

      <Show when={showCreateMarketBooth()}>
        <CreateMarketBoothDialog
          onClose={handleCloseCreateMarketBooth}
          onUpdate={handleMarketBoothUpdate}
        />
      </Show>

      <Show when={redirecting()}>
        <Cover />
      </Show>
    </Page>
  );
}
