import { A } from "@solidjs/router";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MediaService } from "../../services";
import { Show, createResource } from "solid-js";
import { isResolved } from "../content";
import { MediaResponse } from "../../services/peoplesmarkets/media/v1/media";
import { Dialog } from "../layout";
import { ActionButton } from "../form";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales";
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
            <Show when={isResolved(mediaDownloadUrl.state)}>
              <ActionButton actionType="active" onClick={props.onClose}>
                <A
                  class={styles.ButtonLink}
                  href={mediaDownloadUrl()!}
                  target="_blank"
                >
                  <Trans key={TKEYS.media["Download-now"]} />
                </A>
              </ActionButton>
            </Show>
          </div>
        </div>
      </Dialog>
    </>
  );
}
