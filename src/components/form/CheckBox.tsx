import { Show } from "solid-js";

import { CheckBoxCheckedIcon } from "../icons/CheckboxCheckedIcon";
import { CheckBoxUncheckedIcon } from "../icons/CheckboxUncheckedIcon";
import styles from "./CheckBox.module.scss";

type Props = {
  readonly label?: string;
  readonly onValue: (_value: boolean) => void;
  readonly value: () => boolean | undefined;
  readonly noLabel?: boolean;
};

export function CheckBox(props: Props) {
  function handleCheck() {
    props.onValue(!props.value());
  }
  return (
    <>
      <div class={styles.CheckBox} onClick={handleCheck}>
        <Show
          when={Boolean(props.value())}
          fallback={
            <>
              <Show when={!props.noLabel}>
                <label class={styles.Label}>{props.label}</label>
              </Show>
              <CheckBoxUncheckedIcon class={styles.Icon} />
            </>
          }
        >
          <>
            <Show when={!props.noLabel}>
              <label class={styles.Label}>{props.label}</label>
            </Show>
            <CheckBoxCheckedIcon class={styles.IconChecked} />
          </>
        </Show>
      </div>
    </>
  );
}
