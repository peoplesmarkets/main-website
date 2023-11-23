import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "../../../components/content";
import {
  ActionButton,
  Form,
  MdTextField,
  PriceField,
  SelectKey,
} from "../../../components/form";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { DiscardConfirmationDialog } from "../../../components/form/DiscardConfirmationDialog";
import { MdCheckbox } from "../../../components/form/MdCheckbox";
import { MdSelect, Option } from "../../../components/form/MdSelect";
import { MdSelectOption } from "../../../components/form/MdSelectOption";
import { Border } from "../../../components/layout";
import { MdDialog } from "../../../components/layout/MdDialog";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { isDifferentOmittingNilWithFilter } from "../../../lib/object-compair";
import { TKEYS } from "../../../locales";
import {
  listCurrencyCodes,
  listPriceTypeCodes,
  listRecurringIntervalCodes,
} from "../../../services";
import {
  OfferResponse,
  PutPriceToOfferRequest,
} from "../../../services/peoplesmarkets/commerce/v1/offer";
import {
  Currency,
  Price,
  PriceBillingScheme,
  PriceType,
  Recurring,
  RecurringInterval,
  currencyFromJSON,
  currencyToJSON,
  priceTypeFromJSON,
  priceTypeToJSON,
  recurringIntervalFromJSON,
  recurringIntervalToJSON,
} from "../../../services/peoplesmarkets/commerce/v1/price";
import commonStyles from "./Common.module.scss";

