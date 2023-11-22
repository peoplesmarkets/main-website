import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useLocation, useNavigate, useParams } from "@solidjs/router";
import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { Anotation, Font, Multiline } from "../../../components/content";
import { ActionButton, MdButton } from "../../../components/form";
import { ConfirmationDialog } from "../../../components/form/ConfirmationDialog";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { useSelectedShopContext } from "../../../contexts/ShopContext";
import { requireAuthentication } from "../../../guards/authentication";
import { secondsToLocaleDateTime } from "../../../lib";
import { TKEYS } from "../../../locales";
import {
  buildDashboardPath,
  buildShopDashboardPath,
  buildShopSettingsPath,
} from "../../../routes/main-routing";
import { OfferType } from "../../../services/peoplesmarkets/commerce/v1/offer";
import { OfferPrice } from "../../OfferPrice";
import { CreateOfferImageDialog } from "./CreateOfferImageDialog";
import { EditOfferDetailsDialog } from "./EditOfferDetailsDialog";
import { EditOfferPriceDialog } from "./EditOfferPriceDialog";
import { EditOfferShippingRatesDialog } from "./EditOfferShippingRatesDialog";
import { MediaSettings } from "./MediaSettings";
import { OfferImages } from "./OfferImages";
import styles from "./Page.module.scss";

type DIALOG =
  | "none"
  | "delete"
  | "delete-confirmation"
  | "edit-offer"
  | "add-image"
  | "edit-price"
  | "edit-shipping-rates"
  | "make-visible"
  | "shop-not-public"
  | "make-not-visible";

