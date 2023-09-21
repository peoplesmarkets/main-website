import { A } from "@solidjs/router";
import { JSX, Show } from "solid-js";
import _ from "lodash";

import { buildMarketBoothPath } from "../../routes/store/StoreRoutes";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Page } from "../layout";
import styles from "./MarketBoothContext.module.scss";

type Props = {
  readonly marketBooth: () => MarketBoothResponse | undefined;
  readonly children: JSX.Element;
  readonly withLink?: boolean;
};

export function MarketBoothContext(props: Props) {
  return (
    <Show when={!_.isNil(props.marketBooth())}>
      <Page class={styles.Page}>
        <Show when={props.marketBooth()!.imageUrl}>
          <div class={styles.ImageContainer}>
            <img
              class={styles.Image}
              src={props.marketBooth()!.imageUrl}
              alt=""
            />
          </div>
        </Show>
        <span
          class={styles.Headline}
          classList={{ [styles.HeadlineBordered]: Boolean(props.withLink) }}
        >
          <Show
            when={props.withLink}
            fallback={
              <span class={styles.Link}>{props.marketBooth()!.name}</span>
            }
          >
            <A
              class={styles.Link}
              href={buildMarketBoothPath(props.marketBooth()!.marketBoothId)}
            >
              {props.marketBooth()!.name}
            </A>
          </Show>
        </span>

        {props.children}
      </Page>
    </Show>
  );
}
