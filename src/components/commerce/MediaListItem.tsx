import { Trans } from "@mbarzda/solid-i18next";
import { Show, createSignal } from "solid-js";

import { TKEYS } from "../../locales";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { ActionButton } from "../form";
import { DownloadMediaDialog } from "./DownloadMediaDialog";
import styles from "./MediaListItem.module.scss";

type Props = {
  media: () => MediaResponse;
};

export function MediaListItem(props: Props) {
  const [showDownloadMediaDialog, setShowDownloadMediaDialog] =
    createSignal(false);

  function handleStartDownloadMedia() {
    setShowDownloadMediaDialog(true);
  }

  function handleCloseDownloadMediaDialog() {
    setShowDownloadMediaDialog(false);
  }

  return (
    <>
      <div class={styles.MediaListItem}>
        <p>{props.media().name}</p>
        <ActionButton actionType="active" onClick={handleStartDownloadMedia}>
          <Trans key={TKEYS.media.Download} />
        </ActionButton>
      </div>

      <Show when={showDownloadMediaDialog()}>
        <DownloadMediaDialog
          media={props.media}
          onClose={handleCloseDownloadMediaDialog}
        />
      </Show>
    </>
  );
}
