import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import { CreateMarketBoothRequest } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  onClose: () => void;
  onUpdate?: () => void;
};

export function CreateMarketBoothDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooth, setMarketBooth] = createStore<CreateMarketBoothRequest>({
    name: "",
    description: "",
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  function onNameInput(value: string) {
    setErrors("name", []);
    setMarketBooth("name", value);
  }

  function onDescriptionInput(value: string) {
    setErrors("description", []);
    setMarketBooth("description", value);
  }

  async function createMarketBooth(event: SubmitEvent) {
    event.preventDefault();

    if (_.isEmpty(marketBooth.name)) {
      setErrors("name", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      await marketBoothService.create(marketBooth);

      props.onUpdate?.();
      props.onClose();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("name", [trans(TKEYS.form.errors["already-exists"])]);
      } else {
        throw err;
      }
    }
  }

  function closeDialog() {
    if (!_.isEmpty(marketBooth.name) || !_.isEmpty(marketBooth.description)) {
      setDiscardConfirmation(true);
    } else {
      props.onClose();
    }
  }

  function confirmCloseDialog() {
    setDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    setErrors("name", []);
    setErrors("description", []);
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog
          title={trans(
            TKEYS.dashboard["market-booth"]["create-new-market-booth"]
          )}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={(e) => createMarketBooth(e)}>
            <TextField
              name="name"
              label={trans(TKEYS["market-booth"].labels.name)}
              required={true}
              value={marketBooth.name}
              onValue={onNameInput}
              errors={errors.name}
            />

            <TextArea
              name="description"
              label={trans(TKEYS["market-booth"].labels.description)}
              rows={8}
              required={false}
              value={marketBooth.description}
              onValue={onDescriptionInput}
              errors={errors.description}
            />
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              onClick={(e) => createMarketBooth(e)}
            >
              <Trans key={TKEYS.form.action.Save} />
            </ActionButton>
          </div>
        </Dialog>
      </Show>

      <Show when={discardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
