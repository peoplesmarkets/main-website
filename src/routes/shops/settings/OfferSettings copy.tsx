import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";

import { OfferImages, OfferPrice } from "../../../components/commerce";
import {
  Anotation,
  ContentError,
  Multiline,
} from "../../../components/content";
import {
  CreateOfferImageDialog,
  EditOfferDialog,
  MediaSettings,
} from "../../../components/dashboard";
import { ActionButton, DeleteConfirmation } from "../../../components/form";
import { ConfirmationDialog } from "../../../components/form/ConfirmationDialog";
import { Cover, Section } from "../../../components/layout";
import { EditOfferShippingRatesDialog } from "../../../components/shops/settings";
import { EditOfferPriceDialog } from "../../../components/shops/settings/EditOfferPriceDialog";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication } from "../../../guards/authentication";
import { resourceIsReady, secondsToLocaleDateTime } from "../../../lib";
import { TKEYS } from "../../../locales";
import { OfferType } from "../../../services/peoplesmarkets/commerce/v1/offer";
import { buildDashboardPath } from "../../main-routing";
import { buildShopSettingsPath } from "../shop-routing";
import styles from "./OfferSettings.module.scss";

type DIALOG =
  | "none"
  | "delete"
  | "edit-offer"
  | "add-image"
  | "edit-price"
  | "edit-shipping-rates"
  | "make-visible"
  | "make-not-visible";

