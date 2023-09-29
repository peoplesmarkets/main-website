import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import styles from "./ShopList.module.scss";
import { buildShopSettingsPath } from "../../routes/shops/ShopRoutes";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";

type Props = {
  readonly shops: () => ShopResponse[];
};

export function ShopList(props: Props) {
  const { theme } = useThemeContext();

  function bannerImageUrl(shop: ShopResponse) {
    if (
      theme() === Theme.DefaultLight &&
      !_.isEmpty(shop?.customization?.bannerImageLightUrl)
    ) {
      return shop.customization?.bannerImageLightUrl;
    }
    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(shop?.customization?.bannerImageDarkUrl)
    ) {
      return shop.customization?.bannerImageDarkUrl;
    }
  }

  return (
    <For each={props.shops()}>
      {(shop) => (
        <A class={styles.Row} href={buildShopSettingsPath(shop.slug)}>
          <Show when={!_.isEmpty(bannerImageUrl(shop))}>
            <img class={styles.Image} src={bannerImageUrl(shop)} alt="" />
          </Show>
          <Show when={_.isEmpty(bannerImageUrl(shop))}>
            <PlaceholderImage wide />
          </Show>
          <div>
            <span class={styles.Label}>{shop.name}</span>
          </div>
        </A>
      )}
    </For>
  );
}
