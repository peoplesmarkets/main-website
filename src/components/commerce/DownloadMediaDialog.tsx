import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { MediaService } from "../../services";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { isResolved } from "../content";
import { ActionButton } from "../form";
import { Dialog } from "../layout";
import styles from "./DownloadMediaDialog.module.scss";

type Props = {
  media: () => MediaResponse;
  onClose: () => void;
};

export function DownloadMediaDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const mediaService = new MediaService(accessToken);

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
              disabled={!isResolved(mediaDownloadUrl.state)}
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
