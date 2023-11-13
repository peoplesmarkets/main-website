import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { isCssColor, resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { MyShopData } from "../../pages/shop-owner-pages/MyShopData";
import { PutShopCustomizationRequest } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { ActionButton, DiscardConfirmation, TextField } from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  onClose: () => void;
  onUpdate: () => void;
};

export function EditShopThemeDialog(props: Props) {
  const [trans] = useTransContext();

  const { shopCustomizationService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [shopCustomization] = createResource(
    shopData?.shop()?.shopId,
    async (shopId) =>
      shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const emptyPutRequest = PutShopCustomizationRequest.create();

  const [request, setRequest] =
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
    if (
      !resourceIsReady(shopData.shop) ||
      !resourceIsReady(shopCustomization)
    ) {
      return;
    }

    if (_.isEmpty(request.shopId)) {
      const customization = shopCustomization();

      const shopId = shopData.shop()?.shopId;

      if (!_.isEmpty(customization)) {
        setRequest(_.clone(customization));
      } else if (!_.isNil(shopId)) {
        setRequest("shopId", shopId);
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
      setRequest(field, value);
    } else {
      setErrors(field, trans(TKEYS.form.errors["invalid-css-color"]));
    }
  }

  async function handlePutShopCustomization(event: SubmitEvent) {
    event.preventDefault();

    await shopCustomizationService.put(request);

    props.onUpdate?.();
    props.onClose();
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(shopCustomization(), _.keys(emptyPutRequest)),
      _.pick(request, _.keys(emptyPutRequest))
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
      <Dialog
        title={trans(TKEYS.dashboard["shop"]["edit-theme"])}
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
                  value={_.get(request, field)}
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

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={handleContinueEditing}
          onDiscard={handleConfirmCloseDialog}
        />
      </Show>
    </>
  );
}
