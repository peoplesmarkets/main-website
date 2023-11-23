import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";

import { Font } from "../../components/content";
import { ActionButton } from "../../components/form";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly show: boolean;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};
export function UnpublishShopDialog(props: Props) {
  const { shopService } = useServiceClientContext();

  async function handleUnpublishShop() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId) && !_.isEmpty(shopId)) {
      await shopService.update({
        shopId,
        isActive: false,
      });
      props.onUpdate();
    }
  }

  return (
    <MdDialog open={props.show} onClose={props.onClose}>
      <div slot="headline">
        <Font
          type="title"
          key={TKEYS.dashboard.shop.visibility["unpublish-notification-title"]}
        />
      </div>
      <div slot="content">
        <Font
          type="body"
          key={
            TKEYS.dashboard.shop.visibility["unpublish-notification-message"]
          }
        />
      </div>
      <div slot="actions">
        <ActionButton actionType="neutral" onClick={props.onClose}>
          <Trans key={TKEYS.form.action.Close} />
        </ActionButton>
        <ActionButton actionType="danger" onClick={handleUnpublishShop}>
          <Trans key={TKEYS.dashboard.shop.visibility["hide-this-shop"]} />
        </ActionButton>
      </div>
    </MdDialog>
  );
}
