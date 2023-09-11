import { A } from "@solidjs/router";
import { JSX, Show } from "solid-js";

import { MARKET_BOOTHS_PATH } from "../../App";
import { buildPath } from "../../lib";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import styles from "./MarketBoothContext.module.scss";
import { Page } from "../layout";
import _ from "lodash";

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
              href={buildPath(
                MARKET_BOOTHS_PATH,
                props.marketBooth()!.marketBoothId
              )}
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
