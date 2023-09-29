import { JSX } from "solid-js";
import styles from "./Fonts.module.scss";

type Props = {
  children: JSX.Element;
};

export function TextHeadline(props: Props) {
  return <span class={styles.Headline}>{props.children}</span>;
}