export default function OfferSettings() {
  const location = useLocation();
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { currentSession, isAuthenticated } = useAccessTokensContext();

  const { offerService } = useServiceClientContext();

  const [owned, setOwned] = createSignal(false);
  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  const [offer, { refetch }] = createResource(
    () => useParams().offerId,
    fetchOffer
  );

  createEffect(() => {
    if (!isAuthenticated()) {
      requireAuthentication(location.pathname);
      return;
    }

    if (!_.isNil(offer.error)) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    if (!resourceIsReady(offer)) {
      return;
    }

    if (currentSession().userId !== offer()?.userId) {
      navigate(buildDashboardPath(), { replace: true });
      return;
    }

    setOwned(true);
  });

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  function lastImageOrdering() {
    return _.max(offer()?.images?.map((i) => i.ordering)) || 0;
  }

  function handleOpenDialog(dialog: DIALOG) {
    setShowDialog(dialog);
  }

  function handleCloseDialog() {
    setShowDialog("none");
  }

  function handleRefreshOffer() {
    refetch();
  }

  function handleStartDeletion() {
    setShowDeleteConfirmation(true);
  }

  function handleDiscardDeletion() {
    setShowDeleteConfirmation(false);
  }

  async function handleVisibility(isActive: boolean) {
    const offerId = offer()?.offerId;
    if (!_.isNil(offerId) && !_.isEmpty(offerId)) {
      await offerService.update({
        offerId,
        isActive,
      });
      handleRefreshOffer();
      handleCloseDialog();
    }
  }

  async function handleConfirmDeletion() {
    if (!_.isNil(offer())) {
      await offerService.delete(offer()!.offerId);
    }
    setShowDeleteConfirmation(false);
    const shopSlug = offer()?.shopSlug;
    if (!_.isNil(shopSlug)) {
      navigate(buildShopSettingsPath(shopSlug), { replace: true });
    } else {
      navigate(buildDashboardPath(), { replace: true });
    }
  }

  return (
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Show when={owned()} fallback={<Cover />}>
          <Section>
            <Show when={!_.isNil(offer()) && !_.isEmpty(offer()?.images)}>
              <OfferImages
                offer={() => offer()!}
                onUpdate={handleRefreshOffer}
                withDelete
              />
            </Show>
          </Section>

          <Section flat>
            <span class={styles.Title}>{offer()?.name}</span>
          </Section>

          <Show when={!_.isNil(offer()?.price)}>
            <Section>
              <OfferPrice offer={() => offer()} />

              <Show when={offer()?.type == OfferType.OFFER_TYPE_DIGITAL}>
                <Anotation active end>
                  <Trans key={TKEYS.offer["downloadable-content"]} />
                </Anotation>
              </Show>
            </Section>
          </Show>

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
              <Multiline text={offer()?.description} />
            </Show>
          </Section>

          <Section>
            <span class={styles.Label}>
              <Trans key={TKEYS.dashboard.offers.Details} />:
            </span>

            <span class={styles.Details}>
              <Trans key={TKEYS.offer.visibility.title} />:{" "}
              <Show
                when={!offer()?.isActive}
                fallback={
                  <span class={styles.Active}>
                    <Trans key={TKEYS.offer.visibility.visible} />
                  </span>
                }
              >
                <span class={styles.Warning}>
                  <Trans key={TKEYS.offer.visibility["not-visible"]} />
                </span>
              </Show>
            </span>

            <span class={styles.Details}>
              <Trans key={TKEYS.offer.labels["Created-at"]} />:{" "}
              {secondsToLocaleDateTime(offer()?.createdAt)}
            </span>

            <span class={styles.Details}>
              <Trans key={TKEYS.offer.labels["Updated-at"]} />:{" "}
              {secondsToLocaleDateTime(offer()?.updatedAt)}
            </span>
          </Section>

          <Show when={offer()?.type === OfferType.OFFER_TYPE_DIGITAL}>
            <MediaSettings offer={() => offer()!} />
          </Show>

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
                onClick={() => handleOpenDialog("edit-offer")}
              >
                <Trans key={TKEYS.form.action.Edit} />
              </ActionButton>
            </div>

            <div class={styles.EditSection}>
              <p class={styles.Body}>
                <Trans key={TKEYS.dashboard.offers["add-image"]} />
              </p>
              <ActionButton
                actionType="neutral"
                onClick={() => handleOpenDialog("add-image")}
              >
                <Trans key={TKEYS.form.action.Edit} />
              </ActionButton>
            </div>

            <div class={styles.EditSection}>
              <p class={styles.Body}>
                <Trans key={TKEYS.dashboard.offers["edit-price"]} />
              </p>
              <ActionButton
                actionType="neutral"
                onClick={() => handleOpenDialog("edit-price")}
              >
                <Trans key={TKEYS.form.action.Edit} />
              </ActionButton>
            </div>

            <div class={styles.EditSection}>
              <p class={styles.Body}>
                <Trans
                  key={TKEYS.dashboard["shipping-rate"]["shipping-rates"]}
                />
              </p>
              <ActionButton
                actionType="neutral"
                onClick={() => handleOpenDialog("edit-shipping-rates")}
              >
                <Trans key={TKEYS.form.action.Edit} />
              </ActionButton>
            </div>

            <Show when={!_.isNil(offer()?.isActive) && !offer()?.isActive}>
              <div class={styles.EditSection}>
                <p class={styles.Body}>
                  <Trans key={TKEYS.dashboard.offers["public-visibility"]} />
                </p>
                <ActionButton
                  actionType="active"
                  onClick={() => handleOpenDialog("make-visible")}
                >
                  <Trans key={TKEYS.form.action.Publish} />
                </ActionButton>
              </div>
            </Show>
          </Section>

          <Section danger>
            <span class={styles.Label}>
              <Trans key={TKEYS.form["critical-settings"]} />
            </span>

            <Show when={!_.isNil(offer()?.isActive) && offer()?.isActive}>
              <div class={styles.EditSection}>
                <p class={styles.Body}>
                  <Trans key={TKEYS.dashboard.offers["public-visibility"]} />
                </p>
                <ActionButton
                  actionType="danger"
                  onClick={() => handleOpenDialog("make-not-visible")}
                >
                  <Trans key={TKEYS.form.action.Hide} />
                </ActionButton>
              </div>
            </Show>

            <div class={styles.EditSection}>
              <p class={styles.Body}>
                <Trans key={TKEYS.dashboard.offers["delete-this-offer"]} />
              </p>
              <ActionButton actionType="danger" onClick={handleStartDeletion}>
                <Trans key={TKEYS.form.action.Delete} />
              </ActionButton>
            </div>
          </Section>

          <Show when={showDialog() === "edit-offer"}>
            <EditOfferDialog
              offer={() => offer()!}
              onClose={handleCloseDialog}
              onUpdate={handleRefreshOffer}
            />
          </Show>

          <Show when={showDialog() === "add-image"}>
            <CreateOfferImageDialog
              offerId={offer()!.offerId}
              lastOrdering={lastImageOrdering()}
              onClose={handleCloseDialog}
              onUpdate={handleRefreshOffer}
            />
          </Show>

          <Show when={showDialog() === "edit-price"}>
            <EditOfferPriceDialog
              offer={() => offer()!}
              onClose={handleCloseDialog}
              onUpdate={handleRefreshOffer}
            />
          </Show>

          <Show when={showDialog() === "edit-shipping-rates"}>
            <EditOfferShippingRatesDialog
              offer={() => offer()!}
              onClose={handleCloseDialog}
              onUpdate={handleRefreshOffer}
            />
          </Show>

          <Show when={showDialog() === "make-visible"}>
            <ConfirmationDialog
              actionType="active"
              title={trans(
                TKEYS.dashboard.offers["publish-notification-title"]
              )}
              message={trans(
                TKEYS.dashboard.offers["publish-notification-message"]
              )}
              onCancel={handleCloseDialog}
              onOk={() => handleVisibility(true)}
            />
          </Show>
          <Show when={showDialog() === "make-not-visible"}>
            <ConfirmationDialog
              actionType="danger"
              title={trans(
                TKEYS.dashboard.offers["unpublish-notification-title"]
              )}
              message={trans(
                TKEYS.dashboard.offers["unpublish-notification-message"]
              )}
              onCancel={handleCloseDialog}
              onOk={() => handleVisibility(false)}
            />
          </Show>

          <Show when={showDeleteConfirmation()}>
            <DeleteConfirmation
              item={trans(TKEYS.offer.title)}
              itemName={offer()?.name}
              onCancel={handleDiscardDeletion}
              onConfirmation={handleConfirmDeletion}
            />
          </Show>
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
