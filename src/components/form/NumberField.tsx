import _ from "lodash";
import { Show } from "solid-js";

import { slugify } from "../../lib";
import styles from "./NumberField.module.scss";

type Props = {
  readonly label: string;
  readonly errors: string[];
  readonly required?: boolean;
  readonly value?: number;
  readonly onValue: (_value: number) => void;
  readonly integer?: boolean;
  readonly small?: boolean;
};

export function NumberField(props: Props) {
  function handleValue(value: string) {
    if (props.integer) {
      props.onValue(parseInt(value, 10));
    } else {
      props.onValue(parseFloat(value));
    }
  }

  return (
    <div class={styles.NumberField}>
      <input
        type="number"
        id={slugify(props.label)}
        class={styles.Input}
        classList={{
          [styles.Small]: Boolean(props.small),
          [styles.HasErrors]: !_.isEmpty(props.errors),
        }}
        name={slugify(props.label)}
        placeholder={props.label}
        required={Boolean(props.required)}
        value={props.value || 0}
        onInput={(event) => handleValue(event.currentTarget.value)}
        min={props.integer ? 1 : undefined}
        step={props.integer ? 1 : undefined}
      />
      <label
        class={styles.Label}
        classList={{ [styles.LabelEdited]: !_.isEmpty(props.value) }}
        for={slugify(props.label)}
      >
        {props.label}
      </label>
      <Show when={!_.isEmpty(props.errors)}>
        <span class={styles.ErrorInfo}>{props.errors}</span>
      </Show>
    </div>
  );
}
