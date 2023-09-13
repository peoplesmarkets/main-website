import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import {
  For,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
} from "solid-js";

import { DASHBOARD_MARKET_BOOTH_PATH, MEDIAS_SUBPATH } from "../../App";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales";
import { MediaService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { ContentError, isResolved } from "../content";
import { ActionButton } from "../form";
import { Section } from "../layout";
import { CreateMediaDialog } from "./CreateMediaDialog";
import styles from "./MediaSettings.module.scss";
import { MediaOrderByField } from "../../services/peoplesmarkets/media/v1/media";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";

type Props = {
  readonly marketBooth: () => MarketBoothResponse;
};

export function MediaSettings(props: Props) {
  const { accessToken } = useAccessTokensContext();

  const mediaService = new MediaService(accessToken);

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  const [medias, { refetch }] = createResource(
    () => props.marketBooth().marketBoothId,
    fetchMedias
  );

  async function fetchMedias(marketBoothId: string) {
    const response = await mediaService.list({
      marketBoothId,
      orderBy: {
        field: MediaOrderByField.MEDIA_ORDER_BY_FIELD_CREATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
      pagination: {
        page: 1,
        size: 3,
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
          <Match when={isResolved(medias.state)}>
            <div class={styles.Table}>
              <For each={medias()}>
                {(media) => (
                  <A
                    class={styles.Row}
                    href={buildPath(
                      DASHBOARD_MARKET_BOOTH_PATH,
                      props.marketBooth().marketBoothId,
                      MEDIAS_SUBPATH
                    )}
                  >
                    <span class={styles.Name}>{media.name}</span>
                  </A>
                )}
              </For>
              <A
                href={buildPath(
                  DASHBOARD_MARKET_BOOTH_PATH,
                  props.marketBooth().marketBoothId,
                  MEDIAS_SUBPATH
                )}
                class={styles.More}
              >
                <Trans key={TKEYS.common.more} />
              </A>
            </div>
          </Match>
        </Switch>
      </Section>

      <Show when={showCreateMedia()}>
        <CreateMediaDialog
          marketBoothId={props.marketBooth().marketBoothId}
          onClose={handleCloseCreateMedia}
          onUpdate={refreshMedias}
        />
      </Show>
    </>
  );
}
