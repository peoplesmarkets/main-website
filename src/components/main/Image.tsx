import styles from "./Image.module.scss";

type Props = {
  smallImageUrl: string;
  expandedImageurl: string;
  bordered?: boolean;
};

export function Image(props: Props) {
  return (
    <div
      class={styles.Image}
      classList={{ [styles.Bordered]: Boolean(props.bordered) }}
      style={{
        "--small-image-url": `url("${props.smallImageUrl}")`,
        "--expanded-image-url": `url("${props.expandedImageurl}")`,
      }}
    />
  );
}
