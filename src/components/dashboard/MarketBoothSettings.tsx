import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Multiline } from "../content/Multiline";
import { ActionButton } from "../form";
import { DeleteConfirmation } from "../form/DeleteConfirmation";
import { Message } from "../form/Message";
import { Section } from "../layout/Section";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import styles from "./MarketBoothSettings.module.scss";
import { EditImageDialog } from "./EditImageDialog";

type Props = {
  marketBooth: () => MarketBoothResponse | undefined;
  onUpdate?: () => Promise<void>;
  onDelete?: () => void;
};

type DIALOG = "none" | "delete" | "message" | "add-image";

export function MarketBoothSettings(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [showEditMarketBooth, setShowEditMarketBooth] = createSignal(false);
  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");

  function editMarketBooth() {
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
          <ActionButton actionType="neutral" onClick={editMarketBooth}>
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
        <EditImageDialog
          marketBoothId={props.marketBooth()!.marketBoothId}
          onClose={handleCloseAddImage}
          onUpdate={() => props.onUpdate?.()}
        />
      </Show>
    </>
  );
}
