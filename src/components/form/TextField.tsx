import _ from "lodash";

import styles from "./TextField.module.scss";

type Props = {
  readonly name: string;
  readonly label: string;
  readonly required?: boolean;
  readonly value?: string;
  readonly onValue: (value: string) => void;
};

export default function TextField(props: Props) {
  return (
    <div class={styles.TextField}>
      <input
        type="text"
        class={styles.Input}
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
    </div>
  );
}
