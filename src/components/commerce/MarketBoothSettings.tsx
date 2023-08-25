import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import styles from "./MarketBoothSettings.module.scss";
import { secondsToLocaleString } from "../../lib";
import { ActionButton } from "../form";
import { Section } from "../layout/Section";
import { Multiline } from "../content/Multiline";

type Props = {
  marketBooth: () => MarketBoothResponse | undefined;
  onUpdate?: () => Promise<void>;
};

export default function MarketBoothSettings(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [showEditMarketBooth, setShowEditMarketBooth] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  function editMarketBooth() {
    setShowEditMarketBooth(true);
  }

  function handleCloseEditMarketBooth() {
    setShowEditMarketBooth(false);
  }

  function startDeletetion() {
    setShowDeleteConfirmation(true);
  }

  function discardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function confirmDeleteion() {
    if (!_.isNil(props.marketBooth())) {
      await marketBoothService.delete(props.marketBooth()!.marketBoothId);
    }
    await props.onUpdate?.();
    setShowDeleteConfirmation(false);
  }

  return (
    <>
      <Section>
        <span class={styles.Label}>
          <Trans key={TKEYS.dashboard["market-booth"].labels.Description} />:
        </span>

        <Show
          when={!_.isEmpty(props.marketBooth()?.description)}
          fallback={
            <span class={styles.Details}>
              <Trans
                key={
                  TKEYS.dashboard["market-booth"]["no-market-booth-description"]
                }
              />
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
          <Trans key={TKEYS.dashboard["market-booth"].labels["Created-at"]} />:{" "}
          {secondsToLocaleString(props.marketBooth()?.createdAt)}
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS.dashboard["market-booth"].labels["Updated-at"]} />:{" "}
          {secondsToLocaleString(props.marketBooth()?.updatedAt)}
        </span>
      </Section>

      <Section>
        <span class={styles.Label}>
          <Trans key={TKEYS.dashboard["market-booth"].Details} />
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS.dashboard["market-booth"].labels["Created-at"]} />:{" "}
          {secondsToLocaleString(props.marketBooth()?.createdAt)}
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS.dashboard["market-booth"].labels["Updated-at"]} />:{" "}
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
          <ActionButton actionType="neutral" onClick={editMarketBooth}>
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

      <DeleteConfirmation
        item={trans(TKEYS.dashboard["market-booth"])}
        itemName={props.marketBooth()?.name}
        onCancel={discardDeletion}
        onConfirmation={confirmDeleteion}
        showSignal={showDeleteConfirmation()}
      />
    </>
  );
}
