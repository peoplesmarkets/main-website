import { JSX } from "solid-js";
import styles from "./Fonts.module.scss";

type Props = {
  children: JSX.Element;
};

export function TextBody(props: Props) {
  return <span class={styles.Body}>{props.children}</span>;
}
