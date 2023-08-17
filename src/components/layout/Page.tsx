import { JSX } from "solid-js";

import styles from "./Page.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  wide?: boolean;
  danger?: boolean;
};

export default function Page(props: Props) {
  let classes = props.wide ? styles.PageWide : styles.Page;

  return (
    <div class={classes} {...props}>
      {props.children}
    </div>
  );
}
