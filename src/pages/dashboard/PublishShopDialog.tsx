import { Trans } from "@mbarzda/solid-i18next";
import { A, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { createSignal } from "solid-js";

import { Font } from "../../components/content";
import { ActionButton } from "../../components/form";
import { MdCheckbox } from "../../components/form/MdCheckbox";
import { OpenInNewIcon } from "../../components/icons";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { buildTermsOfServicePathOrUrl } from "../../routes/info/info-routing";
import { buildShopDashboardPath } from "../../routes/main-routing";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "./Common.module.scss";
import { EmptyOffersDialog } from "./EmptyOffersDialog";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly show: boolean | undefined;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function PublishShopDialog(props: Props) {
  const navigate = useNavigate();

  const { shopService, offerService } = useServiceClientContext();

  const [acceptTos, setAcceptTos] = createSignal(false);
  const [showEmptyOffersDialog, setShowEmptyOffersDialog] = createSignal(false);

  function handleAcceptTos(value: boolean) {
    setAcceptTos(value);
  }

  function resetAcceptTos() {
    setAcceptTos(false);
  }

  async function handleStartPublish() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId)) {
      const offersResponse = await offerService.list({
        shopId,
      });

      if (_.isEmpty(offersResponse.offers)) {
        setShowEmptyOffersDialog(true);
      } else {
        await handlePublish();
      }
    }
  }

  async function handlePublish() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId)) {
      await shopService.update({ shopId, isActive: true });
      navigate(buildShopDashboardPath(shopId));
    }
  }

  function handleDialogWasClosed() {
    props.onClose();
  }

  function handleClose() {
    resetAcceptTos();
    setShowEmptyOffersDialog(false);
    props.onClose();
  }

  return (
    <>
      <MdDialog
        open={!showEmptyOffersDialog() && props.show}
        onClose={handleDialogWasClosed}
      >
        <div slot="headline">
          <Font
            type="title"
            key={TKEYS.dashboard.shop.visibility["publish-notification-title"]}
          />
        </div>

        <div slot="content">
          <div class={commonStyles.Form}>
            <div class={commonStyles.Field}>
              <Font type="body">
                <Trans
                  key={
                    TKEYS.dashboard.shop.visibility[
                      "publish-notification-message-left"
                    ]
                  }
                />{" "}
                <A
                  class={commonStyles.Link}
                  href={buildTermsOfServicePathOrUrl()}
                  target="_blank"
                >
                  <Trans key={TKEYS["terms-of-service"].title} />{" "}
                  <OpenInNewIcon class={commonStyles.OpenInNewIcon} />
                </A>{" "}
                <Trans
                  key={
                    TKEYS.dashboard.shop.visibility[
                      "publish-notification-message-right"
                    ]
                  }
                />
              </Font>
            </div>

            <div class={commonStyles.Field}>
              <MdCheckbox checked={acceptTos()} onValue={handleAcceptTos}>
                <Font
                  type="label"
                  key={TKEYS["terms-of-service"]["accept-tos"]}
                />
              </MdCheckbox>
            </div>
          </div>
        </div>

        <div slot="actions">
          <ActionButton actionType="neutral" onClick={handleClose}>
            <Trans key={TKEYS.form.action.Close} />
          </ActionButton>

          <ActionButton
            actionType="active-filled"
            onClick={handleStartPublish}
            disabled={!acceptTos()}
          >
            <Trans key={TKEYS.dashboard.shop.visibility["publish-shop"]} />
          </ActionButton>
        </div>
      </MdDialog>

      <EmptyOffersDialog
        shop={props.shop}
        show={showEmptyOffersDialog()}
        onClose={handleClose}
        onPublish={handlePublish}
      />
    </>
  );
}
