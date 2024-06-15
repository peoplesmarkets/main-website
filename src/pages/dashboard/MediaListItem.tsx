import { createSortable } from "@thisbeyond/solid-dnd";
import { MediaResponse } from "../../services/sited_io/media/v1/media";

import { Trans } from "@mbarzda/solid-i18next";
import { MdIcon } from "../../components/assets";
import { Font } from "../../components/content";
import { MdListItem } from "../../components/content/MdListItem";
import { ActionButton } from "../../components/form";
import { TKEYS } from "../../locales";
import styles from "./MediaList.module.scss";

type Props = {
  readonly media: MediaResponse;
  readonly isActive: boolean;
  readonly onEditMedia: (media: MediaResponse) => void;
  readonly onStartDeleteMedia: (media: MediaResponse) => void;
};

export function MediaListItem(props: Props) {
  /* eslint-disable-next-line solid/reactivity */
  const sortable = createSortable(props.media.mediaId);
  false && sortable;

  return (
    <div
      use:sortable
      class={styles.Row}
      classList={{
        [styles.ActiveRow]: props.isActive,
      }}
    >
      <MdListItem>
        <MdIcon slot="start" icon="drag_handle" />

        <div slot="headline">
          <Font type="label">{props.media.name}</Font>
        </div>

        <div slot="end" class={styles.RowActions}>
          <ActionButton
            actionType="neutral"
            small
            onClick={() => props.onEditMedia(props.media)}
          >
            <Trans key={TKEYS.form.action.Edit} />
          </ActionButton>

          <ActionButton
            actionType="danger"
            small
            onClick={() => props.onStartDeleteMedia(props.media)}
          >
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </MdListItem>
    </div>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      draggable: boolean;
      droppable: boolean;
      sortable: boolean;
    }
  }
}