type Dialog = "none" | "edit" | "discard" | "delete";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferPriceDialog(props: Props) {
  const [trans] = useTransContext();

  const { offerService } = useServiceClientContext();

  const [request, setRequest] = createStore<PutPriceToOfferRequest>({
    offerId: "",
    price: undefined,
  });

  const defaultPriceRequest = {
    unitAmount: 0.0,
    priceType: PriceType.PRICE_TYPE_ONE_TIME,
    currency: Currency.CURRENCY_EUR,
    billingScheme: PriceBillingScheme.PRICE_BILLING_SCHEME_PER_UNIT,
  };

  const [errors] = createStore({
    unitAmount: [] as string[],
    recurringInterval: [] as string[],
    recurringIntervalCount: [] as string[],
    trialPeriod: [] as string[],
  });

  const [showTrialPeriodInput, setShowTrialPeriodInput] = createSignal(false);
  const [showDialog, setShowDialog] = createSignal<Dialog>("none");

  createEffect(() => {
    if (props.show) {
      const offer = _.cloneDeep(props.offer);
      const offerId = offer?.offerId;

      if (!_.isNil(offerId)) {
        setRequest("offerId", offerId);
      }

      if (_.isNil(offer?.price)) {
        setRequest("price", _.clone(defaultPriceRequest));
      } else {
        setRequest("price", offer?.price);
      }

      if (!_.isNil(offer?.price?.recurring?.trialPeriodDays)) {
        setShowTrialPeriodInput(true);
      }
    }
  });

  createEffect(() => {
    if (props.show) {
      setShowDialog("edit");
    } else {
      setShowDialog("none");
    }
  });

  function dataWasChanged() {
    const fields = Object.keys(Price.create());

    return isDifferentOmittingNilWithFilter(
      props.offer?.price,
      request.price,
      fields
    );
  }

  function currencyOptions() {
    return listCurrencyCodes().map((c) => ({
      name: trans(TKEYS.price.currency[c]),
      key: c,
    }));
  }

  function priceTypeOptions() {
    return listPriceTypeCodes().map((t) => ({
      name: trans(TKEYS.price["price-type"][t]),
      key: t,
    }));
  }

  function recurringIntervalOptions() {
    return listRecurringIntervalCodes().map((i) => ({
      name: trans(TKEYS.price["recurring-interval"][i], {
        intervalCount: request.price?.recurring?.intervalCount || 1,
      }),
      key: i,
    }));
  }

  function selectedCurrency() {
    if (!_.isNil(request.price?.currency)) {
      return _.find(currencyOptions(), {
        key: currencyToJSON(request.price!.currency),
      });
    }
  }

  function isSelectedCurrency(option: Option): boolean {
    return selectedCurrency()?.key === option.key;
  }

  function selectedPriceType() {
    if (!_.isNil(request.price?.priceType)) {
      return _.find(priceTypeOptions(), {
        key: priceTypeToJSON(request.price!.priceType),
      });
    }
  }

  function isSelectedPriceType(option: Option): boolean {
    return selectedPriceType()?.key === option.key;
  }

  function selectedRecurringInterval() {
    if (!_.isNil(request.price?.recurring?.interval)) {
      return _.find(recurringIntervalOptions(), {
        key: recurringIntervalToJSON(request.price!.recurring!.interval),
      });
    }
  }

  function isSelectedRecurringInterval(option: Option): boolean {
    return selectedRecurringInterval()?.key === option.key;
  }

  async function handleUpdateOfferPrice(event: SubmitEvent) {
    event.preventDefault();

    await offerService.putPrice(request);
    props.onUpdate?.();
    props.onClose();
  }

  async function handleConfirmDeletion() {
    await offerService.removePrice(request);
    props.onUpdate?.();
    props.onClose();
  }

  function handlePriceInput(value: number) {
    setRequest("price", {
      ...request.price,
      unitAmount: value,
    });
  }

  function handleCurrencyChange(value: any) {
    if (_.isString(value)) {
      setRequest("price", {
        ...request.price,
        currency: currencyFromJSON(value),
      });
    }
  }

  function handlePriceTypeChange(value: any) {
    if (_.isString(value)) {
      const priceType = priceTypeFromJSON(value);
      let price = {
        ...request.price,
        priceType,
      };
      if (
        request.price?.priceType === PriceType.PRICE_TYPE_ONE_TIME &&
        priceType === PriceType.PRICE_TYPE_RECURRING
      ) {
        price.recurring = {
          intervalCount: 1,
          interval: RecurringInterval.RECURRING_INTERVAL_MONTH,
        };
      }
      if (
        request.price?.priceType === PriceType.PRICE_TYPE_RECURRING &&
        priceType === PriceType.PRICE_TYPE_ONE_TIME
      ) {
        price.recurring = undefined;
      }

      setRequest("price", price);
    }
  }

  function handleRecurringIntervalCountInput(value: number) {
    setRequest("price", {
      ...request.price,
      recurring: {
        ...request.price?.recurring,
        intervalCount: value,
      } as Recurring,
    });
  }

  function handleRecurringIntervalChange(value: SelectKey) {
    if (_.isString(value)) {
      setRequest("price", {
        ...request.price,
        recurring: {
          ...request.price?.recurring,
          interval: recurringIntervalFromJSON(value),
        } as Recurring,
      });
    }
  }

  function handleToggleTrialPeriodInput(value: boolean) {
    setShowTrialPeriodInput(value);
    if (!value) {
      setRequest("price", {
        ...request.price,
        recurring: {
          ...request.price?.recurring,
          trialPeriodDays: undefined,
        } as Recurring,
      });
    }
  }

  function handleTrialPeriodInput(value: number) {
    setRequest("price", {
      ...request.price,
      recurring: {
        ...request.price?.recurring,
        trialPeriodDays: value,
      } as Recurring,
    });
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

  function handleDeleteOfferPrice() {
    setShowDialog("delete");
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
          <Font type="title" key={TKEYS.dashboard.offers["edit-price"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleUpdateOfferPrice}>
            <MdSelect
              type="outlined"
              menuPositioning="fixed"
              label={trans(TKEYS.price["price-type"].title)}
              onChange={handlePriceTypeChange}
            >
              <For each={priceTypeOptions()}>
                {(option) => (
                  <MdSelectOption
                    selected={isSelectedPriceType(option)}
                    value={option.key}
                  >
                    <div slot="headline">{option.name}</div>
                  </MdSelectOption>
                )}
              </For>
            </MdSelect>

            <div class={commonStyles.FieldSet}>
              <PriceField
                label={trans(TKEYS.price.Price)}
                value={request.price?.unitAmount}
                onValue={handlePriceInput}
                errors={errors.unitAmount}
              />

              <MdSelect
                class={commonStyles.NarrowSelect}
                type="outlined"
                menuPositioning="fixed"
                onChange={handleCurrencyChange}
              >
                <For each={currencyOptions()}>
                  {(option) => (
                    <MdSelectOption
                      selected={isSelectedCurrency(option)}
                      value={option.key}
                    >
                      <div slot="headline">{option.name}</div>
                    </MdSelectOption>
                  )}
                </For>
              </MdSelect>
            </div>

            <Show
              when={request.price?.priceType === PriceType.PRICE_TYPE_RECURRING}
            >
              <div class={commonStyles.FieldSet}>
                <Font
                  type="label"
                  key={TKEYS.common["per-or-every"]}
                  options={{
                    count: request.price?.recurring?.intervalCount,
                  }}
                />

                <div class={commonStyles.FieldSetInput}>
                  <MdTextField
                    type="number"
                    label={trans(TKEYS.price["billing-period"])}
                    value={request.price?.recurring?.intervalCount}
                    onValue={handleRecurringIntervalCountInput}
                    errorText={errors.recurringIntervalCount}
                  />
                </div>

                <MdSelect
                  class={commonStyles.NarrowSelect}
                  type="outlined"
                  menuPositioning="fixed"
                  onChange={handleRecurringIntervalChange}
                >
                  <For each={recurringIntervalOptions()}>
                    {(option) => (
                      <MdSelectOption
                        selected={isSelectedRecurringInterval(option)}
                        value={option.key}
                      >
                        <div slot="headline">{option.name}</div>
                      </MdSelectOption>
                    )}
                  </For>
                </MdSelect>
              </div>

              <Border />

              <MdCheckbox
                label={trans(TKEYS.price["trial-period"])}
                checked={showTrialPeriodInput()}
                onValue={handleToggleTrialPeriodInput}
              />

              <Show when={showTrialPeriodInput()}>
                <div class={commonStyles.FieldSet}>
                  <MdTextField
                    class={commonStyles.NarrowSelect}
                    type="number"
                    label={trans(TKEYS.price["trial-period"])}
                    value={request.price?.recurring?.trialPeriodDays}
                    onValue={handleTrialPeriodInput}
                    errorText={errors.trialPeriod}
                  />

                  <Font
                    type="label"
                    key={TKEYS.price["days-free"]}
                    options={{
                      periodDays: request?.price?.recurring?.trialPeriodDays,
                    }}
                  />
                </div>
              </Show>
            </Show>
          </Form>
        </div>

        <div slot="actions">
          <ActionButton
            actionType="neutral-borderless"
            onClick={handleCloseDialog}
          >
            <Trans key={TKEYS.form.action.Close} />
          </ActionButton>

          <Show when={!_.isNil(props.offer?.price)}>
            <ActionButton actionType="danger" onClick={handleDeleteOfferPrice}>
              <Trans key={TKEYS.form.action.Delete} />
            </ActionButton>
          </Show>

          <ActionButton
            actionType="active-filled"
            submit
            onClick={handleUpdateOfferPrice}
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
        onConfirmation={handleConfirmDeletion}
      />
    </>
  );
}
