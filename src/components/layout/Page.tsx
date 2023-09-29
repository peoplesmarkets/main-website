import { JSX } from "solid-js";

import styles from "./Page.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  display?: boolean;
};

export function Page(props: Props) {
  return (
    <div
      class={props.class || styles.PageBackground}
      classList={{ [styles.Display]: Boolean(props.display) }}
    >
      <div class={props.class || styles.Page} {...props}>
        {props.children}
      </div>
    </div>
  );
}
