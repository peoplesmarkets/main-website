import { Trans } from "@mbarzda/solid-i18next";
import { JSX, Show } from "solid-js";

import { TKEYS } from "../../locales";
import { MdDialog } from "../layout/MdDialog";
import { ActionButton } from "./ActionButton";
import _ from "lodash";
import { Font } from "../content";

type Props = {
  readonly show: boolean | undefined;
  readonly children?: JSX.Element | undefined;
  readonly item?: string;
  readonly itemName?: string | undefined;
  readonly onConfirmation: () => void;
  readonly onCancel: () => void;
};

export function DeleteConfirmationDialog(props: Props) {
  return (
    <MdDialog open={Boolean(props.show)} onClose={props.onCancel}>
      <div slot="headline">
        <Trans key={TKEYS.form.action["Confirm-Deletion?"]} />
      </div>

      <div slot="content">
        <Show
          when={_.isNil(props.children) || _.isEmpty(props.children)}
          fallback={props.children}
        >
          <Font
            type="body"
            key={TKEYS.form.action["Are-you-sure-you-want-to-delete-the-item"]}
            options={{
              item: props.item,
              name: props.itemName,
            }}
          />
        </Show>
      </div>

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
