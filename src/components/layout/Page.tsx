import { JSX } from "solid-js";

import styles from "./Page.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

export function Page(props: Props) {
  return (
    <div class={styles.Page} {...props}>
      {props.children}
    </div>
  );
}
