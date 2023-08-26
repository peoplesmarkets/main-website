import {
  For,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import styles from "./OfferSettings.module.scss";
import { CreateOfferDialog } from "./CreateOfferDialog";
import { Section } from "../layout/Section";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { ActionButton, DeleteConfirmation } from "../form";
import { TKEYS } from "../../locales/dev";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { OfferService } from "../../services";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import _ from "lodash";
import { EditOfferDialog } from "./EditOfferDialog";
import { A } from "@solidjs/router";
import { DASHBOARD_PATH, OFFERS_SUBPATH, buildPath } from "../../App";
import { ContentError, ContentLoading, isResolved } from "../content";

type Props = {
  readonly marketBooth: () => MarketBoothResponse;
};

export function OfferSettings(props: Props) {
  const [trans] = useTransContext();

  const { accessToken, currentSession } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offers, { refetch }] = createResource(fetchOffers);

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);
  const [showEditOffer, setShowEditOffer] = createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);
  const [selectedOffer, setSelectedOffer] = createSignal<OfferResponse>();

  onMount(async () => {
    await refreshOffers();
  });

  async function fetchOffers() {
    const response = await offerService.list(
      currentSession().userId,
      props.marketBooth().marketBoothId
    );

    return response.offers;
  }

  async function refreshOffers() {
    refetch();
  }

  function handleOpenCreateOffer() {
    setShowCreateOffer(true);
  }

  function handleCloseCreateOffer() {
    setShowCreateOffer(false);
  }

  function handleOpenEditOffer(offer: OfferResponse) {
    setSelectedOffer(offer);
    setShowEditOffer(true);
  }

  function handleCloseEditOffer() {
    setShowEditOffer(false);
  }

  function startDeletetion(offer: OfferResponse) {
    setSelectedOffer(offer);
    setShowDeleteConfirmation(true);
  }

  function discardDeletion() {
    setSelectedOffer(undefined);
    setShowDeleteConfirmation(false);
  }

  async function confirmDeleteion() {
    if (!_.isNil(selectedOffer())) {
      await offerService.delete(selectedOffer()!.offerId);
    }
    setShowDeleteConfirmation(false);
    refreshOffers();
  }

  return (
    <>
      <Section>
        <span class={styles.Title}>
          <Trans key={TKEYS.dashboard.offers["title-plural"]} />
        </span>

        <Switch>
          <Match when={offers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offers.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offers.state)}>
            <div class={styles.Table}>
              <For each={offers()}>
                {(offer) => (
                  <div class={styles.Row}>
                    <A
                      class={styles.Name}
                      href={buildPath(
                        DASHBOARD_PATH,
                        props.marketBooth().marketBoothId,
                        OFFERS_SUBPATH,
                        offer.offerId
                      )}
                    >
                      {offer.name}
                    </A>

                    <div class={styles.Actions}>
                      <ActionButton
                        actionType="neutral"
                        onClick={() => handleOpenEditOffer(offer)}
                      >
                        <Trans key={TKEYS.form.action.Edit} />
                      </ActionButton>

                      <ActionButton
                        actionType="danger"
                        onClick={() => startDeletetion(offer)}
                      >
                        <Trans key={TKEYS.form.action.Delete} />
                      </ActionButton>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </Match>
        </Switch>

        <div class={styles.TableActions}>
          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateOffer}
          >
            <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
          </ActionButton>
        </div>
      </Section>

      <Show when={showCreateOffer()}>
        <CreateOfferDialog
          marketBoothId={props.marketBooth().marketBoothId}
          onClose={handleCloseCreateOffer}
          onUpdate={refreshOffers}
        />
      </Show>

      <Show when={showEditOffer() && selectedOffer()}>
        <EditOfferDialog
          offer={() => selectedOffer()!}
          onClose={handleCloseEditOffer}
          onUpdate={refreshOffers}
        />
      </Show>

      <DeleteConfirmation
        item={trans(TKEYS.dashboard.offers.title)}
        itemName={selectedOffer()?.name}
        onCancel={discardDeletion}
        onConfirmation={confirmDeleteion}
        showSignal={showDeleteConfirmation()}
      />
    </>
  );
}