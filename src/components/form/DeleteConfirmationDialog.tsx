import { Trans } from "@mbarzda/solid-i18next";
import { JSX } from "solid-js";

import { TKEYS } from "../../locales";
import { MdDialog } from "../layout/MdDialog";
import { ActionButton } from "./ActionButton";

type Props = {
  readonly show: boolean;
  readonly children?: JSX.Element | undefined;
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export function DeleteConfirmationDialog(props: Props) {
  return (
    <MdDialog open={props.show} onClose={props.onCancel}>
      <div slot="headline">
        <Trans key={TKEYS.form.action["Confirm-Deletion?"]} />
      </div>

      <div slot="content">{props.children}</div>

      <div slot="actions">
        <ActionButton actionType="neutral" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="danger" onClick={props.onConfirmation}>
          <Trans key={TKEYS.form.action.Delete} />
        </ActionButton>
      </div>
    </MdDialog>
  );
}
