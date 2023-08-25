import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { DASHBOARD_PATH, buildPath } from "../../App";
import { EditOfferDialog } from "../../components/commerce/EditOfferDialog";
import { Multiline } from "../../components/content/Multiline";
import { ActionButton, DeleteConfirmation } from "../../components/form";
import { Page } from "../../components/layout/Page";
import { Section } from "../../components/layout/Section";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { secondsToLocaleString } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import styles from "./Offers.module.scss";

export default function Offers() {
  const { marketBoothId, offerId } = useParams();
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offer, { refetch }] = createResource(offerId, fetchOffer);

  const [showEditOffer, setShowEditOffer] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);

    return response.offer;
  }

  function refreshOffer() {
    refetch();
  }

  function handleOpenEditOffer() {
    setShowEditOffer(true);
  }

  function handleCloseEditOffer() {
    setShowEditOffer(false);
  }

  function startDeletetion() {
    setShowDeleteConfirmation(true);
  }

  function discardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function confirmDeleteion() {
    if (!_.isNil(offer())) {
      await offerService.delete(offer()!.offerId);
    }
    setShowDeleteConfirmation(false);
    navigate(buildPath(DASHBOARD_PATH, marketBoothId));
  }

  return (
    <>
      <Page>
        <Show
          when={offer.state == "ready" && !_.isNil(offer())}
          fallback={
            <p>
              <Trans key={TKEYS.fetching["content-loading"]} />
            </p>
          }
        >
          <span class={styles.Title}>{offer()?.name}</span>

          <Section>
            <span class={styles.Label}>
              <Trans key={TKEYS.dashboard.offers.labels.Description} />:
            </span>
            <Show
              when={!_.isEmpty(offer()?.description)}
              fallback={
                <span class={styles.Details}>
                  <Trans key={TKEYS.dashboard.offers["no-offer-description"]} />
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
              <Trans key={TKEYS.dashboard.offers.labels["Created-at"]} />:{" "}
              {secondsToLocaleString(offer()?.createdAt)}
            </span>

            <span class={styles.Details}>
              <Trans key={TKEYS.dashboard.offers.labels["Updated-at"]} />:{" "}
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
              <ActionButton actionType="neutral" onClick={handleOpenEditOffer}>
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
              <ActionButton actionType="danger" onClick={startDeletetion}>
                <Trans key={TKEYS.form.action.Delete} />
              </ActionButton>
            </div>
          </Section>
        </Show>
      </Page>

      <Show when={showEditOffer()}>
        <EditOfferDialog
          offer={() => offer()!}
          onClose={handleCloseEditOffer}
          onUpdate={refreshOffer}
        />
      </Show>

      <DeleteConfirmation
        item={trans(TKEYS.dashboard.offers.title)}
        itemName={offer()?.name}
        onCancel={discardDeletion}
        onConfirmation={confirmDeleteion}
        showSignal={showDeleteConfirmation()}
      />
    </>
  );
}
