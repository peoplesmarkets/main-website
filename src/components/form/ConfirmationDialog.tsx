import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { Font } from "../content";
import { MdDialog } from "../layout/MdDialog";
import { ActionButton, ActionType } from "./ActionButton";

type Props = {
  readonly show: boolean;
  readonly title: string;
  readonly message?: string;
  readonly onOk: () => void;
  readonly onCancel: () => void;
  readonly actionType: ActionType;
};

export function ConfirmationDialog(props: Props) {
  return (
    <MdDialog open={props.show} onClose={props.onCancel}>
      <div slot="headline">
        <Font type="title">{props.title}</Font>
      </div>

      <div slot="content">
        <Font type="body">{props.message}</Font>
      </div>

      <div slot="actions">
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType={props.actionType} onClick={props.onOk}>
          <Trans key={TKEYS.form.action.Accept} />
        </ActionButton>
      </div>
    </MdDialog>
  );
}
