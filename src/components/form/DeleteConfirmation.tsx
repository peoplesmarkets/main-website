import { Trans, useTransContext } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { Dialog } from "../layout/Dialog";
import { ActionButton } from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";
import { Show } from "solid-js";
import _ from "lodash";

type Props = {
  readonly item?: string;
  readonly itemName?: string | undefined;
  readonly message?: string;
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export function DeleteConfirmation(props: Props) {
  const [trans] = useTransContext();

  return (
    <Dialog
      title={trans(TKEYS.form.action["Confirm-Deletion?"])}
      onClose={props.onCancel}
    >
      <div class={styles.Information}>
        <p>
          <Show when={_.isNil(props.message)} fallback={props.message}>
            <Trans
              key={
                TKEYS.form.action["Are-you-sure-you-want-to-delete-the-item"]
              }
              options={{
                item: props.item,
                name: props.itemName,
              }}
            />
          </Show>
        </p>
      </div>

      <div class={styles.Footer}>
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="danger" onClick={props.onConfirmation}>
          <Trans key={TKEYS.form.action.Delete} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
