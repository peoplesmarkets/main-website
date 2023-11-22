import styles from "./Border.module.scss";

type Props = {
  readonly narrow?: boolean | undefined;
  readonly tall?: boolean | undefined;
  readonly flat?: boolean | undefined;
};

export function Border(props: Props) {
  return (
    <div
      class={styles.Border}
      classList={{
        [styles.Narrow]: Boolean(props.narrow),
        [styles.Tall]: Boolean(props.tall),
        [styles.Flat]: Boolean(props.flat),
      }}
    />
  );
}
