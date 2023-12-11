import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { MediaList } from "../../../components/commerce";
import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { CancelConfirmationDialog } from "./CancelConfirmationDialog";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication } from "../../../guards/authentication";
import { secondsToLocaleDate } from "../../../lib";
import { TKEYS } from "../../../locales";
import {
  MediaFilterField,
  MediaOrderByField,
} from "../../../services/peoplesmarkets/media/v1/media";
import styles from "./Page.module.scss";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";

export default function SubscriptionDetailPage() {
  const location = useLocation();

  const [trans] = useTransContext();

  const { mediaSubscriptionService, offerService, mediaService } =
    useServiceClientContext();

  const [showCancelConfirmation, setShowCancelConfirmation] =
    createSignal(false);

  const [mediaSubscription, mediaSubscriptionActions] = createResource(
    () => useParams().subscriptionId,
    fetchMediaSubscription
  );

  const [offer] = createResource(
    () => mediaSubscription()?.offerId,
    fetchOffer
  );

  const [files] = createResource(
    () => mediaSubscription()?.offerId,
    fetchFiles
  );

  onMount(async () => {
    await requireAuthentication(location.pathname);
  });

  async function fetchMediaSubscription(subscriptionId: string) {
    const response = await mediaSubscriptionService.get({
      mediaSubscriptionId: subscriptionId,
    });
    return response.mediaSubscription;
  }

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  async function fetchFiles(offerId: string) {
    const response = await mediaService.listAccessible({
      filter: {
        field: MediaFilterField.MEDIA_FILTER_FIELD_OFFER_ID,
        query: offerId,
      },
      orderBy: {
        field: MediaOrderByField.MEDIA_ORDER_BY_FIELD_ORDERING,
        direction: Direction.DIRECTION_ASC,
      },
    });
    return response.medias;
  }

  function loaded() {
    return !_.isNil(mediaSubscription());
  }

  function toLocaleDate(timestamp: number | undefined) {
    if (!_.isNil(timestamp)) {
      return secondsToLocaleDate(timestamp, trans(TKEYS.lang));
    }
    return "";
  }

  async function handleConfirmCancelSubscription() {
    const mediaSubscriptionId = mediaSubscription()?.mediaSubscriptionId;
    if (!_.isNil(mediaSubscriptionId)) {
      await mediaSubscriptionService.cancel({
        mediaSubscriptionId,
      });
      mediaSubscriptionActions.refetch();
    }
    handleCloseCancelSubscription();
  }

  function handleCancelSubscription() {
    setShowCancelConfirmation(true);
  }

  function handleCloseCancelSubscription() {
    setShowCancelConfirmation(false);
  }

  return (
    <>
      <Section warn>
        <Font type="label" key={TKEYS.beta.title} />
        <Font type="body" inline key={TKEYS.beta.info} />
        <Font type="body" inline>
          <a href={`mailto:${import.meta.env.VITE_SUPPORT_EMAIL_ADDRESS}`}>
            {import.meta.env.VITE_SUPPORT_EMAIL_ADDRESS}
          </a>
        </Font>
      </Section>

      <DefaultBoundary loaded={loaded}>
        <Section>
          <div class={styles.SubscriptionDetail}>
            <Font
              type="title"
              inline
              key={TKEYS.subscription["subscription-to"]}
            />{" "}
            <Font type="title" inline strong>
              {offer()?.name}
            </Font>
            <Show when={!_.isNil(mediaSubscription()?.payedUntil)}>
              <span class={styles.Detail}>
                <Trans key={TKEYS.subscription["payed-until"]} />:{" "}
                {toLocaleDate(mediaSubscription()?.payedUntil)}
              </span>
            </Show>
            <Show when={!_.isNil(mediaSubscription()?.cancelAt)}>
              <Font
                type="body"
                danger
                inline
                key={TKEYS.subscription["cancel-to"]}
              />
              <Font type="body" danger inline>
                : {toLocaleDate(mediaSubscription()?.cancelAt)}
              </Font>
            </Show>
          </div>
        </Section>

        <Section bordered>
          <div class={styles.SectionHeader}>
            <span class={styles.Label}>
              <Trans key={TKEYS.subscription["included-files"]} />
            </span>
          </div>

          <MediaList medias={() => files()} />
        </Section>

        <Section bordered>
          <div class={styles.SectionHeader}>
            <span class={styles.Label}>
              <Trans key={TKEYS.subscription["subscription-configuration"]} />
            </span>
          </div>

          <div class={styles.Action}>
            <Font type="body" key={TKEYS.subscription["cancel-subscription"]} />

            <ActionButton
              actionType="danger"
              small
              onClick={handleCancelSubscription}
              disabled={!_.isNil(mediaSubscription()?.cancelAt)}
            >
              <Trans key={TKEYS.common.cancel} />
            </ActionButton>
          </div>
        </Section>

        <CancelConfirmationDialog
          show={showCancelConfirmation()}
          onConfirmation={handleConfirmCancelSubscription}
          onClose={handleCloseCancelSubscription}
        />
      </DefaultBoundary>
    </>
  );
}
