import { Trans, useTransContext } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { Dialog } from "../layout/Dialog";
import { ActionButton } from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";

type Props = {
  readonly onDiscard: () => void;
  readonly onCancel: () => void;
};

export function DiscardConfirmation(props: Props) {
  const [trans] = useTransContext();

  return (
    <Dialog
      title={trans(TKEYS.form.action["Discard-unsafed-changes"])}
      onClose={props.onCancel}
    >
      <div class={styles.Footer}>
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="neutral-borderless" onClick={props.onDiscard}>
          <Trans key={TKEYS.form.action.Discard} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
