import _ from "lodash";

import styles from "./TextField.module.scss";
import { Show } from "solid-js";

type Props = {
  readonly name: string;
  readonly label: string;
  readonly errors: string[];
  readonly required?: boolean;
  readonly value?: string;
  readonly onValue: (_value: string) => void;
};

export function TextField(props: Props) {
  return (
    <div class={styles.TextField}>
      <input
        type="text"
        class={styles.Input}
        classList={{ [styles.HasErrors]: !_.isEmpty(props.errors) }}
        name={props.name}
        placeholder={props.label}
        required={!!props.required}
        value={props.value}
        onInput={(event) => props.onValue(event.currentTarget.value)}
      />
      <label
        class={styles.Label}
        classList={{ [styles.LabelEdited]: !_.isEmpty(props.value) }}
      >
        {props.label}
      </label>
      <Show when={!_.isEmpty(props.errors)}>
        <span class={styles.ErrorInfo}>{props.errors}</span>
      </Show>
    </div>
  );
}
