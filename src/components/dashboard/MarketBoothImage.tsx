import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { EditIcon } from "../icons";
import { EditMarketBoothImageDialog } from "./EditMarketBoothImageDialog";
import styles from "./MarketBoothImage.module.scss";
import { PlaceholderImage } from "../assets/PlaceholderImage";

type Props = {
  marketBooth: () => MarketBoothResponse | undefined;
  onUpdate: () => void;
};

export function MarketBoothImage(props: Props) {
  const [showEditDialog, setShowEditDialog] = createSignal(false);

  function openEditDialog() {
    setShowEditDialog(true);
  }

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  return (
    <>
      <div class={styles.ImageContainer}>
        <Show when={props.marketBooth()?.imageUrl}>
          <img
            class={styles.Image}
            src={props.marketBooth()?.imageUrl}
            alt=""
          />
        </Show>
        <Show when={_.isEmpty(props.marketBooth()?.imageUrl)}>
          <PlaceholderImage wide />
        </Show>
        <button class={styles.EditButton} onClick={openEditDialog}>
          <EditIcon class={styles.EditIcon} />
        </button>
      </div>

      <Show when={showEditDialog() && !_.isNil(props.marketBooth())}>
        <EditMarketBoothImageDialog
          marketBoothId={props.marketBooth()!.marketBoothId}
          onUpdate={props.onUpdate}
          onClose={handleCloseEditDialog}
        />
      </Show>
    </>
  );
}
