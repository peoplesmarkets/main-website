import _ from "lodash";

import styles from "./TextField.module.scss";
import { Show } from "solid-js";
import { slugify } from "../../lib";

type Props = {
  readonly label: string;
  readonly errors: string[];
  readonly required?: boolean;
  readonly value?: string;
  readonly onValue: (_value: string) => void;
  readonly small?: boolean;
};

export function TextField(props: Props) {
  return (
    <div class={styles.TextField}>
      <input
        type="text"
        id={slugify(props.label)}
        class={styles.Input}
        classList={{
          [styles.Small]: Boolean(props.small),
          [styles.HasErrors]: !_.isEmpty(props.errors),
        }}
        name={slugify(props.label)}
        placeholder={props.label}
        required={!!props.required}
        value={props.value || ""}
        onInput={(event) => props.onValue(event.currentTarget.value)}
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
