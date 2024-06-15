import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { MdSelect, SelectKey } from "../../../components/form/MdSelect";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import { listShopLayoutTypeCodes } from "../../../services";
import { ShopResponse } from "../../../services/sited_io/commerce/v1/shop";
import { PutShopCustomizationRequest } from "../../../services/sited_io/commerce/v1/shop_customization";
import commonStyles from "../Common.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function LayoutSelection(props: Props) {
  const [trans] = useTransContext();

  const { shopCustomizationService } = useServiceClientContext();

  const [request, setRequest] = createStore({
    shopId: undefined as string | undefined,
    layoutType: 1,
    primaryColor: undefined as string | undefined,
  });

  createEffect(() => {
    if (_.isNil(request.shopId) && !_.isNil(props.shop)) {
      setRequest("shopId", props.shop.shopId);
      if (!_.isNil(props.shop.customization)) {
        setRequest("layoutType", props.shop.customization.layoutType);
        setRequest("primaryColor", props.shop.customization.primaryColor);
      }
    }
  });

  function shopLayoutTypeOptions() {
    return listShopLayoutTypeCodes().map((t) => ({
      name: trans(TKEYS["shop-customization"]["layout-types"][t]),
      key: t,
    }));
  }

  function layoutTypeHasChanged() {
    return request.layoutType !== props.shop?.customization?.layoutType;
  }

  function handleLayoutTypeSelected(key: SelectKey) {
    if (_.isNumber(key)) {
      setRequest("layoutType", key);
    } else if (_.isString(key)) {
      setRequest("layoutType", _.parseInt(key));
    }
  }

  async function handleSave() {
    if (!_.isNil(request.shopId)) {
      const req = PutShopCustomizationRequest.create(request);
      await shopCustomizationService.put(req);
      props.onUpdate();
    }
  }

  return (
    <>
      <div class={commonStyles.Fields}>
        <div class={commonStyles.FieldInfo}>
          <Font
            type="headline"
            class={commonStyles.Headline}
            key={TKEYS["shop-customization"].labels.Layout}
          />

          <Font type="body" key={TKEYS["shop-customization"]["layout-info"]} />
        </div>

        <div class={commonStyles.Field}>
          <MdSelect
            type="outlined"
            style={{ "min-width": "100%" }}
            options={shopLayoutTypeOptions()}
            selected={request.layoutType}
            onChange={handleLayoutTypeSelected}
          />

          <Font
            class={commonStyles.Details}
            type="body"
            key={
              TKEYS["shop-customization"]["layout-type-info"][
                request.layoutType
              ]
            }
          />
        </div>
      </div>

      <div class={commonStyles.Actions}>
        <div class={commonStyles.ActionsLeft} />

        <div class={commonStyles.ActionsRight}>
          <ActionButton
            actionType="active-filled"
            round
            disabled={!layoutTypeHasChanged()}
            onClick={handleSave}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </div>
    </>
  );
}
