import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { ShopData } from "../../routes/shops/ShopData";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { EditIcon } from "../icons";
import styles from "./ShopImage.module.scss";
import { EditShopBannerDialog } from "./EditShopBannerDialog";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";

type Props = {
  onUpdate: () => void;
};

export function ShopImage(props: Props) {
  const { theme } = useThemeContext();
  const shopData = useRouteData<typeof ShopData>();

  const [showEditDialog, setShowEditDialog] = createSignal(false);

  function openEditDialog() {
    setShowEditDialog(true);
  }

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  function bannerImageUrl() {
    if (
      theme() === Theme.DefaultLight &&
      !_.isEmpty(shopData?.shopCustomization.data()?.bannerImageLightUrl)
    ) {
      return shopData?.shopCustomization.data()?.bannerImageLightUrl;
    }
    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(shopData?.shopCustomization.data()?.bannerImageDarkUrl)
    ) {
      return shopData?.shopCustomization.data()?.bannerImageDarkUrl;
    }
  }

  return (
    <>
      <div class={styles.ImageContainer}>
        <Show when={!_.isEmpty(bannerImageUrl())}>
          <img class={styles.Image} src={bannerImageUrl()} alt="" />
        </Show>
        <Show when={_.isEmpty(bannerImageUrl())}>
          <PlaceholderImage wide />
        </Show>
        <button class={styles.EditButton} onClick={openEditDialog}>
          <EditIcon class={styles.EditIcon} />
        </button>
      </div>

      <Show when={showEditDialog() && !_.isNil(shopData?.shop?.data())}>
        <EditShopBannerDialog
          shopId={shopData.shop.data()!.shopId}
          onUpdate={props.onUpdate}
          onClose={handleCloseEditDialog}
        />
      </Show>
    </>
  );
}
