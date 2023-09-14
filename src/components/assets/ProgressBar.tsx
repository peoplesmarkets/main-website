import _ from "lodash";
import styles from "./ProgressBar.module.scss";
import { Show } from "solid-js";

type Props = {
  readonly total?: number;
  readonly current?: () => number | undefined;
};

export function ProgressBar(props: Props) {
  return (
    <Show
      when={!_.isNil(props.total) && !_.isNil(props.current?.())}
      fallback={<progress class={styles.ProgressBar} />}
    >
      <progress
        class={styles.ProgressBar}
        max={props.total}
        value={props.current!()}
      />
    </Show>
  );
}
