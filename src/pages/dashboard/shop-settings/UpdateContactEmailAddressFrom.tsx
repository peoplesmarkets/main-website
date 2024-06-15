import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { ActionButton, MdTextField } from "../../../components/form";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../../services/sited_io/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { Font } from "../../../components/content";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdateContactEmailAddressForm(props: Props) {
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const emptyUpdateEmailRequest = {
    shopId: undefined as string | undefined,
    contactEmailAddress: undefined as string | undefined,
  } as UpdateShopRequest;

  const updateEmailFields = Object.keys(emptyUpdateEmailRequest);

  const [updateEmailRequest, setUpdateEmailRequest] = createStore(
    _.clone(emptyUpdateEmailRequest)
  );

  const [errors, setErrors] = createStore({
    contactEmailAddress: [] as string[],
  });

  createEffect(() => {
    if (
      _.isNil(updateEmailRequest.shopId) ||
      _.isEmpty(updateEmailRequest.shopId)
    ) {
      setUpdateEmailRequest(_.clone(_.pick(props.shop, updateEmailFields)));
    }
  });

  function resetErrors() {
    setErrors({ contactEmailAddress: [] });
  }

  function handleContactEmailAddressInput(value: string) {
    resetErrors();
    setUpdateEmailRequest("contactEmailAddress", value.trim());
  }

  function updateEmailDataWasChanged() {
    return !_.isEqual(
      _.pick(props.shop, updateEmailFields),
      _.pick(updateEmailRequest, updateEmailFields)
    );
  }

  async function handleSave() {
    if (updateEmailDataWasChanged()) {
      await handleUpdateEmail();
    }

    handleUpdate();
  }

  async function handleUpdateEmail() {
    await shopService.update(updateEmailRequest);
    handleUpdate();
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <form class={commonStyles.Form} onSubmit={handleUpdateEmail}>
      <Font
        type="headline"
        class={commonStyles.Headline}
        key={TKEYS.shop.labels["contact-email-address"]}
      />

      <div class={commonStyles.Fields}>
        <div class={commonStyles.FieldInfo}>
          <Font type="body" key={TKEYS.dashboard.shop.contact.info} />
        </div>

        <div class={commonStyles.Field}>
          <MdTextField
            label={trans(TKEYS.shop.labels["contact-email-address"])}
            value={updateEmailRequest.contactEmailAddress}
            onValue={handleContactEmailAddressInput}
            error={!_.isEmpty(errors.contactEmailAddress)}
            errorText={errors.contactEmailAddress}
          />

          <div class={commonStyles.Actions}>
            <div class={commonStyles.ActionsLeft} />

            <div class={commonStyles.ActionsRight}>
              <ActionButton actionType="active-filled" onClick={handleSave}>
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
