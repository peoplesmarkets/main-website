import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import { LANGUAGES } from "../../locales";
import styles from "./PriceField.module.scss";
import { slugify } from "../../lib";

type Props = {
  readonly label: string;
  readonly errors: string[];
  readonly required?: boolean;
  readonly initial?: number;
  readonly onValue: (_value: number) => void;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const DE_DECIMAL_POINT = ",";
const EN_DECIMAL_POINT = ".";
const MAX_DECIMALS = 2;

export function PriceField(props: Props) {
  const [, { getI18next }] = useTransContext();

  const [value, setValue] = createSignal("");

  onMount(() => {
    if (!_.isNil(props.initial) && _.isNumber(props.initial)) {
      let decimal = (props.initial / 100).toString();
      if (getI18next().language === LANGUAGES.german) {
        decimal = decimal.replace(EN_DECIMAL_POINT, DE_DECIMAL_POINT);
      }
      setValue(decimal);
      handleLeaveInput();
    }
  });

  function clean(value: string) {
    const decimalPoint =
      getI18next().language === LANGUAGES.german
        ? DE_DECIMAL_POINT
        : EN_DECIMAL_POINT;

    let cleaned = "";

    for (const char of value) {
      if (cleaned === "") {
        if (char === decimalPoint || char === "0") {
          continue;
        }
      }

      if (
        cleaned.includes(decimalPoint) &&
        cleaned.split(decimalPoint)[1].length >= MAX_DECIMALS
      ) {
        continue;
      }

      if (DIGITS.includes(char)) {
        cleaned += char;
        continue;
      }

      if (char === decimalPoint && !cleaned.includes(char)) {
        cleaned += char;
      }
    }

    // trigger signal update
    setValue("#");

    setValue(cleaned);
  }

  function toCents(): number {
    let decimal = _.clone(value());

    if (getI18next().language === LANGUAGES.german) {
      decimal = decimal.replace(DE_DECIMAL_POINT, EN_DECIMAL_POINT);
    }

    return parseFloat(decimal) * 100;
  }

  function handleInput(target: EventTarget & HTMLInputElement) {
    const pos = target.selectionStart ? target.selectionStart : 0;
    const copy = _.clone(target.value);

    clean(target.value);

    if (value() === copy) {
      target.setSelectionRange(pos, pos);
    } else {
      target.setSelectionRange(pos - 1, pos - 1);
    }

    props.onValue(toCents());
  }

  function handleLeaveInput() {
    if (_.isEmpty(value())) {
      return;
    }

    const decimalPoint =
      getI18next().language === LANGUAGES.german
        ? DE_DECIMAL_POINT
        : EN_DECIMAL_POINT;

    if (value().includes(decimalPoint)) {
      const rest = value().split(decimalPoint)[1].length;
      if (rest < MAX_DECIMALS) {
        setValue(value() + "0".repeat(MAX_DECIMALS - rest));
      }
    } else {
      setValue(value() + `${decimalPoint}00`);
    }
  }

  return (
    <div class={styles.PriceInput}>
      <input
        type="text"
        inputmode="decimal"
        class={styles.Input}
        classList={{ [styles.HasErrors]: !_.isEmpty(props.errors) }}
        id={slugify(props.label)}
        name={slugify(props.label)}
        placeholder={props.label}
        value={value()}
        required={!!props.required}
        onInput={({ currentTarget }) => handleInput(currentTarget)}
        onFocusOut={handleLeaveInput}
      />

      <label
        class={styles.Label}
        for={slugify(props.label)}
        classList={{ [styles.LabelEdited]: !_.isEmpty(value()) }}
      >
        {props.label}
      </label>

      <Show when={!_.isEmpty(props.errors)}>
        <span class={styles.Error}>{props.errors}</span>
      </Show>
    </div>
  );
}
