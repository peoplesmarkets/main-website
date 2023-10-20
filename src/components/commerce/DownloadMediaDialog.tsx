import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { createResource } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { ActionButton } from "../form";
import { Dialog } from "../layout";
import styles from "./DownloadMediaDialog.module.scss";
import { resourceIsReady } from "../../lib";

type Props = {
  media: () => MediaResponse;
  onClose: () => void;
};

export function DownloadMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { mediaService } = useServiceClientContext();

  const [mediaDownloadUrl] = createResource(fetchDownloadUrl);

  async function fetchDownloadUrl() {
    const response = await mediaService.downloadMedia(props.media().mediaId);

    return response.downloadUrl;
  }

  return (
    <>
      <Dialog
        title={trans(TKEYS.media["download-file"], {
          item: props.media().name,
        })}
        onClose={props.onClose}
      >
        <div class={styles.Form}>
          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active"
              onClick={props.onClose}
              disabled={!resourceIsReady(mediaDownloadUrl)}
            >
              <A
                class={styles.ButtonLink}
                href={mediaDownloadUrl() || ""}
                target="_blank"
              >
                <Trans key={TKEYS.media["Download-now"]} />
              </A>
            </ActionButton>
          </div>
        </div>
      </Dialog>
    </>
  );
}
