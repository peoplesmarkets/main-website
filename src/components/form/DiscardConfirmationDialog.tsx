import { Trans } from "@mbarzda/solid-i18next";
import { JSX } from "solid-js";

import { TKEYS } from "../../locales";
import { Font } from "../content";
import { MdDialog } from "../layout/MdDialog";
import { ActionButton } from "./ActionButton";

type Props = {
  readonly show: boolean;
  readonly children?: JSX.Element | undefined;
  readonly onDiscard: () => void;
  readonly onCancel: () => void;
};

export function DiscardConfirmationDialog(props: Props) {
  return (
    <MdDialog open={props.show} onClose={props.onCancel}>
      <div slot="headline">
        <Font type="title" key={TKEYS.form.action["Discard-unsafed-changes"]} />
      </div>

      <div slot="content">{props.children}</div>

      <div slot="actions">
        <ActionButton actionType="neutral-borderless" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </ActionButton>

        <ActionButton actionType="danger" onClick={props.onDiscard}>
          <Trans key={TKEYS.form.action.Discard} />
        </ActionButton>
      </div>
    </MdDialog>
  );
}
