import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { TKEYS } from "../../../locales";
import { ShippingRateService, listCurrencyCodes } from "../../../services";
import { OfferResponse } from "../../../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  currencyFromJSON,
  currencyToJSON,
} from "../../../services/peoplesmarkets/commerce/v1/price";
import { PutShippingRateRequest } from "../../../services/peoplesmarkets/commerce/v1/shipping_rate";
import { ActionButton, PriceField, Select, SelectKey } from "../../form";
import { Dialog } from "../../layout";
import styles from "./Settings.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferShippingRatesDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shippingRateService = new ShippingRateService(accessToken);

  const emptyRequest = {
    offerId: "",
    amount: undefined as any,
    currency: Currency.CURRENCY_EUR,
    allCountries: true,
    specificCountries: [],
  } as PutShippingRateRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    amount: [] as string[],
    currency: [] as string[],
  });

  const [shippingRate, { refetch }] = createResource(fetchShippingRate);

  async function fetchShippingRate() {
    try {
      const response = await shippingRateService.getShippingRate(
        props.offer().offerId
      );

      return response.shippingRate;
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.NotFound) {
        return;
      } else {
        throw err;
      }
    }
  }

  createEffect(() => {
    if (_.isNil(request.offerId) || _.isEmpty(request.offerId)) {
      setRequest("offerId", props.offer().offerId);
    }

    const rate = shippingRate();
    if (!_.isNil(rate)) {
      setRequest({
        amount: rate.amount,
        currency: rate.currency,
        allCountries: rate.allCountries,
        specificCountries: rate.specificCountries,
      });
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

  async function handleCreateShippingRate(event: SubmitEvent) {
    event.preventDefault();
    resetErrors();

    try {
      await shippingRateService.putShippingRate(request);
      handleCloseDialog();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("currency", [trans(TKEYS.form.errors["already-used"])]);
      }
    }
    refetch();
  }

  async function handleDeleteShippingRate() {
    const rate = shippingRate();
    if (!_.isNil(rate)) {
      await shippingRateService.deleteShippingRate(rate.shippingRateId);
    }
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
    props.onClose();
  }

  return (
    <>
      <Dialog
        title={trans(TKEYS.dashboard["shipping-rate"]["shipping-rates"])}
        onClose={handleCloseDialog}
      >
        <form class={styles.Form} onSubmit={handleCreateShippingRate}>
          <div class={styles.FieldSet}>
            <div class={styles.FieldSetInput}>
              <PriceField
                label={trans(TKEYS.price.Price)}
                required
                value={() => request.amount}
                onValue={handleAmountInput}
                errors={errors.amount}
              />
            </div>

            <Select
              class={styles.FieldSetExtra}
              expandHeight
              label={trans(TKEYS.price.currency.title)}
              options={currencyOptions}
              value={selectedCurrency}
              onValue={handleCurrencyChange}
            />
          </div>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="danger"
              onClick={handleDeleteShippingRate}
            >
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
        </form>
      </Dialog>
    </>
  );
}
