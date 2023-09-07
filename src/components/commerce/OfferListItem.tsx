import { A } from "@solidjs/router";

import { OFFERS_PATH } from "../../App";
import { buildPath } from "../../lib";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Multiline } from "../content";
import styles from "./OfferListItem.module.scss";
import { Show } from "solid-js";
import _ from "lodash";
import { ImageIcon } from "../icons";
import { OfferPrice } from "./OfferPrice";

type Props = {
  readonly offer: () => OfferResponse;
};

export function OfferListItem(props: Props) {
  return (
    <A
      class={styles.OfferListItem}
      href={buildPath(OFFERS_PATH, props.offer().offerId)}
    >
      <Show
        when={!_.isEmpty(props.offer().images)}
        fallback={
          <div class={styles.ImagePlaceholder}>
            <ImageIcon class={styles.PlaceholderIcon} />
          </div>
        }
      >
        <div class={styles.ImageContainer}>
          <img
            class={styles.Image}
            src={_.first(props.offer().images)?.imageUrl}
            alt=""
          />
        </div>
      </Show>
      <div class={styles.Content}>
        <span class={styles.Title}>{props.offer().name}</span>
        <span class={styles.Detail}>
          <Multiline text={() => props.offer().description} maxRows={6} />
        </span>

        <Show when={!_.isNil(props.offer()?.price)}>
          <OfferPrice offer={() => props.offer()} />
        </Show>
      </div>
    </A>
  );
}
