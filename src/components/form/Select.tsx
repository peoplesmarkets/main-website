import _ from "lodash";
import { For, Match, Show, Switch, createSignal } from "solid-js";
import Chevron from "../icons/Chevron";
import styles from "./Select.module.scss";
import { clickOutside } from "../../directives";
import { CloseIcon } from "../icons";

false && clickOutside;

export type Option = {
  key: string;
  name: string;
};

type Props = {
  readonly label: string;
  readonly options: () => Option[];
  readonly class?: string;
  readonly initial?: Option;
} & (
  | {
      readonly nullable: true;
      readonly onValue?: (_value: string | null) => void;
    }
  | {
      readonly initial: Option;
      readonly nullable?: false;
      readonly onValue?: (_value: string) => void;
    }
);

export function Select(props: Props) {
  const [selected, setSelected] = createSignal(props.initial);
  const [showSuggestionList, setShowSuggestionList] = createSignal(false);

  function anySelected() {
    return !_.isNil(selected());
  }

  function selecting() {
    return showSuggestionList();
  }

  function isSelected(option: Option) {
    return selected()?.key === option.key;
  }

  function labelOrValue() {
    if (_.isNil(selected()?.name)) {
      return props.label;
    }
    return selected()?.name;
  }

  function showClearIcon() {
    return selecting() && selected() && props.nullable;
  }

  function handleShowSuggestionList() {
    setShowSuggestionList(!showSuggestionList());
  }

  function handleCloseSuggestionList() {
    setShowSuggestionList(false);
  }

  function handleSelect(option: Option) {
    setSelected(option as Option);
    props.onValue?.(option.key);
    setShowSuggestionList(false);
  }

  function handleRemoveSelection() {
    if (props.nullable) {
      setSelected();
      props.onValue?.(null);
      setShowSuggestionList(false);
    }
  }

  return (
    <div
      class={props.class || styles.SelectContainer}
      onClick={handleShowSuggestionList}
      use:clickOutside={handleCloseSuggestionList}
    >
      <div
        class={styles.Select}
        classList={{ [styles.IsSelected]: anySelected() }}
      >
        <span
          class={styles.Label}
          classList={{ [styles.LabelSelecting]: selecting() }}
        >
          {props.label}
        </span>

        <span classList={{ [styles.Hide]: selecting() }}>{labelOrValue()}</span>

        {/* <Show when={!showClearIcon()}> */}
        <Chevron
          class={styles.ChevronIcon}
          classList={{ [styles.IsSelected]: !_.isNil(selected()) }}
          direction={() => (showSuggestionList() ? "up" : "down")}
        />
        {/* </Show> */}
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
