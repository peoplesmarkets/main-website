import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal, onMount } from "solid-js";

import { MediaList } from "../../../components/commerce";
import { TextBody, isResolved } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { CancelConfirmation } from "../../../components/form/CancelConfirmation";
import { Section } from "../../../components/layout";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { requireAuthentication, secondsToLocaleDate } from "../../../lib";
import { TKEYS } from "../../../locales";
import {
  MediaService,
  MediaSubscriptionService,
  OfferService,
} from "../../../services";
import { MediaFilterField } from "../../../services/peoplesmarkets/media/v1/media";
import { buildOfferPath } from "../shop-routing";
import styles from "./SubscriptionDetail.module.scss";

export default function SubscriptionDetail() {
  const location = useLocation();

  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const mediaSubscriptionService = new MediaSubscriptionService(accessToken);
  const offerService = new OfferService(accessToken);
  const mediaService = new MediaService(accessToken);

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

  function toLocaleDate(timestamp: number) {
    return secondsToLocaleDate(timestamp, trans(TKEYS.lang));
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
    <>
      <Section>
        <Show when={isResolved(offer.state)}>
          <div class={styles.SubscriptionDetail}>
            <span class={styles.Title}>
              <Trans key={TKEYS.subscription["subscription-to"]} />{" "}
              <A
                class={styles.Link}
                href={buildOfferPath(offer()!.shopSlug, offer()!.offerId)}
              >
                {offer()?.name}
              </A>
            </span>

            <Show when={!_.isNil(mediaSubscription()?.payedUntil)}>
              <span class={styles.Detail}>
                <Trans key={TKEYS.subscription["payed-until"]} />:{" "}
                {toLocaleDate(mediaSubscription()!.payedUntil)}
              </span>
            </Show>
            <Show when={!_.isNil(mediaSubscription()?.canceledAt)}>
              <span class={styles.Detail}>
                <Trans key={TKEYS.subscription["canceled-at"]} />:{" "}
                {toLocaleDate(mediaSubscription()!.canceledAt!)}
              </span>
            </Show>
          </div>
        </Show>
      </Section>

      <Section bordered>
        <div class={styles.SectionHeader}>
          <span class={styles.Label}>
            <Trans key={TKEYS.subscription["included-files"]} />
          </span>
        </div>

        <Show when={isResolved(files.state)}>
          <MediaList medias={() => files()!} />
        </Show>
      </Section>

      <Show when={isResolved(mediaSubscription.state)}>
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
      </Show>

      <Show when={showCancelConfirmation()}>
        <CancelConfirmation
          onCancel={handleQuitCancelSubscription}
          onConfirmation={handleConfirmCancelSubscription}
        />
      </Show>
    </>
  );
}
