import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { ShopCustomizationResponse } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { EditIcon } from "../icons";
import { EditMarketBoothImageDialog } from "./EditMarketBoothImageDialog";
import styles from "./MarketBoothImage.module.scss";

type Props = {
  shopCustomization: () => ShopCustomizationResponse | undefined;
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
        <Show when={!_.isEmpty(props.shopCustomization()?.bannerImageUrl)}>
          <img
            class={styles.Image}
            src={props.shopCustomization()?.bannerImageUrl}
            alt=""
          />
        </Show>
        <Show when={_.isEmpty(props.shopCustomization()?.bannerImageUrl)}>
          <PlaceholderImage wide />
        </Show>
        <button class={styles.EditButton} onClick={openEditDialog}>
          <EditIcon class={styles.EditIcon} />
        </button>
      </div>

      <Show when={showEditDialog() && !_.isNil(props.shopCustomization())}>
        <EditMarketBoothImageDialog
          marketBoothId={props.shopCustomization()!.shopId}
          onUpdate={props.onUpdate}
          onClose={handleCloseEditDialog}
        />
      </Show>
    </>
  );
}
