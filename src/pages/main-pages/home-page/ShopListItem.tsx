import _ from "lodash";
import { Show } from "solid-js";

import { Theme, useThemeContext } from "../../../contexts/ThemeContext";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import styles from "./ShopListItem.module.scss";

type Props = {
  shop: ShopResponse;
};

export function ShopListItem(props: Props) {
  const { theme } = useThemeContext();

  function bannerImageUrl() {
    let bannerImageUrl = props.shop.customization?.bannerImageLightUrl;

    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(props.shop?.customization?.bannerImageDarkUrl)
    ) {
      bannerImageUrl = props.shop.customization?.bannerImageDarkUrl;
    }

    return bannerImageUrl;
  }

  return (
    <div class={styles.ShopListItem}>
      <Show when={!_.isNil(bannerImageUrl())}>
        <img class={styles.Image} src={bannerImageUrl()} alt="" />
      </Show>
      <div>
        <span class={styles.Label}>{props.shop.name}</span>
        <span class={styles.Detail}>{props.shop.description}</span>
      </div>
    </div>
  );
}
