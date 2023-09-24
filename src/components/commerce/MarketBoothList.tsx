import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildShopDetailPath } from "../../routes/shops/ShopRoutes";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Multiline } from "../content";
import styles from "./MarketBoothList.module.scss";

type Props = {
  readonly shops: () => MarketBoothResponse[];
};

export function MarketBoothList(props: Props) {
  return (
    <For each={props.shops()}>
      {(shop) => (
        <A class={styles.Row} href={buildShopDetailPath(shop.slug)}>
          <Show when={!_.isEmpty(shop?.customization?.bannerImageUrl)}>
            <img
              class={styles.Image}
              src={shop.customization!.bannerImageUrl}
              alt=""
            />
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
