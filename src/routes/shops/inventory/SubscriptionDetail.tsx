import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation, useParams } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import { MediaList } from "../../../components/commerce";
import { ContentError, TextBody } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { CancelConfirmation } from "../../../components/form/CancelConfirmation";
import { Section } from "../../../components/layout";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication, secondsToLocaleDate } from "../../../lib";
import { TKEYS } from "../../../locales";
import { MediaFilterField } from "../../../services/peoplesmarkets/media/v1/media";
import { buildOfferPath } from "../shop-routing";
import styles from "./SubscriptionDetail.module.scss";

export default function SubscriptionDetail() {
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
    });
    return response.medias;
  }

  function offerPath() {
    const shopSlug = offer()?.shopSlug;
    const offerId = offer()?.offerId;
    if (!_.isNil(shopSlug) && !_.isNil(offerId)) {
      return buildOfferPath(shopSlug, offerId);
    }
    return "";
  }
  function toLocaleDate(timestamp: number | undefined) {
    if (!_.isNil(timestamp)) {
      return secondsToLocaleDate(timestamp, trans(TKEYS.lang));
    }
    return "";
  }

  function handleCancelSubscription() {
    setShowCancelConfirmation(true);
  }

  function handleQuitCancelSubscription() {
    setShowCancelConfirmation(false);
  }

  async function handleConfirmCancelSubscription() {
    const mediaSubscriptionId = mediaSubscription()?.mediaSubscriptionId;
    if (!_.isNil(mediaSubscriptionId)) {
      await mediaSubscriptionService.cancel({
        mediaSubscriptionId,
      });

      mediaSubscriptionActions.refetch();
      handleQuitCancelSubscription();
    }
  }

  return (
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Section>
          <div class={styles.SubscriptionDetail}>
            <span class={styles.Title}>
              <Trans key={TKEYS.subscription["subscription-to"]} />{" "}
              <A class={styles.Link} href={offerPath()}>
                {offer()?.name}
              </A>
            </span>

            <Show when={!_.isNil(mediaSubscription()?.payedUntil)}>
              <span class={styles.Detail}>
                <Trans key={TKEYS.subscription["payed-until"]} />:{" "}
                {toLocaleDate(mediaSubscription()?.payedUntil)}
              </span>
            </Show>
            <Show when={!_.isNil(mediaSubscription()?.canceledAt)}>
              <span class={styles.Detail}>
                <Trans key={TKEYS.subscription["canceled-at"]} />:{" "}
                {toLocaleDate(mediaSubscription()?.canceledAt)}
              </span>
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

        <Show when={_.isNil(mediaSubscription()?.canceledAt)}>
          <Section bordered>
            <div class={styles.SectionHeader}>
              <span class={styles.Label}>
                <Trans key={TKEYS.subscription["subscription-configuration"]} />
              </span>
            </div>

            <div class={styles.Action}>
              <TextBody>
                <Trans key={TKEYS.subscription["cancel-subscription"]} />
              </TextBody>
              <ActionButton
                actionType="danger"
                small
                onClick={handleCancelSubscription}
              >
                <Trans key={TKEYS.common.cancel} />
              </ActionButton>
            </div>
          </Section>
        </Show>

        <Show when={showCancelConfirmation()}>
          <CancelConfirmation
            onCancel={handleQuitCancelSubscription}
            onConfirmation={handleConfirmCancelSubscription}
          />
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
