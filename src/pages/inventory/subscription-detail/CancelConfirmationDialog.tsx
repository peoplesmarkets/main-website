import { Trans } from "@mbarzda/solid-i18next";

import { Font } from "../../../components/content";
import { ActionButton } from "../../../components/form/ActionButton";
import { MdDialog } from "../../../components/layout/MdDialog";
import { TKEYS } from "../../../locales";

type Props = {
  readonly show: boolean;
  readonly onConfirmation: () => void;
  readonly onClose: () => void;
};

export function CancelConfirmationDialog(props: Props) {
  return (
    <>
      <MdDialog open={props.show} onClose={props.onClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.form.action["Confirm-Cancellation"]} />
        </div>

        <div slot="content" />

        <div slot="actions">
          <ActionButton actionType="neutral" onClick={props.onClose}>
            <Trans key={TKEYS.form.action.Back} />
          </ActionButton>

          <ActionButton actionType="danger" onClick={props.onConfirmation}>
            <Trans key={TKEYS.common.cancel} />
          </ActionButton>
        </div>
      </MdDialog>
    </>
  );
}
