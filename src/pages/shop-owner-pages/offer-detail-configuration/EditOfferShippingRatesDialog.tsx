import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../../components/content";
import {
  ActionButton,
  Form,
  PriceField,
  SelectKey,
} from "../../../components/form";
import { MdSelect, Option } from "../../../components/form/MdSelect";
import { MdSelectOption } from "../../../components/form/MdSelectOption";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import { listCurrencyCodes } from "../../../services";
import { OfferResponse } from "../../../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  currencyFromJSON,
  currencyToJSON,
} from "../../../services/peoplesmarkets/commerce/v1/price";
import { PutShippingRateRequest } from "../../../services/peoplesmarkets/commerce/v1/shipping_rate";
import commonStyles from "./Common.module.scss";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferShippingRatesDialog(props: Props) {
  const [trans] = useTransContext();

  const { shippingRateService } = useServiceClientContext();

  const emptyRequest = {
    offerId: undefined as string | undefined,
    amount: undefined as number | undefined,
    currency: Currency.CURRENCY_EUR,
    allCountries: true,
    specificCountries: [],
  } as PutShippingRateRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    amount: [] as string[],
    currency: [] as string[],
  });

  const [shippingRate] = createResource(
    () => props.offer?.offerId,
    fetchShippingRate
  );

  async function fetchShippingRate(offerId: string) {
    try {
      const response = await shippingRateService.getShippingRate(offerId);

      if (!_.isNil(response.shippingRate)) {
        setRequest(response.shippingRate);
        return response.shippingRate;
      }
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        return;
      }
      throw err;
    }
  }

  createEffect(() => {
    if (_.isNil(request.offerId) && !_.isNil(props.offer)) {
      setRequest("offerId", props.offer.offerId);
    }
  });

  function resetErrors() {
    setErrors({ amount: [], currency: [] });
  }

  function currencyOptions() {
    return listCurrencyCodes().map((c) => ({
      name: trans(TKEYS.price.currency[c]),
      key: c,
    }));
  }

  function selectedCurrency() {
    if (!_.isNil(request.currency)) {
      return _.find(currencyOptions(), {
        key: currencyToJSON(request.currency),
      });
    }
  }

  function isSelectedCurrency(option: Option): boolean {
    return selectedCurrency()?.key === option.key;
  }

  function loaded() {
    return !_.isNil(shippingRate() || shippingRate.state === "ready");
  }

  async function handleCreateShippingRate(event: SubmitEvent) {
    event.preventDefault();

    resetErrors();

    try {
      await shippingRateService.putShippingRate(request);
      props.onUpdate?.();
      handleCloseDialog();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("currency", [trans(TKEYS.form.errors["already-used"])]);
      }
    }
  }

  async function handleDeleteShippingRate() {
    const rate = shippingRate();
    if (!_.isNil(rate)) {
      await shippingRateService.deleteShippingRate(rate.shippingRateId);
    }
    props.onUpdate?.();
    handleCloseDialog();
  }

  function handleAmountInput(value: number) {
    resetErrors();
    setRequest("amount", value);
  }

  function handleCurrencyChange(value: SelectKey) {
    resetErrors();
    if (_.isString(value)) {
      setRequest("currency", currencyFromJSON(value));
    }
  }

  function handleCloseDialog() {
    setRequest(_.clone(emptyRequest));
    props.onClose();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleCloseDialog}>
        <div slot="headline">
          <Font
            type="title"
            key={TKEYS.dashboard["shipping-rate"]["shipping-rates"]}
          />
        </div>

        <div slot="content">
          <DefaultBoundary loaded={loaded}>
            <Form onSubmit={handleCreateShippingRate}>
              <div class={commonStyles.FieldSet}>
                <div class={commonStyles.FieldSetInput}>
                  <PriceField
                    label={trans(TKEYS.price.Price)}
                    required
                    value={() => request.amount}
                    onValue={handleAmountInput}
                    errors={errors.amount}
                  />
                </div>

                <MdSelect
                  type="outlined"
                  menuPositioning="fixed"
                  label={trans(TKEYS.price.currency.title)}
                  onChange={handleCurrencyChange}
                >
                  <For each={currencyOptions()}>
                    {(option) => (
                      <MdSelectOption
                        value={option.key}
                        selected={isSelectedCurrency(option)}
                      >
                        <div slot="headline">{option.name}</div>
                      </MdSelectOption>
                    )}
                  </For>
                </MdSelect>
              </div>
            </Form>
          </DefaultBoundary>
        </div>

        <div slot="actions">
          <ActionButton actionType="neutral" onClick={handleCloseDialog}>
            <Trans key={TKEYS.form.action.Cancel} />
          </ActionButton>

          <ActionButton actionType="danger" onClick={handleDeleteShippingRate}>
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>

          <ActionButton
            actionType="active-filled"
            submit
            onClick={handleCreateShippingRate}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </MdDialog>
    </>
  );
}
