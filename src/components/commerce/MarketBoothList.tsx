import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildShopPathOrUrl } from "../../routes/shops/ShopRoutes";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Multiline } from "../content";
import styles from "./MarketBoothList.module.scss";
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
        <A
          class={styles.Row}
          href={buildShopPathOrUrl(shop?.domain, shop.slug)}
        >
          <Show when={!_.isNil(bannerImageUrl(shop))}>
            <img class={styles.Image} src={bannerImageUrl(shop)} alt="" />
          </Show>
          <div>
            <span class={styles.Label}>{shop.name}</span>
            <span class={styles.Detail}>
              <Multiline text={() => shop.description} maxRows={6} />
            </span>
          </div>
        </A>
      )}
    </For>
  );
}
