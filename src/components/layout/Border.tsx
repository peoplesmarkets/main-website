import styles from "./Border.module.scss";

type Props = {
  narrow?: boolean;
  tall?: boolean;
};

export function Border(props: Props) {
  return (
    <div
      class={styles.Border}
      classList={{
        [styles.Narrow]: Boolean(props.narrow),
        [styles.Tall]: Boolean(props.tall),
      }}
    />
  );
}
