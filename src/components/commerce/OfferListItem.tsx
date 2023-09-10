import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { Show } from "solid-js";

import { OFFERS_PATH } from "../../App";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { ImageIcon } from "../icons";
import styles from "./OfferListItem.module.scss";
import { OfferPrice } from "./OfferPrice";

type Props = {
  readonly offer: () => OfferResponse;
  readonly showMarketBooth?: boolean;
};

export function OfferListItem(props: Props) {
  return (
    <div class={styles.OfferListItem}>
      <div class={styles.Card}>
        <A
          class={styles.CardImage}
          href={buildPath(OFFERS_PATH, props.offer().offerId)}
        >
          <Show when={!_.isEmpty(props.offer().images)}>
            <img
              class={styles.Image}
              src={_.first(props.offer().images)?.imageUrl}
              alt=""
            />
          </Show>

          <Show when={_.isEmpty(props.offer().images)}>
            <div class={styles.Placeholder}>
              <ImageIcon class={styles.PlaceholderIcon} />
            </div>
          </Show>
        </A>

        <div class={styles.CardInfo}>
          <A
            class={styles.Name}
            href={buildPath(OFFERS_PATH, props.offer().offerId)}
          >
            {props.offer().name}
          </A>

          <Show when={props.showMarketBooth}>
            <span class={styles.Info}>
              <Trans key={TKEYS.common.by} />: {props.offer().marketBoothId}
            </span>
          </Show>

          <div class={styles.Price}>
            <Show when={!_.isNil(props.offer()?.price)}>
              <OfferPrice offer={() => props.offer()} />
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
