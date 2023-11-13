import { JSX, Show } from "solid-js";

import styles from "./Font.module.scss";
import _ from "lodash";
import { Trans } from "@mbarzda/solid-i18next";

type Props = {
  readonly type: "display" | "headline" | "title" | "label" | "body" | "detail";
  readonly key?: string;
  readonly class?: string | undefined;
  readonly inline?: boolean | undefined;
  readonly strong?: boolean | undefined;
  readonly active?: boolean | undefined;
  readonly warn?: boolean | undefined;
  readonly children?: JSX.Element | undefined;
};

export function Font(props: Props) {
  return (
    <span
      class={props.class}
      classList={{
        [styles.Display]: props.type === "display",
        [styles.Headline]: props.type === "headline",
        [styles.Title]: props.type === "title",
        [styles.Label]: props.type === "label",
        [styles.Body]: props.type === "body",
        [styles.Detail]: props.type === "detail",
        [styles.Inline]: Boolean(props.inline),
        [styles.Strong]: Boolean(props.strong),
        [styles.Active]: Boolean(props.active),
        [styles.Warn]: Boolean(props.warn),
      }}
    >
      <Show
        when={_.isNil(props.key) || _.isEmpty(props.key)}
        fallback={<Trans key={props.key!} />}
      >
        {props.children}
      </Show>
    </span>
  );
}
