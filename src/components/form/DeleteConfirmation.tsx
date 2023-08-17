import { Show } from "solid-js";

import Dialog from "../layout/Dialog";
import ActionButton from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";

type Props = {
  readonly item: string;
  readonly itemName: string | undefined;
  readonly showSignal: boolean;
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export default function DeleteConfirmation(props: Props) {
  return (
    <Show when={props.showSignal}>
      <Dialog title="Confirm Deletion?" onClose={props.onCancel}>
        <div class={styles.Information}>
          <p>
            Are you sure you want to delete the {props.item}{" "}
            <strong>{props.itemName || ""}</strong>?
          </p>
        </div>

        <div class={styles.Footer}>
          <ActionButton
            actionType="neutral-borderless"
            onClick={props.onCancel}
          >
            Cancel
          </ActionButton>

          <ActionButton actionType="danger" onClick={props.onConfirmation}>
            Delete
          </ActionButton>
        </div>
      </Dialog>
    </Show>
  );
}
