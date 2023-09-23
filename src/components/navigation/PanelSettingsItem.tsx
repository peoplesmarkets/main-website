import styles from "./PanelSettingsItem.module.scss";
import { Component, JSX } from "solid-js";

type Props = {
  readonly Icon: Component<{ class?: string }>;
  readonly onClick: () => void;
  readonly children?: JSX.Element;
};

export function PanelSettingsItem(props: Props) {
  return (
    <button class={styles.PanelSettingsItem} onClick={() => props.onClick()}>
      {props.children}
      <props.Icon class={styles.Icon} />
    </button>
  );
}
