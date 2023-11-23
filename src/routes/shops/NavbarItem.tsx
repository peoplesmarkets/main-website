import { A, useMatch } from "@solidjs/router";

import { MdIcon } from "../../components/assets";
import styles from "./NavbarItem.module.scss";

type Props = {
  path: () => string;
  icon: string;
  label: string;
};

export function NavbarItem(props: Props) {
  const matches = useMatch(() => props.path());

  return (
    <A class={styles.NavbarItem} href={props.path()}>
      <div
        class={styles.IconContainer}
        classList={{
          [styles.Active]: Boolean(matches()),
        }}
      >
        <MdIcon
          class={styles.Icon}
          classList={{ [styles.ActiveIcon]: Boolean(matches()) }}
          icon={props.icon}
        />
      </div>
      <span class={styles.Label}>{props.label}</span>
    </A>
  );
}
