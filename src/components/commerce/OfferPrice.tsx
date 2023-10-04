import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";

import { centsToDecimal } from "../../lib";
import { TKEYS } from "../../locales";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import {
  currencyToJSON,
  recurringIntervalToJSON,
} from "../../services/peoplesmarkets/commerce/v1/price";
import styles from "./OfferPrice.module.scss";

type Props = {
  readonly offer: () => OfferResponse | undefined;
  readonly class?: string;
  readonly small?: boolean;
};

export function OfferPrice(props: Props) {
  const [trans] = useTransContext();

  function priceDecimal() {
    const unitAmount = props.offer()?.price?.unitAmount;
    if (!_.isNil(unitAmount)) {
      return centsToDecimal(unitAmount, trans(TKEYS.price["decimal-point"]));
    }
  }

  function currencyCode() {
    const currency = props.offer()?.price?.currency;
    if (!_.isNil(currency)) {
      return trans(TKEYS.price.currency[currencyToJSON(currency)]);
    }
  }

  function recurringIntervalCount() {
    const intervalCount = props.offer()?.price?.recurring?.intervalCount;
    if (!_.isNil(intervalCount) && intervalCount > 1) {
      return intervalCount;
    }
  }

  function recurringInterval() {
    const interval = props.offer()?.price?.recurring?.interval;
    if (!_.isNil(interval)) {
      return trans(
        TKEYS.price["recurring-interval"][recurringIntervalToJSON(interval)],
        {
          intervalCount: props.offer()?.price?.recurring?.intervalCount,
        }
      );
    }
  }

  function trialPeriodDays() {
    return props.offer()?.price?.recurring?.trialPeriodDays;
  }

  return (
    <>
      <div class={props.class || styles.OfferPrice}>
        <span
          class={styles.Price}
          classList={{ [styles.PriceSmall]: Boolean(props.small) }}
        >
          {priceDecimal()} {currencyCode()}{" "}
        </span>

        <Show when={!_.isNil(props.offer()?.price?.recurring)}>
          <span
            class={styles.Recurring}
            classList={{ [styles.Small]: Boolean(props.small) }}
          >
            / {recurringIntervalCount()} {recurringInterval()}
          </span>
        </Show>
        <Show when={!_.isNil(trialPeriodDays()) && trialPeriodDays()! > 0}>
          <span
            class={styles.TrialPeriod}
            classList={{ [styles.Small]: Boolean(props.small) }}
          >
            {trialPeriodDays()}{" "}
            <Trans
              key={TKEYS.price["days-free"]}
              options={{ periodDays: trialPeriodDays() }}
            />
          </span>
        </Show>
      </div>
    </>
  );
}
