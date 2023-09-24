import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import styles from "./MarketBoothList.module.scss";
import { buildShopSettingsPath } from "../../routes/shops/ShopRoutes";

type Props = {
  readonly shops: () => MarketBoothResponse[];
};

export function MarketBoothList(props: Props) {
  return (
    <For each={props.shops()}>
      {(shop) => (
        <A class={styles.Row} href={buildShopSettingsPath(shop.slug)}>
          <Show when={!_.isEmpty(shop.customization?.bannerImageUrl)}>
            <img
              class={styles.Image}
              src={shop.customization!.bannerImageUrl}
              alt=""
            />
          </Show>
          <Show when={_.isEmpty(shop.customization?.bannerImageUrl)}>
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
