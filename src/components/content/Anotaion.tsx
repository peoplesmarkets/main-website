import { JSX } from "solid-js";
import styles from "./Anotation.module.scss";

type Props = {
  children?: JSX.Element;
  start?: boolean;
  center?: boolean;
  end?: boolean;
  active?: boolean;
  warn?: boolean;
};

export function Anotation(props: Props) {
  return (
    <span
      class={styles.Anotation}
      classList={{
        [styles.Start]: Boolean(props.start),
        [styles.Center]: Boolean(props.center),
        [styles.End]: Boolean(props.end),
        [styles.Active]: Boolean(props.active),
        [styles.Warn]: Boolean(props.warn),
      }}
    >
      {props.children}
    </span>
  );
}
