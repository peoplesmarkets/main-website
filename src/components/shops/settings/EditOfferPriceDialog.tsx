import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { TKEYS } from "../../../locales";
import {
  OfferService,
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
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  PriceField,
  Select,
  SelectKey,
} from "../../form";
import { NumberField } from "../../form/NumberField";
import { Border, Dialog } from "../../layout";
import styles from "./Settings.module.scss";
import { CheckBox } from "../../form/CheckBox";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferPriceDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [request, setRequest] = createStore<PutPriceToOfferRequest>({
    offerId: "",
    price: undefined,
  });

  const [errors] = createStore({
    unitAmount: [] as string[],
    recurringInterval: [] as string[],
    recurringIntervalCount: [] as string[],
    trialPeriod: [] as string[],
  });

  const [showTrialPeriodInput, setShowTrialPeriodInput] = createSignal(false);

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  createEffect(() => {
    const offer = _.cloneDeep(props.offer());

    if (_.isEmpty(request.offerId)) {
      setRequest("offerId", offer.offerId);
    }
    if (_.isNil(request.price)) {
      if (!_.isNil(offer.price)) {
        setRequest("price", offer.price);
        if (!_.isNil(offer.price.recurring?.trialPeriodDays)) {
          setShowTrialPeriodInput(true);
        }
      } else {
        setRequest("price", {
          unitAmount: 0.0,
          priceType: PriceType.PRICE_TYPE_ONE_TIME,
          currency: Currency.CURRENCY_EUR,
          billingScheme: PriceBillingScheme.PRICE_BILLING_SCHEME_PER_UNIT,
        });
      }
    }
  });

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

  function selectedPriceType() {
    if (!_.isNil(request.price?.priceType)) {
      return _.find(priceTypeOptions(), {
        key: priceTypeToJSON(request.price!.priceType),
      });
    }
  }

  function selectedRecurringInterval() {
    if (!_.isNil(request.price?.recurring?.interval)) {
      return _.find(recurringIntervalOptions(), {
        key: recurringIntervalToJSON(request.price!.recurring!.interval),
      });
    }
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

  function handleCurrencyChange(value: SelectKey) {
    if (_.isString(value)) {
      setRequest("price", {
        ...request.price,
        currency: currencyFromJSON(value),
      });
    }
  }

  function handlePriceTypeChange(value: SelectKey) {
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
    if (!_.isEqual(props.offer().price, request.price)) {
      setShowDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function handleDeleteOfferPrice() {
    setShowDeleteConfirmation(true);
  }

  function handleContinueEditing() {
    setShowDiscardConfirmation(false);
    setShowDeleteConfirmation(false);
  }

  function handleConfirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard.offers["edit-price"])}
          onClose={handleCloseDialog}
        >
          <form class={styles.Form} onSubmit={handleUpdateOfferPrice}>
            <Select
              label={trans(TKEYS.price["price-type"].title)}
              value={selectedPriceType}
              options={priceTypeOptions}
              onValue={handlePriceTypeChange}
            />

            <div class={styles.FieldSet}>
              <div class={styles.FieldSetInput}>
                <PriceField
                  label={trans(TKEYS.price.Price)}
                  initial={request.price?.unitAmount}
                  onValue={handlePriceInput}
                  errors={errors.unitAmount}
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

            <Show
              when={request.price?.priceType === PriceType.PRICE_TYPE_RECURRING}
            >
              <div class={styles.FieldSetSmall}>
                <span class={styles.Body}>
                  <Trans
                    key={TKEYS.common["per-or-every"]}
                    options={{
                      count: request.price?.recurring?.intervalCount,
                    }}
                  />
                </span>
                <div class={styles.FieldSetInput}>
                  <NumberField
                    label={trans(TKEYS.price["billing-period"])}
                    value={request.price?.recurring?.intervalCount}
                    onValue={handleRecurringIntervalCountInput}
                    errors={errors.recurringIntervalCount}
                    integer
                    small
                  />
                </div>

                <Select
                  label=""
                  value={selectedRecurringInterval}
                  options={recurringIntervalOptions}
                  onValue={handleRecurringIntervalChange}
                  expandHeight
                />
              </div>

              <Border tall />

              <CheckBox
                label={trans(TKEYS.price["trial-period"])}
                value={showTrialPeriodInput()}
                onValue={handleToggleTrialPeriodInput}
              />

              <Show
                when={showTrialPeriodInput()}
                fallback={<div style={{ width: "100%", height: "1.6rem" }} />}
              >
                <div class={styles.FieldSetSmall}>
                  <NumberField
                    label={trans(TKEYS.price["trial-period"])}
                    value={request.price?.recurring?.trialPeriodDays}
                    onValue={handleTrialPeriodInput}
                    errors={errors.trialPeriod}
                    integer
                    small
                  />
                  <Trans
                    key={TKEYS.price["days-free"]}
                    options={{ periodDays: 2 }}
                  />
                </div>
              </Show>
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="danger"
                onClick={handleDeleteOfferPrice}
              >
                <Trans key={TKEYS.form.action.Delete} />
              </ActionButton>

              <ActionButton
                actionType="active-filled"
                submit
                onClick={handleUpdateOfferPrice}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={handleContinueEditing}
          onDiscard={handleConfirmCloseDialog}
        />
      </Show>

      <Show when={showDeleteConfirmation()}>
        <DeleteConfirmation
          message=""
          onCancel={handleContinueEditing}
          onConfirmation={handleConfirmDeletion}
        />
      </Show>
    </>
  );
}
