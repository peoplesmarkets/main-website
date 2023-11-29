import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { ActionButton, MdTextField } from "../../../components/form";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import {
  ShopResponse,
  UpdateShopRequest,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import commonStyles from "../Common.module.scss";
import { Font } from "../../../components/content";
import { Border } from "../../../components/layout";

type Props = {
  shop: ShopResponse | undefined;
  next: () => void;
  onUpdate?: () => void;
};

export function EditDetailsTab(props: Props) {
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const emptyUpdateRequest = {
    shopId: undefined as string | undefined,
    name: undefined as string | undefined,
    description: undefined as string | undefined,
  } as UpdateShopRequest;
  const updateFields = Object.keys(emptyUpdateRequest);

  const [request, setRequest] = createStore(emptyUpdateRequest);

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  createEffect(() => {
    if (_.isNil(request.shopId) || _.isEmpty(request.shopId)) {
      setRequest(_.clone(_.pick(props.shop, updateFields)));
    }
  });

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(props.shop, updateFields),
      _.pick(request, updateFields)
    );
  }

  function handleNameInput(value: string) {
    resetErrors();
    setRequest("name", value);
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setRequest("description", value);
  }

  function handleContinue(event: SubmitEvent | MouseEvent) {
    event.preventDefault();
    props.next();
  }

  async function handleSaveAndContinue(event: SubmitEvent | MouseEvent) {
    event.preventDefault();

    if (dataWasChanged()) {
      await shopService.update(request);
      props.onUpdate?.();
    }

    handleContinue(event);
  }

  return (
    <form class={commonStyles.Form} onSubmit={handleSaveAndContinue}>
      <div class={commonStyles.Fields}>
        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.shop.labels.Name}
        />

        <div class={commonStyles.Field}>
          <MdTextField
            type="text"
            value={props.shop?.name}
            required
            label={trans(TKEYS.shop.labels.name)}
            onValue={handleNameInput}
            error={!_.isEmpty(errors.name)}
            errorText={errors.name}
          />
        </div>

        <Font
          type="headline"
          class={commonStyles.Headline}
          key={TKEYS.shop.labels.Description}
        />

        <div class={commonStyles.Field}>
          <MdTextField
            type="textarea"
            rows={4}
            label={trans(TKEYS.shop.labels.description)}
            value={props.shop?.description}
            onValue={handleDescriptionInput}
            error={!_.isEmpty(errors.description)}
            errorText={errors.description}
          />
        </div>
      </div>

      <Border />

      <div class={commonStyles.Actions}>
        <div class={commonStyles.ActionsLeft} />

        <div class={commonStyles.ActionsRight}>
          <Show
            when={dataWasChanged()}
            fallback={
              <ActionButton actionType="neutral" onClick={handleContinue}>
                <Trans key={TKEYS.form.action.Next} />
              </ActionButton>
            }
          >
            <ActionButton
              actionType="active-filled"
              onClick={handleSaveAndContinue}
            >
              <Trans key={TKEYS.form.action["Save-and-continue"]} />
            </ActionButton>
          </Show>
        </div>
      </div>
    </form>
  );
}
