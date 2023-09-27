import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import styles from "./MarketBoothList.module.scss";
import { buildShopSettingsPath } from "../../routes/shops/ShopRoutes";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";

type Props = {
  readonly shops: () => MarketBoothResponse[];
};

export function MarketBoothList(props: Props) {
  const { theme } = useThemeContext();

  function bannerImageUrl(shop: MarketBoothResponse) {
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
