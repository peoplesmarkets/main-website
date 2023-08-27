import { Trans } from "@mbarzda/solid-i18next";
import { Dialog } from "../layout";
import { ActionButton } from "./ActionButton";
import styles from "./Message.module.scss";
import { TKEYS } from "../../locales/dev";
import { JSX } from "solid-js";

type Props = {
  readonly title: string;
  readonly onClose: () => void;
  readonly children: JSX.Element;
};

export function Message(props: Props) {
  return (
    <Dialog title={props.title} onClose={props.onClose}>
      <span class={styles.Message}>{props.children}</span>
      <div class={styles.Footer}>
        <ActionButton actionType="neutral" onClick={props.onClose}>
          <Trans key={TKEYS.form.action.OK} />
        </ActionButton>
      </div>
    </Dialog>
  );
}
