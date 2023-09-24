import { JSX } from "solid-js";
import styles from "./Anotation.module.scss";

type Props = {
  children: JSX.Element;
  padded?: boolean;
  bordered?: boolean;
};

export function Anotation(props: Props) {
  return (
    <span
      class={styles.Anotation}
      classList={{
        [styles.Padded]: Boolean(props.padded),
        [styles.Bordered]: Boolean(props.bordered),
      }}
    >
      {props.children}
    </span>
  );
}
