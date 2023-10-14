import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";

import { TKEYS } from "../../locales";
import { Dialog } from "../layout/Dialog";
import { ActionButton, ActionType } from "./ActionButton";
import styles from "./DeleteConfirmation.module.scss";

type Props = {
  readonly title: string;
  readonly message?: string;
  readonly onOk: () => void;
  readonly onCancel: () => void;
  readonly actionType: ActionType;
};

export function ConfirmationDialog(props: Props) {
  return (
    <Dialog title={props.title} onClose={props.onCancel}>
      <Show when={!_.isEmpty(props.message)}>
        <div class={styles.Information}>
          <span class={styles.Body}>{props.message}</span>
        </div>
      </Show>

      <div class={styles.Footer}>
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType={props.actionType} onClick={props.onOk}>
          <Trans key={TKEYS.form.action.Accept} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
