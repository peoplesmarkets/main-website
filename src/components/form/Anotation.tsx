import { JSX } from "solid-js";
import styles from "./Anotation.module.scss";

type Props = {
  children: JSX.Element;
};

export function Anotation(props: Props) {
  return <span class={styles.Anotation}>{props.children}</span>;
}
