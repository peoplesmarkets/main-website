import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferPrice.module.scss";
import { centsToDecimal } from "../../lib";
import _ from "lodash";
import { getCurrencyCode } from "../../services";

type Props = {
  offer: () => OfferResponse | undefined;
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
    <div class={styles.OfferPrice}>
      <span class={styles.Title}>
        <Trans key={TKEYS.offer.labels.Price} />:{" "}
      </span>
      <span class={styles.Title}>
        {priceDecimal()} {currencyCode()}
      </span>
    </div>
  );
}
