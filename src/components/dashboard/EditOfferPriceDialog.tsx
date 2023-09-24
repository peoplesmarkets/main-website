import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import {
  OfferService,
  listCurrencyCodes,
  listPriceTypeCodes,
  listRecurringIntervalCodes,
} from "../../services";
import {
  OfferResponse,
  PutPriceToOfferRequest,
} from "../../services/peoplesmarkets/commerce/v1/offer";
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
} from "../../services/peoplesmarkets/commerce/v1/price";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  PriceField,
  Select,
  SelectKey,
} from "../form";
import { NumberField } from "../form/NumberField";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate?: () => void;
};

export function EditOfferPriceDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offerPrice, setOfferPrice] = createStore<PutPriceToOfferRequest>({
    offerId: "",
    price: undefined,
  });

  const [errors] = createStore({
    unitAmount: [] as string[],
    recurringInterval: [] as string[],
    recurringIntervalCount: [] as string[],
  });

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  createEffect(() => {
    const offer = _.cloneDeep(props.offer());

    if (_.isEmpty(offerPrice.offerId)) {
      setOfferPrice("offerId", offer.offerId);
    }
    if (_.isNil(offerPrice.price)) {
      if (!_.isNil(offer.price)) {
        setOfferPrice("price", offer.price);
      } else {
        setOfferPrice("price", {
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
        intervalCount: offerPrice.price?.recurring?.intervalCount || 1,
      }),
      key: i,
    }));
  }

  function selectedCurrency() {
    if (!_.isNil(offerPrice.price?.currency)) {
      return _.find(currencyOptions(), {
        key: currencyToJSON(offerPrice.price!.currency),
      });
    }
  }

  function selectedPriceType() {
    if (!_.isNil(offerPrice.price?.priceType)) {
      return _.find(priceTypeOptions(), {
        key: priceTypeToJSON(offerPrice.price!.priceType),
      });
    }
  }

  function selectedRecurringInterval() {
    if (!_.isNil(offerPrice.price?.recurring?.interval)) {
      return _.find(recurringIntervalOptions(), {
        key: recurringIntervalToJSON(offerPrice.price!.recurring!.interval),
      });
    }
  }

  async function handleUpdateOfferPrice(event: SubmitEvent) {
    event.preventDefault();

    await offerService.putPrice(offerPrice);
    props.onUpdate?.();
    props.onClose();
  }

  async function handleConfirmDeletion() {
    await offerService.removePrice(offerPrice);
    props.onUpdate?.();
    props.onClose();
  }

  function handlePriceInput(value: number) {
    setOfferPrice("price", {
      ...offerPrice.price,
      unitAmount: value,
    });
  }

  function handleCurrencyChange(value: SelectKey) {
    if (_.isString(value)) {
      setOfferPrice("price", {
        ...offerPrice.price,
        currency: currencyFromJSON(value),
      });
    }
  }

  function handlePriceTypeChange(value: SelectKey) {
    if (_.isString(value)) {
      const priceType = priceTypeFromJSON(value);
      let price = {
        ...offerPrice.price,
        priceType,
      };
      if (
        offerPrice.price?.priceType === PriceType.PRICE_TYPE_ONE_TIME &&
        priceType === PriceType.PRICE_TYPE_RECURRING
      ) {
        price.recurring = {
          intervalCount: 1,
          interval: RecurringInterval.RECURRING_INTERVAL_MONTH,
        };
      }
      if (
        offerPrice.price?.priceType === PriceType.PRICE_TYPE_RECURRING &&
        priceType === PriceType.PRICE_TYPE_ONE_TIME
      ) {
        price.recurring = undefined;
      }

      setOfferPrice("price", price);
    }
  }

  function handleRecurringIntervalCountInput(value: number) {
    setOfferPrice("price", {
      ...offerPrice.price,
      recurring: {
        ...offerPrice.price?.recurring,
        intervalCount: value,
      } as Recurring,
    });
  }

  function handleRecurringIntervalChange(value: SelectKey) {
    if (_.isString(value)) {
      setOfferPrice("price", {
        ...offerPrice.price,
        recurring: {
          ...offerPrice.price?.recurring,
          interval: recurringIntervalFromJSON(value),
        } as Recurring,
      });
    }
  }

  function handleCloseDialog() {
    if (!_.isEqual(props.offer().price, offerPrice.price)) {
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
                  initial={offerPrice.price?.unitAmount}
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
              when={
                offerPrice.price?.priceType === PriceType.PRICE_TYPE_RECURRING
              }
            >
              <span class={styles.Label}>
                <Trans key={TKEYS.price["billing-period"]} />:
              </span>

              <div class={styles.FieldSetSmall}>
                <span class="font-label">
                  <Trans
                    key={TKEYS.common["per-or-every"]}
                    options={{
                      count: offerPrice.price?.recurring?.intervalCount,
                    }}
                  />
                </span>
                <div class={styles.FieldSetInput}>
                  <NumberField
                    label=""
                    value={offerPrice.price?.recurring?.intervalCount}
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
