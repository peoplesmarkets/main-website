import _ from "lodash";

import styles from "./TextArea.module.scss";
import { Show } from "solid-js";

type Props = {
  readonly name: string;
  readonly label: string;
  readonly rows: number;
  readonly errors: string[];
  readonly required?: boolean;
  readonly value?: string;
  readonly onValue: (value: string) => void;
};

export default function TextArea(props: Props) {
  return (
    <div class={styles.TextArea}>
      <textarea
        style={{
          height: `${props.rows}em`,
        }}
        class={styles.Input}
        classList={{ [styles.HasErrors]: !_.isEmpty(props.errors) }}
        name={props.name}
        placeholder={props.label}
        required={!!props.required}
        value={props.value}
        onInput={(event) => {
          props.onValue(event.currentTarget.value);
        }}
      ></textarea>
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
