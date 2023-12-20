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

export function ResumeConfirmationDialog(props: Props) {
  return (
    <>
      <MdDialog open={props.show} onClose={props.onClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.subscription.resume} />
        </div>

        <div slot="content" />

        <div slot="actions">
          <ActionButton actionType="neutral" onClick={props.onClose}>
            <Trans key={TKEYS.form.action.Cancel} />
          </ActionButton>

          <ActionButton actionType="active" onClick={props.onConfirmation}>
            <Trans key={TKEYS.common.resume} />
          </ActionButton>
        </div>
      </MdDialog>
    </>
  );
}
