import _ from "lodash";
import { For, Show, createSignal } from "solid-js";

import { clickOutside } from "../../directives";
import { CloseIcon } from "../icons";
import Chevron from "../icons/Chevron";
import styles from "./Select.module.scss";

false && clickOutside;

export type Option = {
  key: string | number;
  name: string;
  [key: string]: string | number;
};

type Props = {
  readonly label: string;
  readonly options: () => Option[];
  readonly value: () => Option | string | number | undefined;
  readonly class?: string;
  readonly expandHeight?: boolean;
  readonly emptyLabel?: string;
} & (
  | {
      readonly nullable: true;
      readonly onValue?: (_value: string | number | null) => void;
    }
  | {
      readonly nullable?: false;
      readonly onValue?: (_value: string | number) => void;
    }
);

export function Select(props: Props) {
  // const [selected, setSelected] = createSignal<Option | undefined>();
  const [showSuggestionList, setShowSuggestionList] = createSignal(false);

  // createEffect(() => {
  //   const value = props.value?.();
  //   if (_.isString(value) || _.isNumber(value)) {
  //     setSelected(_.find(props.options(), { key: value }));
  //   } else {
  //     setSelected(value);
  //   }
  // });

  function anySelected() {
    return !_.isNil(props.value());
  }

  function selecting() {
    return showSuggestionList();
  }

  function isSelected(option: Option) {
    const value = props.value();

    if (_.isString(value) || _.isNumber(value)) {
      return value === option.key;
    }
    return value?.key === option.key;
  }

  function isEmpty() {
    return props.options().length <= 0;
  }

  function labelOrValue() {
    if (isEmpty() && props.emptyLabel) {
      return props.emptyLabel;
    }

    const value = props.value();

    if (_.isNil(value) || _.isString(value) || _.isNumber(value)) {
      return props.label;
    }

    return value.name;
  }

  function showClearIcon() {
    return selecting() && !_.isNil(props.value()) && props.nullable;
  }

  function handleShowSuggestionList() {
    if (isEmpty()) {
      return;
    }
    setShowSuggestionList(!showSuggestionList());
  }

  function handleCloseSuggestionList() {
    setShowSuggestionList(false);
  }

  function handleSelect(option: Option) {
    // setSelected(option as Option);
    props.onValue?.(option.key);
    setShowSuggestionList(false);
  }

  function handleRemoveSelection() {
    if (props.nullable) {
      // setSelected();
      props.onValue?.(null);
      setShowSuggestionList(false);
    }
  }

  return (
    <div
      class={props.class || styles.SelectContainer}
      classList={{ [styles.isEmpty]: isEmpty() }}
      onClick={handleShowSuggestionList}
      use:clickOutside={handleCloseSuggestionList}
    >
      <div
        class={styles.Select}
        classList={{
          [styles.ExpandHeight]: props.expandHeight,
          [styles.IsSelected]: anySelected(),
        }}
      >
        <span
          class={styles.Label}
          classList={{ [styles.LabelSelecting]: selecting() }}
        >
          {props.label}
        </span>

        <span
          classList={{
            [styles.Hide]: selecting(),
            [styles.Placeholder]: !anySelected(),
          }}
        >
          {labelOrValue()}
        </span>

        <Show when={!isEmpty()}>
          <Chevron
            class={styles.ChevronIcon}
            classList={{ [styles.IsSelected]: !_.isNil(props.value()) }}
            direction={() => (showSuggestionList() ? "up" : "down")}
          />
        </Show>
      </div>

      <div class={styles.ListHandle}>
        <Show when={showSuggestionList()}>
          <div class={styles.List}>
            <For each={props.options()}>
              {(option) => (
                <div class={styles.ListItem}>
                  <button
                    class={styles.Option}
                    classList={{
                      [styles.IsSelected]: isSelected(option),
                    }}
                    onClick={() => handleSelect(option)}
                  >
                    {option.name}
                  </button>
                  <Show when={showClearIcon() && isSelected(option)}>
                    <CloseIcon
                      class={styles.CloseIcon}
                      onClick={handleRemoveSelection}
                    />
                  </Show>
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
