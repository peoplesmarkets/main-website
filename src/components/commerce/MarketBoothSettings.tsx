import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import {
  ActionButton,
  HSpace,
  Section,
  secondsToLocaleString,
} from "@peoplesmarkets/frontend-lib";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import styles from "./MarketBoothSettings.module.scss";

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
      <Section wide>
        <span class={styles.Title}>
          <Trans key={TKEYS.dashboard.Details} />
        </span>

        <HSpace />

        <span class={styles.Details}>
          <Trans key={TKEYS.dashboard["created-at"]} />:{" "}
          <strong>
            {secondsToLocaleString(props.marketBooth()?.createdAt)}
          </strong>
        </span>

        <span class={styles.Details}>
          <Trans key={TKEYS.dashboard["updated-at"]} />:{" "}
          <strong>
            {secondsToLocaleString(props.marketBooth()?.updatedAt)}
          </strong>
        </span>

        <HSpace />

        <span class={styles.Subtitle}>
          <Trans key={TKEYS.dashboard.Description} />:
        </span>

        <HSpace size="small" />

        <Show
          when={_.isEmpty(props.marketBooth()?.description)}
          fallback={<p>{props.marketBooth()?.description}</p>}
        >
          <span class={styles.Details}>
            <Trans key={TKEYS.dashboard["no-market-booth-description"]} />
          </span>
        </Show>

        <HSpace />
      </Section>

      <Section wide bordered>
        <span class={styles.Title}>
          <Trans key={TKEYS.form.action.Edit} />
        </span>

        <div class={styles.EditSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard["edit-market-booth-details"]} />
          </p>
          <ActionButton actionType="neutral" onClick={editMarketBooth}>
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>
      </Section>

      <HSpace />

      <Section wide danger>
        <span class={styles.Title}>
          <Trans key={TKEYS.dashboard["danger-zone"]} />
        </span>

        <div class={styles.DangerSection}>
          <p class={styles.Body}>
            <Trans key={TKEYS.dashboard["delete-this-market-booth"]} />
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
