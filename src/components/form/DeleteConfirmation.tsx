import { Show } from "solid-js";

import { ActionButton } from "@peoplesmarkets/frontend-lib";

import { Dialog } from "../layout/Dialog";
import styles from "./DeleteConfirmation.module.scss";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";

type Props = {
  readonly item: string;
  readonly itemName: string | undefined;
  readonly showSignal: boolean;
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export function DeleteConfirmation(props: Props) {
  const [trans] = useTransContext();

  return (
    <Show when={props.showSignal}>
      <Dialog
        title={trans(TKEYS.form.action["Confirm-Deletion?"])}
        onClose={props.onCancel}
      >
        <div class={styles.Information}>
          <p>
            <Trans
              key={TKEYS.form.action["Are-you-sure-you-want-to-delete-the"]}
              options={{
                item: props.item,
                name: props.itemName,
              }}
            />
          </p>
        </div>

        <div class={styles.Footer}>
          <ActionButton
            actionType="neutral-borderless"
            onClick={props.onCancel}
          >
            <Trans key={TKEYS.form.action.Cancel} />
          </ActionButton>

          <ActionButton actionType="danger" onClick={props.onConfirmation}>
            <Trans key={TKEYS.form.action.Delete} />
          </ActionButton>
        </div>
      </Dialog>
    </Show>
  );
}
