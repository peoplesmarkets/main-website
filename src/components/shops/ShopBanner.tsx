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

    const bannerImageLightUrl = props.shopCustomization()?.bannerImageLightUrl;
    if (!_.isEmpty(bannerImageLightUrl) && theme() === Theme.DefaultLight) {
      return bannerImageLightUrl;
    }

    const bannerImageDarkUrl = props.shopCustomization()?.bannerImageDarkUrl;
    if (!_.isEmpty(bannerImageDarkUrl) && theme() === Theme.DefaultDark) {
      return bannerImageDarkUrl;
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
