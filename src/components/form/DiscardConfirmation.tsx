import { Show } from "solid-js";

import Dialog from "../layout/Dialog";
import ActionButton from "./ActionButton";
import styles from "./DiscardConfirmation.module.scss";

type Props = {
  readonly showSignal: boolean;
  readonly onDiscard: () => void;
  readonly onCancel: () => void;
};

export default function DiscardConfirmation(props: Props) {
  return (
    <Show when={props.showSignal}>
      <Dialog title="Discard unsaved changes?" onClose={props.onCancel}>
        <div class={styles.Footer}>
          <ActionButton
            actionType="neutral-borderless"
            onClick={props.onCancel}
          >
            Cancel
          </ActionButton>

          <ActionButton
            actionType="neutral-borderless"
            onClick={props.onDiscard}
          >
            Discard
          </ActionButton>
        </div>
      </Dialog>
    </Show>
  );
}
