import { JSX } from "solid-js";
import styles from "./Fonts.module.scss";

type Props = {
  children: JSX.Element;
};

export function TextLabel(props: Props) {
  return <span class={styles.Label}>{props.children}</span>;
}
