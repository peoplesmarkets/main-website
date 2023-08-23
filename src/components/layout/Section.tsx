import { JSX } from "solid-js";

import styles from "./Section.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  wide?: boolean;
  bordered?: boolean;
  danger?: boolean;
};

export function Section(props: Props) {
  return (
    <div
      classList={{
        [styles.Section]: true,
        [styles.Bordered]: Boolean(props.bordered),
        [styles.Danger]: Boolean(props.danger),
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}
