import { Trans, useTransContext } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { Dialog } from "../layout/Dialog";
import { ActionButton } from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";

type Props = {
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export function ResumeConfirmationDialog(props: Props) {
  const [trans] = useTransContext();

  return (
    <Dialog title={trans(TKEYS.subscription.resume)} onClose={props.onCancel}>
      <div class={styles.Footer}>
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="active-filled" onClick={props.onConfirmation}>
          <Trans key={TKEYS.common.resume} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
