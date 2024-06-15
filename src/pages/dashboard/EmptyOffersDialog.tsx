import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";

import { MdButton } from "../../components/form";
import { MdDialog } from "../../components/layout/MdDialog";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { buildShopDashboardPath } from "../../routes/main/main-routing";
import { ShopResponse } from "../../services/sited_io/commerce/v1/shop";
import commonStyles from "./Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly show: boolean | undefined;
  readonly onClose: () => void;
  readonly onPublish: () => void;
};

export function EmptyOffersDialog(props: Props) {
  const { shopService } = useServiceClientContext();

  function dashboardPath() {
    if (!_.isNil(props.shop)) {
      return buildShopDashboardPath(props.shop.shopId);
    }
    return "#";
  }

  async function handlePublishShop() {
    if (!_.isNil(props.shop)) {
      await shopService.update({
        shopId: props.shop?.shopId,
        isActive: true,
      });
    }
    props.onPublish();
  }

  function handleCloseDialog() {
    props.onClose();
  }

  return (
    <MdDialog open={props.show} onClose={handleCloseDialog}>
      <div slot="headline">
        <span>
          <Trans key={TKEYS.dashboard.shop["empty-offers-warning-title"]} />
        </span>
      </div>
      <div slot="content">
        <span class={commonStyles.Details}>
          <Trans key={TKEYS.dashboard.shop["empty-offers-warning-content"]} />{" "}
          <A class={commonStyles.Link} href={dashboardPath()}>
            <Trans key={TKEYS.dashboard.offers["create-your-first-offer"]} />
          </A>
        </span>
      </div>
      <div slot="actions">
        <MdButton type="outlined" onClick={handleCloseDialog}>
          <Trans key={TKEYS.form.action.Cancel} />
        </MdButton>
        <MdButton type="outlined" onClick={handlePublishShop}>
          <Trans key={TKEYS.dashboard.shop.visibility["publish-anyway"]} />
        </MdButton>
      </div>
    </MdDialog>
  );
}
