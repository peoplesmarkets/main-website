import { Trans } from "@mbarzda/solid-i18next";
import {
  ErrorBoundary,
  Suspense,
  createResource,
  createSignal,
} from "solid-js";

import { ContentError, ContentLoading } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { Section } from "../../../components/layout";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import { OfferResponse } from "../../../services/peoplesmarkets/commerce/v1/offer";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import {
  MediaFilterField,
  MediaOrderByField,
} from "../../../services/peoplesmarkets/media/v1/media";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";
import { MediaList } from "../MediaList";
import { CreateMediaDialog } from "../media-configuration/CreateMediaDialog";
import styles from "./MediaSettings.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly offer: OfferResponse | undefined;
};

export function MediaSettings(props: Props) {
  const { mediaService } = useServiceClientContext();

  const [showCreateMedia, setShowCreateMedia] = createSignal(false);

  const [medias, { refetch }] = createResource(() => props.offer, fetchMedias);

  async function fetchMedias(offer: OfferResponse) {
    const response = await mediaService.list({
      shopId: offer.shopId,
      filter: {
        field: MediaFilterField.MEDIA_FILTER_FIELD_OFFER_ID,
        query: offer.offerId,
      },
      orderBy: {
        field: MediaOrderByField.MEDIA_ORDER_BY_FIELD_ORDERING,
        direction: Direction.DIRECTION_ASC,
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
          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateMedia}
          >
            <Trans key={TKEYS.dashboard.media["create-new-file"]} />
          </ActionButton>
        </div>

        <ErrorBoundary fallback={<ContentError />}>
          <Suspense fallback={<ContentLoading />}>
            <MediaList
              medias={medias()}
              onUpdate={refreshMedias}
              offer={props.offer}
            />
          </Suspense>
        </ErrorBoundary>
      </Section>

      <CreateMediaDialog
        shop={props.shop}
        offerId={props.offer?.offerId}
        show={showCreateMedia()}
        onClose={handleCloseCreateMedia}
        onUpdate={refreshMedias}
      />
    </>
  );
}
