import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";

import { centsToDecimal } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { getCurrencyCode } from "../../services";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferPrice.module.scss";

type Props = {
  offer: () => OfferResponse | undefined;
  class?: string;
};

export function OfferPrice(props: Props) {
  const [trans] = useTransContext();

  function priceDecimal() {
    const unitAmont = props.offer()?.price?.unitAmont;
    if (!_.isNil(unitAmont)) {
      return centsToDecimal(unitAmont, trans(TKEYS.price["decimal-point"]));
    }
  }

  function currencyCode() {
    const currency = props.offer()?.price?.currency;
    if (!_.isNil(currency)) {
      return getCurrencyCode(currency);
    }
  }

  return (
    <span class={props.class || styles.Price}>
      {priceDecimal()} {currencyCode()}
    </span>
  );
}
