import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import { ActionButton, DiscardConfirmation, TextField } from "../../form";
import { Dialog } from "../../layout";
import styles from "./Settings.module.scss";

type Props = {
  readonly shop: () => ShopResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditShopContactEmailDialog(props: Props) {
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const emptyUpdateRequest = {
    shopId: undefined as string | undefined,
    contactEmailAddress: undefined as string | undefined,
  } as UpdateShopRequest;
  const updateFields = Object.keys(emptyUpdateRequest);

  const [request, setRequest] = createStore(_.clone(emptyUpdateRequest));

  const [errors, setErrors] = createStore({
    contactEmailAddress: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (_.isNil(request.shopId) || _.isEmpty(request.shopId)) {
      setRequest(_.clone(_.pick(props.shop(), updateFields)));
    }
  });

  function resetErrors() {
    setErrors({ contactEmailAddress: [] });
  }

  function handleContactEmailAddressInput(value: string) {
    resetErrors();
    setRequest("contactEmailAddress", value.trim());
  }

  async function handleUpdateShop(event: SubmitEvent) {
    event.preventDefault();

    await shopService.update(request);

    props.onUpdate?.();
    props.onClose();
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(props.shop(), updateFields),
      _.pick(request, updateFields)
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
      <Dialog
        title={trans(TKEYS.dashboard.shop["edit-contact-email"])}
        onClose={closeDialog}
      >
        <form class={styles.Form} onSubmit={handleUpdateShop}>
          <TextField
            label={trans(TKEYS.shop.labels["contact-email-address"])}
            required
            value={request.contactEmailAddress}
            onValue={handleContactEmailAddressInput}
            errors={errors.contactEmailAddress}
          />

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              submit
              onClick={handleUpdateShop}
            >
              <Trans key={TKEYS.form.action.Save} />
            </ActionButton>
          </div>
        </form>
      </Dialog>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
