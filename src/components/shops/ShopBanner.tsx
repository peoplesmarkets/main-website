import _ from "lodash";
import { Show } from "solid-js";

import { ShopCustomizationResponse } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import styles from "./ShopBanner.module.scss";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";

type Props = {
  shopCustomization: () => ShopCustomizationResponse | undefined;
};

export function ShopBanner(props: Props) {
  const { theme } = useThemeContext();

  function bannerImageUrl() {
    if (!props.shopCustomization()?.showBannerOnHome) {
      return;
    }

    if (
      theme() === Theme.DefaultLight &&
      !_.isEmpty(props.shopCustomization()?.bannerImageLightUrl)
    ) {
      return props.shopCustomization()?.bannerImageLightUrl;
    }
    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(props.shopCustomization()?.bannerImageDarkUrl)
    ) {
      return props.shopCustomization()?.bannerImageDarkUrl;
    }
  }

  return (
    <Show when={!_.isEmpty(bannerImageUrl())}>
      <div class={styles.ShopBanner}>
        <img class={styles.Image} src={bannerImageUrl()} alt="" />
      </div>
    </Show>
  );
}
