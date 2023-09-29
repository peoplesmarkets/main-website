import styles from "./Border.module.scss";

type Props = {
  narrow?: boolean;
};

export function Border(props: Props) {
  return (
    <div
      class={styles.Border}
      classList={{ [styles.Narrow]: Boolean(props.narrow) }}
    />
  );
}
