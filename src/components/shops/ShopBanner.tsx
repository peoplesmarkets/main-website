import { Show } from "solid-js";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import styles from "./ShopBanner.module.scss";
import _ from "lodash";

type Props = {
  shop: () => MarketBoothResponse;
};

export function ShopBanner(props: Props) {
  return (
    <Show when={!_.isEmpty(props.shop()?.imageUrl)}>
      <div class={styles.ShopBanner}>
        <img class={styles.Image} src={props.shop()!.imageUrl} alt="" />
      </div>
    </Show>
  );
}
