import { Show } from "solid-js";
import styles from "./Cover.module.scss";

type Props = {
  pageLoad?: boolean;
};

export function Cover(props: Props) {
  return (
    <div
      class={styles.Cover}
      classList={{ [styles.All]: Boolean(props.pageLoad) }}
    >
      <Show when={Boolean(props.pageLoad)}>Loading ...</Show>
    </div>
  );
}
