import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
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
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "./Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly show: boolean;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function PublishShopDialog(props: Props) {
  const { shopService } = useServiceClientContext();

  const [acceptTos, setAcceptTos] = createSignal(false);

  function handleAcceptTos(value: boolean) {
    setAcceptTos(value);
  }

  async function handlePublishShop() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId) && !_.isEmpty(shopId)) {
      await shopService.update({
        shopId,
        isActive: true,
      });
      props.onUpdate();
    }
  }

  function resetAcceptTos() {
    setAcceptTos(false);
  }

  function handleClose() {
    resetAcceptTos();
    props.onClose();
  }

  return (
    <MdDialog open={props.show} onClose={handleClose}>
      <div slot="headline">
        <Font
          type="title"
          key={TKEYS.dashboard.shop.visibility["publish-notification-title"]}
        />
      </div>

      <div slot="content">
        <div class={commonStyles.FormSet}>
          <div class={commonStyles.Fields}>
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

            <div class={commonStyles.FieldRow}>
              <MdCheckbox checked={acceptTos()} onValue={handleAcceptTos}>
                <Font
                  type="label"
                  key={TKEYS["terms-of-service"]["accept-tos"]}
                />
              </MdCheckbox>
            </div>
          </div>
        </div>
      </div>

      <div slot="actions">
        <ActionButton actionType="neutral" onClick={handleClose}>
          <Trans key={TKEYS.form.action.Close} />
        </ActionButton>

        <ActionButton
          actionType="active-filled"
          onClick={handlePublishShop}
          disabled={!acceptTos()}
        >
          <Trans key={TKEYS.dashboard.shop.visibility["publish-shop"]} />
        </ActionButton>
      </div>
    </MdDialog>
  );
}
