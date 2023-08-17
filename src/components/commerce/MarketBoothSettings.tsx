import { Resource, Show, createSignal } from "solid-js";
import { MarketBoothServiceClient } from "../../../clients";
import {
  DeleteMarketBoothRequest,
  GetMarketBoothResponse,
  MarketBoothResponse,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import ActionButton from "../form/ActionButton";
import Section from "../layout/Section";
import styles from "./MarketBoothSettings.module.scss";
import DeleteConfirmation from "../form/DeleteConfirmation";
import HSpace from "../layout/HSpace";
import _ from "lodash";

type Props = {
  marketBooth: Resource<GetMarketBoothResponse>;
  onUpdate: () => void;
};

export default function MarketBoothSettings(props: Props) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothServiceClient(accessToken);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  function marketBooth() {
    return props.marketBooth()?.marketBooth;
  }

  function deleteMarketBooth() {
    setShowDeleteConfirmation(true);
  }

  function discardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function confirmDeleteion() {
    const request: DeleteMarketBoothRequest = {
      marketBoothId: marketBooth()!.marketBoothId,
    };

    await marketBoothService.client.DeleteMarketBooth(
      request,
      await marketBoothService.withAuthHeader()
    );

    props.onUpdate();
  }

  return (
    <>
      <Section wide>
        <span class={styles.Title}>Details</span>

        <HSpace />

        <span class={styles.Details}>
          Market Booth was created at{" "}
          <strong>
            {marketBooth()
              ? new Date(marketBooth()!.createdAt).toLocaleString()
              : ""}
          </strong>{" "}
          and last updated at{" "}
          <strong>
            {marketBooth()
              ? new Date(marketBooth()!.updatedAt).toLocaleString()
              : ""}
          </strong>
        </span>

        <HSpace />

        <span class={styles.Subtitle}>Description:</span>
        <HSpace size="small" />
        <Show
          when={!_.isEmpty(marketBooth()?.description)}
          fallback={
            <span class={styles.Details}>No Market Booth description ...</span>
          }
        >
          <p>{marketBooth()?.description}</p>
        </Show>
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

      <DeleteConfirmation
        item="Market Booth"
        itemName={marketBooth()?.name}
        onCancel={discardDeletion}
        onConfirmation={confirmDeleteion}
        showSignal={showDeleteConfirmation()}
      />
    </>
  );
}
