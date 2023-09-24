import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { ShopCustomizationResponse } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { EditIcon } from "../icons";
import { EditMarketBoothImageDialog } from "./EditMarketBoothImageDialog";
import styles from "./MarketBoothImage.module.scss";
import { useRouteData } from "@solidjs/router";
import { ShopData } from "../../routes/shops/ShopData";

type Props = {
  onUpdate: () => void;
};

export function MarketBoothImage(props: Props) {
  const shopData = useRouteData<typeof ShopData>();

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
        <Show
          when={!_.isEmpty(shopData.shopCustomization.data()?.bannerImageUrl)}
        >
          <img
            class={styles.Image}
            src={shopData.shopCustomization.data()?.bannerImageUrl}
            alt=""
          />
        </Show>
        <Show
          when={_.isEmpty(shopData.shopCustomization.data()?.bannerImageUrl)}
        >
          <PlaceholderImage wide />
        </Show>
        <button class={styles.EditButton} onClick={openEditDialog}>
          <EditIcon class={styles.EditIcon} />
        </button>
      </div>

      <Show when={showEditDialog() && !_.isNil(shopData.shop.data())}>
        <EditMarketBoothImageDialog
          marketBoothId={shopData.shop.data()!.marketBoothId}
          onUpdate={props.onUpdate}
          onClose={handleCloseEditDialog}
        />
      </Show>
    </>
  );
}
