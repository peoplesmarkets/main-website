import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { DASHBOARD_PATH } from "../../App";
import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../../components/content";
import { Multiline } from "../../components/content/Multiline";
import { CreateOfferImageDialog } from "../../components/dashboard";
import { EditOfferDialog } from "../../components/dashboard/EditOfferDialog";
import { OfferImages } from "../../components/dashboard/OfferImages";
import { ActionButton, DeleteConfirmation } from "../../components/form";
import { Page, Section } from "../../components/layout";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildPath, secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import styles from "./Offer.module.scss";
import { OfferPrice } from "../../components/commerce/OfferPrice";

export default function Offer() {
  const { marketBoothId, offerId } = useParams();
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offer, { refetch }] = createResource(offerId, fetchOffer);

  const [showEditOffer, setShowEditOffer] = createSignal(false);
  const [showAddImage, setShowAddImage] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);

    return response.offer;
  }

  function lastImageOrdering() {
    return _.max(offer()?.images?.map((i) => i.ordering)) || 0;
  }

  function handleOpenEditOffer() {
    setShowEditOffer(true);
  }

  function handleCloseEditOffer() {
    setShowEditOffer(false);
  }

  function handleOpenAddImage() {
    setShowAddImage(true);
  }

  function handleCloseAddImage() {
    setShowAddImage(false);
  }

  function handleRefreshOffer() {
    refetch();
  }

  function handleStartDeletetion() {
    setShowDeleteConfirmation(true);
  }

  function handleDiscardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function handleConfirmDeleteion() {
    if (!_.isNil(offer())) {
      await offerService.delete(offer()!.offerId);
    }
    setShowDeleteConfirmation(false);
    navigate(buildPath(DASHBOARD_PATH, marketBoothId));
  }

  return (
    <>
      <Page>
        <Switch>
          <Match when={offer.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offer.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offer.state)}>
            <span class={styles.Title}>{offer()?.name}</span>

            <Show when={!_.isNil(offer()) && !_.isEmpty(offer()?.images)}>
              <OfferImages
                offer={() => offer()!}
                onUpdate={handleRefreshOffer}
              />
            </Show>

            <Section>
              <div class={styles.Price}>
                <OfferPrice offer={() => offer()} />
              </div>
            </Section>

            <Section>
              <span class={styles.Label}>
                <Trans key={TKEYS.offer.labels.Description} />:
              </span>
              <Show
                when={!_.isEmpty(offer()?.description)}
                fallback={
                  <span class={styles.Details}>
                    <Trans key={TKEYS.offer["no-description"]} />
                  </span>
                }
              >
                <Multiline text={() => offer()?.description} />
              </Show>
            </Section>

            <Section>
              <span class={styles.Label}>
                <Trans key={TKEYS.dashboard.offers.Details} />:
              </span>

              <span class={styles.Details}>
                <Trans key={TKEYS.offer.labels["Created-at"]} />:{" "}
                {secondsToLocaleString(offer()?.createdAt)}
              </span>

              <span class={styles.Details}>
                <Trans key={TKEYS.offer.labels["Updated-at"]} />:{" "}
                {secondsToLocaleString(offer()?.updatedAt)}
              </span>
            </Section>

            <Section bordered>
              <span class={styles.Label}>
                <Trans key={TKEYS.form.action.Edit} />
              </span>

              <div class={styles.EditSection}>
                <p class={styles.Body}>
                  <Trans key={TKEYS.dashboard.offers["edit-offer"]} />
                </p>
                <ActionButton
                  actionType="neutral"
                  onClick={handleOpenEditOffer}
                >
                  <Trans key={TKEYS.form.action.Edit} />
                </ActionButton>
              </div>
              <div class={styles.EditSection}>
                <p class={styles.Body}>
                  <Trans key={TKEYS.dashboard.offers["add-image"]} />
                </p>
                <ActionButton actionType="neutral" onClick={handleOpenAddImage}>
                  <Trans key={TKEYS.form.action.Edit} />
                </ActionButton>
              </div>
            </Section>

            <Section danger>
              <span class={styles.Label}>
                <Trans key={TKEYS.form["danger-zone"]} />
              </span>

              <div class={styles.EditSection}>
                <p class={styles.Body}>
                  <Trans key={TKEYS.dashboard.offers["delete-this-offer"]} />
                </p>
                <ActionButton
                  actionType="danger"
                  onClick={handleStartDeletetion}
                >
                  <Trans key={TKEYS.form.action.Delete} />
                </ActionButton>
              </div>
            </Section>
          </Match>
        </Switch>
      </Page>

      <Show when={showEditOffer()}>
        <EditOfferDialog
          offer={() => offer()!}
          onClose={handleCloseEditOffer}
          onUpdate={handleRefreshOffer}
        />
      </Show>

      <Show when={showAddImage()}>
        <CreateOfferImageDialog
          offerId={offer()!.offerId}
          lastOrdering={lastImageOrdering()}
          onClose={handleCloseAddImage}
          onUpdate={handleRefreshOffer}
        />
      </Show>

      <Show when={showDeleteConfirmation()}>
        <DeleteConfirmation
          item={trans(TKEYS.offer.title)}
          itemName={offer()?.name}
          onCancel={handleDiscardDeletion}
          onConfirmation={handleConfirmDeleteion}
        />
      </Show>
    </>
  );
}
