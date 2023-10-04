import { A, useMatch } from "@solidjs/router";
import { Component, JSX } from "solid-js";

import styles from "./PanelItem.module.scss";

type Props = {
  Icon: Component<{ class?: string }>;
  path: () => string;
  children: JSX.Element;
};

export function PanelItem(props: Props) {
  return (
    <A
      href={props.path()}
      class={styles.PanelItem}
      classList={{
        [styles.Active]: Boolean(useMatch(props.path)()),
      }}
    >
      <props.Icon class={styles.Icon} />
      {props.children}
    </A>
  );
}