export default function OfferDetailConfigurationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const { shopService, offerService } = useServiceClientContext();

  const { selectedShopId } = useSelectedShopContext();

  const [showDialog, setShowDialog] = createSignal<DIALOG>("none");

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [shop] = createResource(selectedShopId, async (shopId: string) => {
    return shopService.get(shopId).then((res) => res.shop);
  });

  const [offer, { refetch }] = createResource(
    () => useParams().offerId,
    fetchOffer
  );

  async function fetchOffer(offerId: string) {
    const response = await offerService.get(offerId);
    return response.offer;
  }

  function loaded() {
    return authenticated();
  }

  function shopSettingsPath() {
    const shopId = shop()?.shopId;
    if (!_.isNil(shopId)) {
      return buildShopSettingsPath(shopId);
    }
    return "#";
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
    setShowDialog("delete-confirmation");
  }

  function handleStartPublish() {
    if (shop()?.isActive) {
      handleOpenDialog("make-visible");
    } else {
      handleOpenDialog("shop-not-public");
    }
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
    handleCloseDialog();
    const shopId = offer()?.shopId;
    if (!_.isNil(shopId)) {
      navigate(buildShopDashboardPath(shopId), { replace: true });
    } else {
      navigate(buildDashboardPath(), { replace: true });
    }
  }

  return (
    <>
      <DefaultBoundary loaded={loaded}>
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
          <Font type="headline">{offer()?.name}</Font>
        </Section>

        <Show when={!_.isNil(offer()?.price)}>
          <Section>
            <OfferPrice offer={offer()} />

            <Show when={offer()?.type == OfferType.OFFER_TYPE_DIGITAL}>
              <Anotation active end>
                <Trans key={TKEYS.offer["downloadable-content"]} />
              </Anotation>
            </Show>
          </Section>
        </Show>

        <Section>
          <Font type="label" key={TKEYS.offer.labels.Description} />

          <Show
            when={!_.isEmpty(offer()?.description)}
            fallback={<Font type="body" key={TKEYS.offer["no-description"]} />}
          >
            <Multiline text={offer()?.description} />
          </Show>
        </Section>

        <Section>
          <Font type="label" key={TKEYS.dashboard.offers.Details} />

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
          <MediaSettings offer={offer()} />
        </Show>

        <Section bordered>
          <Font type="title" key={TKEYS.form.action.Edit} />

          <div class={styles.EditSection}>
            <Font type="body" key={TKEYS.dashboard.offers["edit-offer"]} />

            <ActionButton
              actionType="neutral"
              onClick={() => handleOpenDialog("edit-offer")}
            >
              <Trans key={TKEYS.form.action.Edit} />
            </ActionButton>
          </div>

          <div class={styles.EditSection}>
            <Font type="body" key={TKEYS.dashboard.offers["add-image"]} />

            <ActionButton
              actionType="neutral"
              onClick={() => handleOpenDialog("add-image")}
            >
              <Trans key={TKEYS.form.action.Edit} />
            </ActionButton>
          </div>

          <div class={styles.EditSection}>
            <Font type="body" key={TKEYS.dashboard.offers["edit-price"]} />

            <ActionButton
              actionType="neutral"
              onClick={() => handleOpenDialog("edit-price")}
            >
              <Trans key={TKEYS.form.action.Edit} />
            </ActionButton>
          </div>

          <div class={styles.EditSection}>
            <Font
              type="body"
              key={TKEYS.dashboard["shipping-rate"]["shipping-rates"]}
            />

            <ActionButton
              actionType="neutral"
              onClick={() => handleOpenDialog("edit-shipping-rates")}
            >
              <Trans key={TKEYS.form.action.Edit} />
            </ActionButton>
          </div>

          <Show when={!_.isNil(offer()?.isActive) && !offer()?.isActive}>
            <div class={styles.EditSection}>
              <Font
                type="body"
                key={TKEYS.dashboard.offers["public-visibility"]}
              />

              <ActionButton
                actionType="active-filled"
                onClick={handleStartPublish}
              >
                <Trans key={TKEYS.form.action.Publish} />
              </ActionButton>
            </div>
          </Show>
        </Section>

        <Section danger>
          <Font type="title" key={TKEYS.form["critical-settings"]} />

          <Show when={!_.isNil(offer()?.isActive) && offer()?.isActive}>
            <div class={styles.EditSection}>
              <Font
                type="body"
                key={TKEYS.dashboard.offers["public-visibility"]}
              />

              <ActionButton
                actionType="danger"
                onClick={() => handleOpenDialog("make-not-visible")}
              >
                <Trans key={TKEYS.form.action.Hide} />
              </ActionButton>
            </div>
          </Show>

          <div class={styles.EditSection}>
            <Font
              type="body"
              key={TKEYS.dashboard.offers["delete-this-offer"]}
            />

            <ActionButton actionType="danger" onClick={handleStartDeletion}>
              <Trans key={TKEYS.form.action.Delete} />
            </ActionButton>
          </div>
        </Section>
      </DefaultBoundary>

      <EditOfferDetailsDialog
        show={showDialog() === "edit-offer"}
        offer={offer()}
        onClose={handleCloseDialog}
        onUpdate={handleRefreshOffer}
      />

      <CreateOfferImageDialog
        show={showDialog() === "add-image"}
        offerId={offer()?.offerId}
        lastOrdering={lastImageOrdering()}
        onClose={handleCloseDialog}
        onUpdate={handleRefreshOffer}
      />

      <EditOfferPriceDialog
        show={showDialog() === "edit-price"}
        offer={offer()}
        onClose={handleCloseDialog}
        onUpdate={handleRefreshOffer}
      />

      <EditOfferShippingRatesDialog
        show={showDialog() === "edit-shipping-rates"}
        offer={offer()}
        onClose={handleCloseDialog}
      />

      <ConfirmationDialog
        show={showDialog() === "make-visible"}
        actionType="active-filled"
        title={trans(TKEYS.dashboard.offers["publish-notification-title"])}
        message={trans(TKEYS.dashboard.offers["publish-notification-message"])}
        onCancel={handleCloseDialog}
        onOk={() => handleVisibility(true)}
      />

      <MdDialog
        open={showDialog() === "shop-not-public"}
        onClose={handleCloseDialog}
      >
        <div slot="headline">
          <Font
            type="title"
            key={TKEYS.dashboard.offers["shop-not-public-title"]}
          />
        </div>
        <div slot="content">
          <Font
            type="body"
            key={TKEYS.dashboard.offers["shop-not-public-message"]}
          />
        </div>
        <div slot="actions">
          <MdButton type="outlined" href={shopSettingsPath()}>
            <Trans key={TKEYS.dashboard.offers["go-to-shop-settings"]} />
          </MdButton>
          <MdButton onClick={() => handleVisibility(true)}>
            <Trans key={TKEYS.dashboard.shop.visibility["publish-anyway"]} />
          </MdButton>
        </div>
      </MdDialog>

      <ConfirmationDialog
        show={showDialog() === "make-not-visible"}
        actionType="danger"
        title={trans(TKEYS.dashboard.offers["unpublish-notification-title"])}
        message={trans(
          TKEYS.dashboard.offers["unpublish-notification-message"]
        )}
        onCancel={handleCloseDialog}
        onOk={() => handleVisibility(false)}
      />

      <DeleteConfirmationDialog
        show={showDialog() === "delete-confirmation"}
        item={trans(TKEYS.offer.title)}
        itemName={offer()?.name}
        onCancel={handleCloseDialog}
        onConfirmation={handleConfirmDeletion}
      />
    </>
  );
}
