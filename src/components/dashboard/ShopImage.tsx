import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { resourceIsReady } from "../../lib";
import { MyShopData } from "../../pages/shop-owner-pages/MyShopData";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { EditIcon } from "../icons";
import { EditShopBannerDialog } from "./EditShopBannerDialog";
import styles from "./ShopImage.module.scss";

type Props = {
  onUpdate: () => void;
};

export function ShopImage(props: Props) {
  const { theme } = useThemeContext();

  const { shopCustomizationService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [shopCustomization] = createResource(
    shopData?.shop()?.shopId,
    async (shopId) =>
      shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const [showEditDialog, setShowEditDialog] = createSignal(false);

  function openEditDialog() {
    setShowEditDialog(true);
  }

  function handleCloseEditDialog() {
    setShowEditDialog(false);
  }

  function bannerImageUrl() {
    if (!resourceIsReady(shopCustomization)) {
      return;
    }
    const bannerImageLightUrl = shopCustomization()?.bannerImageLightUrl;
    if (!_.isEmpty(bannerImageLightUrl) && theme() === Theme.DefaultLight) {
      return bannerImageLightUrl;
    }

    const bannerImageDarkUrl = shopCustomization()?.bannerImageDarkUrl;
    if (!_.isEmpty(bannerImageDarkUrl) && theme() === Theme.DefaultDark) {
      return bannerImageDarkUrl;
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

      <Show when={showEditDialog()}>
        <EditShopBannerDialog
          onUpdate={props.onUpdate}
          onClose={handleCloseEditDialog}
        />
      </Show>
    </>
  );
}
