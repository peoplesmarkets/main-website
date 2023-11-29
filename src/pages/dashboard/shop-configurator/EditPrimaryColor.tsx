import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import {
  PutShopCustomizationRequest,
  ShopLayoutType,
} from "../../../services/peoplesmarkets/commerce/v1/shop_customization";
import commonStyles from "../Common.module.scss";
import styles from "./EditPrimaryColor.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function EditPrimaryColor(props: Props) {
  const { shopCustomizationService } = useServiceClientContext();

  const [request, setRequest] = createStore({
    shopId: undefined as string | undefined,
    layoutType: undefined as ShopLayoutType | undefined,
    primaryColor: undefined as string | undefined,
  });

  createEffect(() => {
    if (
      _.isNil(request.shopId) &&
      !_.isNil(props.shop) &&
      !_.isNil(props.shop.customization)
    ) {
      setRequest("shopId", props.shop.shopId);
      setRequest("layoutType", props.shop.customization.layoutType);

      if (!_.isNil(props.shop.customization.primaryColor)) {
        setRequest("primaryColor", props.shop.customization.primaryColor);
      }
    }
  });

  function dataHasChanged() {
    return props.shop?.customization?.primaryColor !== request.primaryColor;
  }

  function handleColorChange(color: string) {
    setRequest("primaryColor", color);
  }

  async function handleSave() {
    if (!_.isNil(request.shopId) && !_.isNil(props.shop?.customization)) {
      const req = PutShopCustomizationRequest.create({
        ...request,
        layoutType: props.shop?.customization.layoutType,
      });

      await shopCustomizationService.put(req);

      props.onUpdate();
    }
  }

  async function handleRemove() {
    if (!_.isNil(request.shopId)) {
      const req = PutShopCustomizationRequest.create({
        ...request,
        primaryColor: undefined,
      });

      await shopCustomizationService.put(req);

      props.onUpdate();
    }
  }

  return (
    <>
      <div class={commonStyles.Fields}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS["shop-customization"].labels["primary-color"]}
        />

        <div class={styles.ColorPicker}>
          <label
            for="color-picker"
            class={styles.ColorPickerLabel}
            style={{
              "background-color": request.primaryColor,
            }}
          />

          <input
            id="color-picker"
            class={styles.ColorPickerInput}
            type="color"
            value={request.primaryColor}
            onInput={({ target }) => handleColorChange(target.value)}
          />
        </div>
      </div>

      <div class={commonStyles.Actions}>
        <div class={commonStyles.ActionsLeft} />

        <div class={commonStyles.ActionsRight}>
          <ActionButton actionType="danger" round onClick={handleRemove}>
            <Trans key={TKEYS.form.action.Remove} />
          </ActionButton>
          <ActionButton
            actionType="active-filled"
            round
            disabled={!dataHasChanged()}
            onClick={handleSave}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </div>
    </>
  );
}
