import { For, createEffect } from "solid-js";

import styles from "./Select.module.scss";

export type Option = {
  key: string;
  name: string;
};

type Props = {
  readonly label: string;
  readonly options: () => Option[];
  readonly selected: () => string | undefined;
  readonly onValue: (_value: string) => void;
  readonly class?: string;
};

function option(option: Option, selected: boolean) {
  return (
    <option value={option.key} selected={selected}>
      {option.name}
    </option>
  );
}

export function Select(props: Props) {
  let selectElement: HTMLSelectElement | undefined;

  createEffect(() => {
    props.selected();
    selectElement?.focus();
  });

  function handleChange(key: string) {
    props.onValue(key);
  }

  return (
    <div class={props.class || styles.SelectField}>
      <select
        ref={selectElement}
        onChange={({ currentTarget }) => handleChange(currentTarget.value)}
      >
        <For each={props.options()}>
          {(o) => option(o, o.key === props.selected())}
        </For>
      </select>

      <label>{props.label}</label>
    </div>
  );
}
