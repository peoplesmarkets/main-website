import { JSX } from "solid-js";

import styles from "./Section.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  wide?: boolean;
};

export default function Section(props: Props) {
  const innerClass = props.wide
    ? styles.SectionInnerWide
    : styles.SectionInnerNormal;

  return (
    <div class={styles.Section}>
      <div classList={{ [innerClass]: true }} {...props}>
        {props.children}
      </div>
    </div>
  );
}
