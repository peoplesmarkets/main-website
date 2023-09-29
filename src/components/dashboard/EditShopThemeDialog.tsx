import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";
import { PutShopCustomizationRequest } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { ActionButton, DiscardConfirmation, TextField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";
import { isCssColor } from "../../lib";

type Props = {
  onClose: () => void;
  onUpdate: () => void;
};

export function EditShopThemeDialog(props: Props) {
  const [trans] = useTransContext();

  const shopData = useRouteData<typeof ShopData>();

  const { accessToken } = useAccessTokensContext();

  const shopCustomizationService = new ShopCustomizationService(accessToken);

  const emptyPutRequest = PutShopCustomizationRequest.create();

  const [shopCustomization, setShopCustomization] =
    createStore<PutShopCustomizationRequest>(emptyPutRequest);

  const emptyErrors: Record<keyof PutShopCustomizationRequest, string[]> = {
    shopId: [],
    headerBackgroundColorLight: [],
    headerBackgroundColorDark: [],
    headerContentColorLight: [],
    headerContentColorDark: [],
    secondaryBackgroundColorLight: [],
    secondaryBackgroundColorDark: [],
    secondaryContentColorLight: [],
    secondaryContentColorDark: [],
  };

  const [errors, setErrors] = createStore(_.clone(emptyErrors));

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isEmpty(shopCustomization.shopId)) {
      const customization = shopData.shopCustomization.data();
      if (!_.isEmpty(customization)) {
        setShopCustomization(_.clone(customization));
      } else {
        setShopCustomization("shopId", shopData.shop.data()!.shopId);
      }
    }
  });

  function resetErrors() {
    setErrors(_.clone(emptyErrors));
  }

  function handleInput(
    field: keyof PutShopCustomizationRequest,
    value: string
  ) {
    resetErrors();
    if (_.isEmpty(value) || isCssColor(value)) {
      setShopCustomization(field, value);
    } else {
      setErrors(field, trans(TKEYS.form.errors["invalid-css-color"]));
    }
  }

  async function handlePutShopCustomization(event: SubmitEvent) {
    event.preventDefault();

    await shopCustomizationService.put(shopCustomization);

    props.onUpdate?.();
    props.onClose();
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(shopData.shopCustomization.data(), _.keys(emptyPutRequest)),
      _.pick(shopCustomization, _.keys(emptyPutRequest))
    );
  }

  function handleCloseDialog() {
    if (dataWasChanged()) {
      setShowDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleConfirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function handleContinueEditing() {
    resetErrors();
    setShowDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard["market-booth"]["edit-theme"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handlePutShopCustomization}>
            <For each={_.keys(emptyPutRequest)}>
              {(field) => (
                <Show when={field !== "shopId"}>
                  <TextField
                    label={trans(
                      _.get(TKEYS["shop-customization"].labels, field)
                    )}
                    value={_.get(shopCustomization, field)}
                    onValue={(value) =>
                      handleInput(
                        field as keyof PutShopCustomizationRequest,
                        value
                      )
                    }
                    errors={_.get(errors, field)}
                  />
                </Show>
              )}
            </For>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => handlePutShopCustomization(e)}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={handleContinueEditing}
          onDiscard={handleConfirmCloseDialog}
        />
      </Show>
    </>
  );
}
