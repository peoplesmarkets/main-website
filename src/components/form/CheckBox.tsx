import { Show, createEffect, createSignal } from "solid-js";
import styles from "./CheckBox.module.scss";
import { CheckBoxCheckedIcon } from "../icons/CheckboxCheckedIcon";
import { CheckBoxUncheckedIcon } from "../icons/CheckboxUncheckedIcon";
import _ from "lodash";

type Props = {
  readonly label: string;
  readonly onValue: (_value: boolean) => void;
  readonly value?: boolean;
};

export function CheckBox(props: Props) {
  const [checked, setChecked] = createSignal<boolean>();

  createEffect(() => {
    if (!_.isNil(props.value) && _.isNil(checked())) {
      setChecked(props.value);
    }
  });

  function handleInput() {
    setChecked(!checked());
    const c = checked();
    if (!_.isNil(c)) {
      props.onValue(c);
    }
  }

  return (
    <div class={styles.CheckBox} onClick={handleInput}>
      <label class={styles.Label}>{props.label}</label>
      <Show when={checked()}>
        <CheckBoxCheckedIcon class={styles.Icon} />
      </Show>
      <Show when={!checked()}>
        <CheckBoxUncheckedIcon class={styles.Icon} />
      </Show>
    </div>
  );
}
