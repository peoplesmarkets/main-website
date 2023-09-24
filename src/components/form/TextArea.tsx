import _ from "lodash";

import styles from "./TextArea.module.scss";
import { Show } from "solid-js";
import { slugify } from "../../lib";

type Props = {
  readonly label: string;
  readonly rows: number;
  readonly errors: string[];
  readonly required?: boolean;
  readonly value?: string;
  readonly onValue: (_value: string) => void;
};

export function TextArea(props: Props) {
  return (
    <div class={styles.TextArea}>
      <textarea
        style={{
          height: `${props.rows}em`,
        }}
        class={styles.Input}
        classList={{ [styles.HasErrors]: !_.isEmpty(props.errors) }}
        id={slugify(props.label)}
        name={slugify(props.label)}
        placeholder={props.label}
        required={!!props.required}
        value={props.value}
        onInput={(event) => {
          props.onValue(event.currentTarget.value);
        }}
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
