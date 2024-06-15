import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { Suspense, createResource } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { MediaResponse } from "../../services/sited_io/media/v1/media";
import { Font } from "../content";
import { ActionButton } from "../form";
import { MdDialog } from "../layout/MdDialog";
import styles from "./DownloadMediaDialog.module.scss";

type Props = {
  show: boolean;
  media: MediaResponse | undefined;
  onClose: () => void;
};

export function DownloadMediaDialog(props: Props) {
  const { mediaService } = useServiceClientContext();

  function getMediaDownloadLink() {
    if (props.show) {
      return props.media;
    }
  }

  const [mediaDownloadUrl] = createResource(
    getMediaDownloadLink,
    async (media) => {
      const response = await mediaService.downloadMedia(media.mediaId);

      return response.downloadUrl;
    }
  );

  return (
    <>
      <MdDialog open={props.show} onClose={props.onClose}>
        <div slot="headline">
          <Font
            type="title"
            key={TKEYS.media["download-file"]}
            options={{
              item: props.media?.name,
            }}
          />
        </div>

        <div slot="content" />

        <div slot="actions">
          <ActionButton actionType="neutral-borderless" onClick={props.onClose}>
            <Trans key={TKEYS.form.action.Cancel} />
          </ActionButton>

          <ActionButton
            actionType="active"
            onClick={props.onClose}
            disabled={!resourceIsReady(mediaDownloadUrl)}
          >
            <Suspense>
              <A
                class={styles.ButtonLink}
                href={mediaDownloadUrl() || ""}
                download
              >
                <Trans key={TKEYS.media["Download-now"]} />
              </A>
            </Suspense>
          </ActionButton>
        </div>
      </MdDialog>
    </>
  );
}
