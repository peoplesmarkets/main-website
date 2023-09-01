import { For } from "solid-js";

import styles from "./Select.module.scss";

export type Option = {
  key: string;
  name: string;
};

type Props = {
  readonly label: string;
  readonly options: () => Option[];
  readonly selected?: () => string | undefined;
  readonly onValue: (_value: string) => void;
  readonly class?: string;
};

export function Select(props: Props) {
  function handleChange(key: string) {
    props.onValue(key);
  }

  return (
    <div class={props.class || styles.SelectField}>
      <select
        onChange={({ currentTarget }) => handleChange(currentTarget.value)}
      >
        <For each={props.options()}>
          {(option) => (
            <option
              value={option.key}
              selected={option.key === props.selected?.()}
            >
              {option.name}
            </option>
          )}
        </For>
      </select>

      <label>{props.label}</label>
    </div>
  );
}
