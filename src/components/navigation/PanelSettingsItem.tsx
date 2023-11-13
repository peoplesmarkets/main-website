import { JSX } from "solid-js";

import { MaterialIcon } from "../assets";
import styles from "./PanelSettingsItem.module.scss";

type Props = {
  readonly icon: string;
  readonly onClick: () => void;
  readonly children?: JSX.Element;
};

export function PanelSettingsItem(props: Props) {
  return (
    <button class={styles.PanelSettingsItem} onClick={() => props.onClick()}>
      {props.children}
      <MaterialIcon class={styles.Icon} icon={props.icon} />
    </button>
  );
}
