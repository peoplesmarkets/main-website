import { A } from "@solidjs/router";
import { For } from "solid-js";

import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import { buildShopDetailPathOrUrl } from "../shop-routing";
import styles from "./ShopList.module.scss";
import { ShopListItem } from "./ShopListItem";

type Props = {
  readonly shops: ShopResponse[] | undefined;
};

export function ShopList(props: Props) {
  return (
    <For each={props.shops}>
      {(shop) => (
        <A
          class={styles.Row}
          href={buildShopDetailPathOrUrl(shop?.domain, shop.slug)}
          target="_blank"
        >
          <ShopListItem shop={shop} />
        </A>
      )}
    </For>
  );
}
