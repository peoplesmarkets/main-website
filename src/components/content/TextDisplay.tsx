import { JSX } from "solid-js";
import styles from "./Fonts.module.scss";

type Props = {
  children: JSX.Element;
};

export function TextDisplay(props: Props) {
  return <span class={styles.Display}>{props.children}</span>;
}
