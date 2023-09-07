import _ from "lodash";
import { For, Show, createSignal, onMount } from "solid-js";
import { clickOutside } from "../../directives";
import { CloseIcon } from "../icons";
import Chevron from "../icons/Chevron";
import styles from "./Select.module.scss";

false && clickOutside;

export type Option = {
  key: string;
  name: string;
  [key: string]: string;
};

type Props = {
  readonly label: string;
  readonly options: () => Option[];
  readonly class?: string;
  readonly initial?: Option;
  readonly expandHeight?: boolean;
} & (
  | {
      readonly nullable: true;
      readonly onValue?: (_value: string | null) => void;
    }
  | {
      readonly nullable?: false;
      readonly onValue?: (_value: string) => void;
    }
);

export function Select(props: Props) {
  const [selected, setSelected] = createSignal<Option | undefined>();
  const [showSuggestionList, setShowSuggestionList] = createSignal(false);

  onMount(() => {
    if (_.isNil(selected()) && !_.isNil(props.initial)) {
      setSelected(props.initial);
    }
  });

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

        <Chevron
          class={styles.ChevronIcon}
          classList={{ [styles.IsSelected]: !_.isNil(selected()) }}
          direction={() => (showSuggestionList() ? "up" : "down")}
        />
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
