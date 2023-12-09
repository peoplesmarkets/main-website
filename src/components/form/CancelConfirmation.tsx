import { Trans, useTransContext } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { Dialog } from "../layout/Dialog";
import { ActionButton } from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";

type Props = {
  readonly onConfirmation: () => void;
  readonly onClose: () => void;
};

export function CancelConfirmation(props: Props) {
  const [trans] = useTransContext();

  return (
    <Dialog
      title={trans(TKEYS.form.action["Confirm-Cancellation"])}
      onClose={props.onClose}
    >
      <div class={styles.Footer}>
        <ActionButton actionType="danger" onClick={props.onClose}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="neutral" onClick={props.onConfirmation}>
          <Trans key={TKEYS.common.cancel} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
