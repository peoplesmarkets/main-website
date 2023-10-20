import { For } from "solid-js";

import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import styles from "./MediaList.module.scss";
import { MediaListItem } from "./MediaListItem";

type Props = {
  medias: () => MediaResponse[] | undefined;
};

export function MediaList(props: Props) {
  return (
    <div class={styles.MediaList}>
      <For each={props.medias()}>
        {(media) => <MediaListItem media={() => media} />}
      </For>
    </div>
  );
}
