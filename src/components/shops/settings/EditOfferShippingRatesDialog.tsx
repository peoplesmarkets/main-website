import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { TKEYS } from "../../../locales";
import {
  ShippingRateService,
  listCountryCodes,
  listCurrencyCodes,
} from "../../../services";
import { OfferResponse } from "../../../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  currencyFromJSON,
  currencyToJSON,
} from "../../../services/peoplesmarkets/commerce/v1/price";
import {
  AddShippingRateToOfferRequest,
  ShippingCountry,
  ShippingRatesOrderByField,
  shippingCountryToJSON,
} from "../../../services/peoplesmarkets/commerce/v1/shipping_rate";
import { ActionButton, PriceField, Select, SelectKey } from "../../form";
import { Border, Dialog, Section } from "../../layout";
import styles from "./Settings.module.scss";
import { centsToDecimal } from "../../../lib";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";
import { PaginationRequest } from "../../../services/peoplesmarkets/pagination/v1/pagination";
import { Pagination } from "../../navigation/Pagination";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferShippingRatesDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shippingRateService = new ShippingRateService(accessToken);

  const [pagination, setPagination] = createStore<PaginationRequest>({
    page: 1,
    size: 5,
  });

  const [request, setRequest] = createStore<AddShippingRateToOfferRequest>({
    offerId: "",
    amount: 0,
    country: ShippingCountry.SHIPPING_COUNTRY_AAALL_COUNTRIES,
    currency: Currency.CURRENCY_EUR,
  });

  const [errors, setErrors] = createStore({
    amount: [] as string[],
    currency: [] as string[],
    country: [] as string[],
  });

  const [response, { refetch }] = createResource(fetchShippingRates);

  async function fetchShippingRates() {
    return shippingRateService.listShippingRates({
      offerId: props.offer().offerId,
      pagination,
      orderBy: {
        field: ShippingRatesOrderByField.SHIPPING_RATES_ORDER_BY_FIELD_COUNTRY,
        direction: Direction.DIRECTION_ASC,
      },
    });
  }

  createEffect(() => {
    if (_.isNil(request.offerId) || _.isEmpty(request.offerId)) {
      setRequest("offerId", props.offer().offerId);
    }
  });

  function resetErrors() {
    setErrors({ amount: [], country: [], currency: [] });
  }

  function countryDisplay(countryCode: number): string {
    if (countryCode === 1) {
      return trans(TKEYS.dashboard["shipping-rate"]["to-all-countries"]);
    }

    return shippingCountryToJSON(countryCode).replace("SHIPPING_COUNTRY_", "");
  }

  function amountDisplay(cents: number): string {
    return centsToDecimal(cents, trans(TKEYS.price["decimal-point"]));
  }

  function currencyDisplay(currency: Currency): string {
    return trans(TKEYS.price.currency[currencyToJSON(currency)]);
  }

  function countryOptions() {
    return listCountryCodes().map((c) => ({
      name: countryDisplay(c),
      key: c,
    }));
  }

  function selectedCountry() {
    if (!_.isNil(request.country)) {
      return _.find(countryOptions(), {
        key: request.country,
      });
    }
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

  async function handleAddShippingRate(event: SubmitEvent) {
    event.preventDefault();
    resetErrors();

    try {
      await shippingRateService.addShippingRateToOffer(request);
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("country", [trans(TKEYS.form.errors["already-used"])]);
      }
    }
    refetch();
  }

  async function handleRemoveShippingRate(shippingRateId: string) {
    resetErrors();
    await shippingRateService.removeShippingRateFromOffer({
      offerId: props.offer().offerId,
      shippingRateId,
    });
    refetch();
  }

  function handleCountrySelect(value: SelectKey) {
    resetErrors();
    if (_.isNumber(value)) {
      setRequest("country", value as ShippingCountry);
    }
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

  function handlePagination(pagination: PaginationRequest) {
    resetErrors();
    setPagination(pagination);
    refetch();
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
        <Section flat>
          <Show
            when={!_.isEmpty(response()?.shippingRates)}
            fallback={
              <Section flat>
                <span class={styles.Body}>
                  <Trans
                    key={
                      TKEYS.dashboard["shipping-rate"]["no-shipping-rates-yet"]
                    }
                  />
                </span>
              </Section>
            }
          >
            <For each={response()?.shippingRates}>
              {(shippingRate) => (
                <div class={styles.Row}>
                  <span class={styles.Label}>
                    {countryDisplay(shippingRate.country)}
                  </span>
                  <span>
                    {amountDisplay(shippingRate.amount)}{" "}
                    {currencyDisplay(shippingRate.currency)}
                  </span>
                  <ActionButton
                    actionType="danger"
                    small
                    onClick={() =>
                      handleRemoveShippingRate(shippingRate.shippingRateId)
                    }
                  >
                    <Trans key={TKEYS.form.action.Remove} />
                  </ActionButton>
                </div>
              )}
            </For>
            <div class={styles.Pagination}>
              <Pagination
                pagination={() => response()?.pagination}
                onValue={handlePagination}
              />
            </div>
          </Show>
        </Section>

        <form class={styles.Form} onSubmit={handleAddShippingRate}>
          <Border />
          <span class={styles.Body}>
            <Trans
              key={TKEYS.dashboard["shipping-rate"]["add-shipping-rate"]}
            />
            :
          </span>
          <div>
            <Select
              class=""
              label={trans(TKEYS.dashboard["shipping-rate"].country)}
              options={countryOptions}
              value={selectedCountry}
              onValue={handleCountrySelect}
            />
            <Show when={!_.isEmpty(errors.country)}>
              <span class={styles.ErrorInfoText}>{errors.country}</span>
            </Show>
          </div>

          <div class={styles.FieldSet}>
            <div class={styles.FieldSetInput}>
              <PriceField
                label={trans(TKEYS.price.Price)}
                required
                initial={request.amount}
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
              actionType="active-filled"
              submit
              onClick={handleAddShippingRate}
            >
              <Trans key={TKEYS.form.action.Add} />
            </ActionButton>
          </div>
        </form>
      </Dialog>
    </>
  );
}
