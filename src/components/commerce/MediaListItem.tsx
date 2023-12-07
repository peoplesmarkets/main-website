import { Trans } from "@mbarzda/solid-i18next";
import { createSignal } from "solid-js";

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
        <ActionButton
          actionType="active"
          small
          onClick={handleStartDownloadMedia}
        >
          <Trans key={TKEYS.media.Download} />
        </ActionButton>
      </div>

      <DownloadMediaDialog
        show={showDownloadMediaDialog()}
        media={props.media()}
        onClose={handleCloseDownloadMediaDialog}
      />
    </>
  );
}
