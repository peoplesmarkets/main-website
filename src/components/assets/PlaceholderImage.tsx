import { ImageIcon } from "../icons";
import styles from "./PlaceholderImage.module.scss";

type Props = {
  readonly wide?: boolean;
  readonly banner?: boolean;
  readonly small?: boolean;
  readonly large?: boolean;
};

export function PlaceholderImage(props: Props) {
  return (
    <div
      class={styles.Placeholder}
      classList={{
        [styles.Wide]: Boolean(props.wide),
        [styles.Banner]: Boolean(props.banner),
        [styles.Small]: Boolean(props.small),
        [styles.Large]: Boolean(props.large),
      }}
    >
      <ImageIcon class={styles.PlaceholderIcon} />
    </div>
  );
}
