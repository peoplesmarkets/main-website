import { Trans } from "@mbarzda/solid-i18next";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import {
  MediaFilterField,
  MediaOrderByField,
} from "../../services/peoplesmarkets/media/v1/media";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { ContentError } from "../content";
import { ActionButton } from "../form";
import { Section } from "../layout";
import { MediaList } from "../media";
import { CreateMediaDialog } from "./CreateMediaDialog";
import styles from "./MediaSettings.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
};

export function MediaSettings(props: Props) {
  const { mediaService } = useServiceClientContext();

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  const [medias, { refetch }] = createResource(fetchMedias);

  async function fetchMedias() {
    const response = await mediaService.list({
      shopId: props.offer().shopId,
      filter: {
        field: MediaFilterField.MEDIA_FILTER_FIELD_OFFER_ID,
        query: props.offer().offerId,
      },
      orderBy: {
        field: MediaOrderByField.MEDIA_ORDER_BY_FIELD_CREATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
    });

    return response.medias;
  }

  async function refreshMedias() {
    refetch();
  }

  function handleOpenCreateMedia() {
    setShowCreateMedia(true);
  }

  function handleCloseCreateMedia() {
    setShowCreateMedia(false);
  }

  return (
    <>
      <Section>
        <div class={styles.TitleSection}>
          <span class={styles.Title}>
            <Trans key={TKEYS.media["Title-plural"]} />:
          </span>
          <ActionButton actionType="neutral" onClick={handleOpenCreateMedia}>
            <Trans key={TKEYS.dashboard.media["create-new-file"]} />
          </ActionButton>
        </div>

        <Switch>
          <Match when={medias.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={resourceIsReady(medias)}>
            <MediaList
              medias={() => medias()!}
              onUpdate={refreshMedias}
              offer={() => props.offer()}
            />
          </Match>
        </Switch>
      </Section>

      <Show when={showCreateMedia()}>
        <CreateMediaDialog
          offerId={props.offer().offerId}
          onClose={handleCloseCreateMedia}
          onUpdate={refreshMedias}
        />
      </Show>
    </>
  );
}
