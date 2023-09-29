import { JSX } from "solid-js";
import styles from "./Fonts.module.scss";

type Props = {
  children: JSX.Element;
};

export function TextTitle(props: Props) {
  return <span class={styles.Title}>{props.children}</span>;
}
