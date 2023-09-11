import { JSX } from "solid-js";

import styles from "./Section.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  bordered?: boolean;
  danger?: boolean;
  active?: boolean;
  flat?: boolean;
};

export function Section(props: Props) {
  return (
    <div
      classList={{
        [styles.Section]: true,
        [styles.Bordered]: Boolean(props.bordered),
        [styles.Active]: Boolean(props.active),
        [styles.Danger]: Boolean(props.danger),
        [styles.Flat]: Boolean(props.flat),
      }}
      {...props}
    >
      {props.children}
    </div>
  );
}
