import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";

import { buildDashboardMarketBoothPath } from "../../routes/dashboard/DashboardRoutes";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import styles from "./MarketBoothList.module.scss";

type Props = {
  readonly marketBooths: () => MarketBoothResponse[];
};

export function MarketBoothList(props: Props) {
  return (
    <For each={props.marketBooths()}>
      {(marketBooth) => (
        <A
          class={styles.Row}
          href={buildDashboardMarketBoothPath(marketBooth.slug)}
        >
          <Show when={!_.isEmpty(marketBooth.imageUrl)}>
            <img class={styles.Image} src={marketBooth.imageUrl} alt="" />
          </Show>
          <Show when={_.isEmpty(marketBooth.imageUrl)}>
            <PlaceholderImage wide />
          </Show>
          <div>
            <span class={styles.Label}>{marketBooth.name}</span>
          </div>
        </A>
      )}
    </For>
  );
}
