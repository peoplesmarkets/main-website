import _ from "lodash";
import { For, createEffect } from "solid-js";

import styles from "./Select.module.scss";

export type Option = {
  key: string;
  name: string;
};

type Props = {
  readonly label: string;
  readonly options: Option[];
  readonly selected: () => string | undefined;
  readonly onValue: (value: string) => void;
};

function option(option: Option, selected: boolean) {
  return (
    <option value={option.key} selected={selected}>
      {option.name}
    </option>
  );
}

export default function Select(props: Props) {
  let selectElement: HTMLSelectElement | undefined;

  createEffect(() => {
    props.selected();
    selectElement?.focus();
  });

  function handleChange(key: string) {
    props.onValue(key);
  }

  return (
    <div class={styles.SelectField}>
      <select
        ref={selectElement}
        class={styles.Select}
        onChange={({ currentTarget }) => handleChange(currentTarget.value)}
      >
        <For each={props.options}>
          {(o) => option(o, o.key === props.selected())}
        </For>
      </select>

      <label class={styles.Label}>{props.label}</label>
    </div>
  );
}
