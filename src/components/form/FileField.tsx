import _ from "lodash";
import styles from "./FileField.module.scss";
import { Show } from "solid-js";
import { slugify } from "../../lib";

type Props = {
  readonly label: string;
  readonly errors: string[];
  readonly required?: boolean;
  readonly onValue: (_value: FileList | null) => void;
  readonly showLabel?: boolean;
};

export function FileField(props: Props) {
  return (
    <div class={styles.FileField}>
      <input
        id={slugify(props.label)}
        type="file"
        class={styles.Input}
        classList={{
          [styles.HasErrors]: !_.isEmpty(props.errors),
        }}
        name={slugify(props.label)}
        placeholder={props.label}
        required={Boolean(props.required)}
        onInput={(event) => props.onValue(event.currentTarget.files)}
      />
      <label
        class={styles.Label}
        classList={{ [styles.ShowLabel]: Boolean(props.showLabel) }}
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
