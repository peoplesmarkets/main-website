import _ from "lodash";
import styles from "./FileField.module.scss";
import { Show } from "solid-js";
import { slugify } from "../../lib";

type Props = {
  readonly label: string;
  readonly required?: boolean;
  readonly onValue: (_value: FileList | null) => void;
  readonly errors: string[];
  readonly image?: boolean | undefined;
  readonly showLabel?: boolean;
  readonly wide?: boolean | undefined;
  readonly active?: boolean | undefined;
};

export function FileField(props: Props) {
  return (
    <div
      class={styles.FileField}
      classList={{
        [styles.Wide]: Boolean(props.wide),
      }}
    >
      <input
        id={slugify(props.label)}
        type="file"
        class={styles.Input}
        classList={{
          [styles.HasErrors]: !_.isEmpty(props.errors),
          [styles.Active]: Boolean(props.active),
        }}
        accept={props.image ? "image/*" : "*"}
        name={slugify(props.label)}
        placeholder={props.label}
        required={Boolean(props.required)}
        onInput={(event) => props.onValue(event.currentTarget.files)}
      />
      <Show when={Boolean(props.showLabel)}>
        <label class={styles.Label} for={slugify(props.label)}>
          {props.label}
        </label>
      </Show>
      <Show when={!_.isEmpty(props.errors)}>
        <span class={styles.ErrorInfo}>{props.errors}</span>
      </Show>
    </div>
  );
}
