import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  For,
  Show,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
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
import { OfferResponse } from "../../../services/sited_io/commerce/v1/offer";
import {
  Currency,
  currencyFromJSON,
  currencyToJSON,
} from "../../../services/sited_io/commerce/v1/price";
import { PutShippingRateRequest } from "../../../services/sited_io/commerce/v1/shipping_rate";
import commonStyles from "./Common.module.scss";
import { DiscardConfirmationDialog } from "../../../components/form/DiscardConfirmationDialog";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { isDifferentOmittingNilWithFilter } from "../../../lib/object-compair";

type Dialog = "none" | "edit" | "discard" | "delete";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse | undefined;
  readonly onClose: () => void;
};

export function EditOfferShippingRatesDialog(props: Props) {
  const [trans] = useTransContext();

  const { shippingRateService } = useServiceClientContext();

  const emptyRequest = {
    offerId: undefined as string | undefined,
    amount: 0,
    currency: Currency.CURRENCY_EUR,
    allCountries: true,
    specificCountries: [],
  } as PutShippingRateRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    amount: [] as string[],
    currency: [] as string[],
  });

  const [showDialog, setShowDialog] = createSignal<Dialog>("none");

  const [shippingRate, { refetch }] = createResource(
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
        setRequest({ ...emptyRequest, offerId });
        return;
      }
      throw err;
    }
  }

  createEffect(() => {
    if (props.show) {
      setShowDialog("edit");
      refetch();
    }
  });

  function dataWasChanged() {
    const fields = Object.keys(PutShippingRateRequest.create());

    return isDifferentOmittingNilWithFilter(shippingRate(), request, fields);
  }

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
      handleConfirmCloseDialog();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("currency", [trans(TKEYS.form.errors["already-used"])]);
      }
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

  function handleCloseDialog() {
    if (showDialog() !== "edit") {
      return;
    }
    if (dataWasChanged()) {
      setShowDialog("discard");
    } else {
      handleConfirmCloseDialog();
    }
  }

  function handleStartDeletion() {
    setShowDialog("delete");
  }

  async function handleDeleteShippingRate() {
    const rate = shippingRate();
    if (!_.isNil(rate)) {
      await shippingRateService.deleteShippingRate(rate.shippingRateId);
    }
    handleConfirmCloseDialog();
  }

  function handleContinueEditing() {
    setShowDialog("edit");
  }

  function handleConfirmCloseDialog() {
    props.onClose();
    setShowDialog("none");
  }

  return (
    <>
      <MdDialog
        open={props.show && showDialog() === "edit"}
        onClose={handleCloseDialog}
      >
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
                    value={request.amount}
                    onValue={handleAmountInput}
                    errors={errors.amount}
                  />
                </div>

                <MdSelect
                  class={commonStyles.NarrowSelect}
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
          <ActionButton
            actionType="neutral-borderless"
            onClick={handleCloseDialog}
          >
            <Trans key={TKEYS.form.action.Close} />
          </ActionButton>

          <Show when={!_.isNil(shippingRate())}>
            <ActionButton actionType="danger" onClick={handleStartDeletion}>
              <Trans key={TKEYS.form.action.Delete} />
            </ActionButton>
          </Show>

          <ActionButton
            actionType="active-filled"
            submit
            onClick={handleCreateShippingRate}
          >
            <Trans key={TKEYS.form.action.Save} />
          </ActionButton>
        </div>
      </MdDialog>

      <DiscardConfirmationDialog
        show={showDialog() === "discard"}
        onCancel={handleContinueEditing}
        onDiscard={handleConfirmCloseDialog}
      />

      <DeleteConfirmationDialog
        show={showDialog() === "delete"}
        onCancel={handleContinueEditing}
        onConfirmation={handleDeleteShippingRate}
      />
    </>
  );
}
