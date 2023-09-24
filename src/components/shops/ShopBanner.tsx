import _ from "lodash";
import { Show } from "solid-js";

import { ShopCustomizationResponse } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import styles from "./ShopBanner.module.scss";

type Props = {
  shopCustomization: () => ShopCustomizationResponse;
};

export function ShopBanner(props: Props) {
  return (
    <Show when={!_.isEmpty(props.shopCustomization()?.bannerImageUrl)}>
      <div class={styles.ShopBanner}>
        <img
          class={styles.Image}
          src={props.shopCustomization()!.bannerImageUrl}
          alt=""
        />
      </div>
    </Show>
  );
}
