import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildShopPathOrUrl } from "../../routes/shops/shop-routing";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { Multiline } from "../content";
import styles from "./ShopList.module.scss";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";

type Props = {
  readonly shops: () => ShopResponse[] | undefined;
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
