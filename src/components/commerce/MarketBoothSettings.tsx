import _ from "lodash";
import { Resource, Show, createSignal } from "solid-js";

import {
  ActionButton,
  DeleteConfirmation,
  HSpace,
  Section,
  secondsToLocaleString,
} from "@peoplesmarkets/frontend-lib";

import { MarketBoothServiceClient } from "../../../clients";
import {
  DeleteMarketBoothRequest,
  MarketBoothResponse,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import styles from "./MarketBoothSettings.module.scss";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";

type Props = {
  marketBooth: Resource<MarketBoothResponse>;
  onUpdate: () => void;
};

export default function MarketBoothSettings(props: Props) {
  const { accessToken } = useAccessTokensContext();

  const [trans] = useTransContext();

  const marketBoothService = new MarketBoothServiceClient(accessToken);

  const [showEditMarketBooth, setShowEditMarketBooth] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  function editMarketBooth() {
    setShowEditMarketBooth(true);
  }

  function handleCloseEditMarketBooth() {
    setShowEditMarketBooth(false);
  }

  function deleteMarketBooth() {
    setShowDeleteConfirmation(true);
  }

  function discardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function confirmDeleteion() {
    const request: DeleteMarketBoothRequest = {
      marketBoothId: props.marketBooth()!.marketBoothId,
    };

    await marketBoothService.client.DeleteMarketBooth(
      request,
      await marketBoothService.withAuthHeader()
    );

    props.onUpdate();
  }

  function handleUpdate() {
    handleCloseEditMarketBooth();
    props.onUpdate();
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

      <HSpace />

      <Section wide bordered>
        <span class={styles.Subtitle}>
          <Trans key={TKEYS.form.action.Edit} />
        </span>

        <div class={styles.EditSection}>
          <p>
            <Trans key={TKEYS.dashboard["edit-market-booth-details"]} />
          </p>
          <ActionButton actionType="neutral" onClick={editMarketBooth}>
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>
        </div>
      </Section>

      <HSpace size="highest" />

      <Section wide danger>
        <span class={styles.Title}>
          <Trans key={TKEYS.dashboard["danger-zone"]} />
        </span>

        <div class={styles.DangerSection}>
          <p>
            <Trans key={TKEYS.dashboard["delete-this-market-booth"]} />
          </p>
          <ActionButton actionType="danger" onClick={deleteMarketBooth}>
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </Section>

      <Show when={showEditMarketBooth() && !_.isNil(props.marketBooth())}>
        <EditMarketBoothDialog
          marketBooth={props.marketBooth()!}
          class={styles.EditMarketBooth}
          onClose={handleCloseEditMarketBooth}
          onUpdate={handleUpdate}
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
