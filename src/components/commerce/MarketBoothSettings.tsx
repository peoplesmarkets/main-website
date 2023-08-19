import _ from "lodash";
import { Resource, Show, createSignal } from "solid-js";

import {
  ActionButton,
  DeleteConfirmation,
  HSpace,
  Section,
} from "@peoplesmarkets/frontend-lib/components";
import { secondsToLocaleString } from "@peoplesmarkets/frontend-lib/lib";

import { MarketBoothServiceClient } from "../../../clients";
import {
  DeleteMarketBoothRequest,
  MarketBoothResponse,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import styles from "./MarketBoothSettings.module.scss";

type Props = {
  marketBooth: Resource<MarketBoothResponse>;
  onUpdate: () => void;
};

export default function MarketBoothSettings(props: Props) {
  const { accessToken } = useAccessTokensContext();

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
        <span class={styles.Title}>Details</span>

        <HSpace />

        <span class={styles.Details}>
          created at:{" "}
          <strong>
            {secondsToLocaleString(props.marketBooth()?.createdAt)}
          </strong>
        </span>

        <span class={styles.Details}>
          updated at:{" "}
          <strong>
            {secondsToLocaleString(props.marketBooth()?.updatedAt)}
          </strong>
        </span>

        <HSpace />

        <span class={styles.Subtitle}>Description:</span>

        <HSpace size="small" />

        <Show
          when={_.isEmpty(props.marketBooth()?.description)}
          fallback={<p>{props.marketBooth()?.description}</p>}
        >
          <span class={styles.Details}>No Market Booth description ...</span>
        </Show>

        <HSpace />
      </Section>

      <HSpace />

      <Section wide bordered>
        <span class={styles.Subtitle}>Edit</span>

        <div class={styles.EditSection}>
          <p>Edit Market Booth Details</p>
          <ActionButton actionType="neutral" onClick={editMarketBooth}>
            Edit
          </ActionButton>
        </div>
      </Section>

      <HSpace size="highest" />

      <Section wide danger>
        <span class={styles.Title}>Danger Zone</span>

        <div class={styles.DangerSection}>
          <p>Delete this Market Booth</p>
          <ActionButton actionType="danger" onClick={deleteMarketBooth}>
            Delete
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
        item="Market Booth"
        itemName={props.marketBooth()?.name}
        onCancel={discardDeletion}
        onConfirmation={confirmDeleteion}
        showSignal={showDeleteConfirmation()}
      />
    </>
  );
}
