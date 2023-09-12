import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Show } from "solid-js";
import { buildPath } from "../../lib";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Multiline } from "../content";
import styles from "./MarketBoothList.module.scss";
import { PlaceholderImage } from "../assets/PlaceholderImage";

type Props = {
  readonly marketBooths: () => MarketBoothResponse[];
  readonly basePath: string;
  readonly withDetails?: boolean;
};

export function MarketBoothList(props: Props) {
  return (
    <For each={props.marketBooths()}>
      {(marketBooth) => (
        <A
          class={styles.Row}
          href={buildPath(props.basePath, marketBooth.marketBoothId)}
        >
          <Show when={!_.isEmpty(marketBooth.imageUrl)}>
            <img class={styles.Image} src={marketBooth.imageUrl} alt="" />
          </Show>
          <Show when={_.isEmpty(marketBooth.imageUrl)}>
            <PlaceholderImage wide/>
          </Show>
          <div>
            <span class={styles.Label}>{marketBooth.name}</span>
            <Show when={Boolean(props.withDetails)}>
              <span class={styles.Detail}>
                <Multiline text={() => marketBooth.description} maxRows={6} />
              </span>
            </Show>
          </div>
        </A>
      )}
    </For>
  );
}
