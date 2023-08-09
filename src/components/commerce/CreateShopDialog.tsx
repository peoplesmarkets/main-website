import _ from "lodash";
import { createSignal } from "solid-js";

import TextArea from "../form/TextArea";
import TextField from "../form/TextField";
import Dialog from "../layout/Dialog";
import styles from "./CreateShopDialog.module.scss";
import ActionButton from "../form/ActionButton";

export type CreateShop = {
  name: string;
  description: string;
};

type Props = {
  onValue: (shop: CreateShop) => void;
  onClose: () => void;
};

export default function CreateShopDialog(props: Props) {
  const [nameInput, setNameInput] = createSignal("");
  const [descriptionInput, setDescriptionInput] = createSignal("");

  function onNameInput(value: string) {
    setNameInput(value);
  }

  function onDescriptionInput(value: string) {
    setDescriptionInput(value);
  }

  async function createShop(event: SubmitEvent) {
    event.preventDefault();
    props.onValue({ name: nameInput(), description: descriptionInput() });
  }

  function closeDialog() {
    if (_.isEmpty(nameInput()) && _.isEmpty(descriptionInput())) {
      props.onClose();
    }
  }

  return (
    <>
      <Dialog title="Create a new Shop" onClose={closeDialog}>
        <form class={styles.Form} onSubmit={createShop}>
          <TextField
            name="name"
            label="name"
            required={true}
            value={nameInput()}
            onValue={onNameInput}
          />

          <div class={styles.Spacer}></div>

          <TextArea
            name="description"
            label="description"
            rows={8}
            required={false}
            value={descriptionInput()}
            onValue={onDescriptionInput}
          />

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="danger"
              onClick={closeDialog}
              noBorder={true}
            >
              Cancel
            </ActionButton>

            <ActionButton
              actionType="active"
              onClick={createShop}
              noBorder={true}
            >
              Save
            </ActionButton>
          </div>
        </form>
      </Dialog>
    </>
  );
}
