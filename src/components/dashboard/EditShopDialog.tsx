import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { ShopService } from "../../services";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../services/peoplesmarkets/commerce/v1/shop";
import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  shop: () => ShopResponse;
  class?: string;
  onClose: () => void;
  onUpdate?: () => void;
};

export function EditShopDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopService = new ShopService(accessToken);

  const emptyUpdateRequest = {
    shopId: undefined as string | undefined,
    name: undefined as string | undefined,
    description: undefined as string | undefined,
  } as UpdateShopRequest;
  const updateFields = Object.keys(emptyUpdateRequest);

  const [shop, setShop] = createStore(emptyUpdateRequest);

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isNil(shop.shopId) || _.isEmpty(shop.shopId)) {
      setShop(_.clone(_.pick(props.shop(), updateFields)));
    }
  });

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setShop("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setShop("description", value.trim());
  }

  async function handleUpdateShop(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("name", [notModified]);
      setErrors("description", [notModified]);
      return;
    }

    await shopService.update(shop);

    props.onUpdate?.();
    props.onClose();
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(props.shop(), updateFields),
      _.pick(shop, updateFields)
    );
  }

  function closeDialog() {
    if (dataWasChanged()) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function confirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    resetErrors();
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.shop["edit-name-and-description"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={handleUpdateShop}>
            <TextField
              label={trans(TKEYS.shop.labels.name)}
              required
              value={shop.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS.shop.labels.description)}
              rows={8}
              value={shop.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => handleUpdateShop(e)}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
