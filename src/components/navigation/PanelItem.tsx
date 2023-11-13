import { A, useMatch } from "@solidjs/router";

import { MaterialIcon } from "../assets";
import styles from "./PanelItem.module.scss";

type Props = {
  path: () => string;
  icon: string;
  label: string;
};

export function PanelItem(props: Props) {
  const matches = useMatch(() => props.path());

  return (
    <A
      href={props.path()}
      class={styles.PanelItem}
      classList={{
        [styles.Active]: Boolean(useMatch(props.path)()),
      }}
    >
      <MaterialIcon
        class={styles.Icon}
        classList={{ [styles.ActiveIcon]: Boolean(matches()) }}
        icon={props.icon}
      />
      <span class={styles.Label}>{props.label}</span>
    </A>
  );
}
