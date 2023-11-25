import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Font } from "../../../components/content";
import { LinkButton } from "../../../components/form/LinkButton";
import { TKEYS } from "../../../locales";
import { buildShopConfigurationPath } from "../../../routes/main/main-routing";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
};

export function UpdateConfigurationForm(props: Props) {
  function shopConfigurationPath() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId)) {
      return buildShopConfigurationPath(shopId);
    }
    return "#";
  }

  return (
    <>
      <form class={commonStyles.Form}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.shop.configuration.title}
        />

        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <Font type="body" key={TKEYS.shop.configuration.info} />
          </div>

          <LinkButton
            actionType="active"
            tall
            wide
            href={shopConfigurationPath()}
          >
            <Trans key={TKEYS.dashboard.shop["configure-shop"]} />
          </LinkButton>
        </div>
      </form>
    </>
  );
}
