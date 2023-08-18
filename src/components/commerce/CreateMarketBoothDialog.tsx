import { grpc } from "@improbable-eng/grpc-web";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
  Dialog,
  HSpace,
} from "@peoplesmarkets/frontend-lib/components";

import { MarketBoothServiceClient } from "../../../clients";
import { CreateMarketBoothRequest } from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import styles from "./CreateMarketBoothDialog.module.scss";

type Props = {
  onClose: () => void;
  onUpdate: (newMarketBoothId?: string) => void;
};

export default function CreateMarketBoothDialog(props: Props) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothServiceClient(accessToken);

  const [marketBooth, setMarketBooth] = createStore<CreateMarketBoothRequest>({
    name: "",
    description: "",
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

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
      setErrors("name", ["Required field"]);
      return;
    }

    try {
      const createdMarketBooth =
        await marketBoothService.client.CreateMarketBooth(
          marketBooth,
          await marketBoothService.withAuthHeader()
        );
      props.onUpdate(createdMarketBooth.marketBooth?.marketBoothId);
      props.onClose();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("name", ["Already exists"]);
      } else {
        throw err;
      }
    }
  }

  function closeDialog() {
    if (!_.isEmpty(marketBooth.name)) {
      setDiscardConfirmation(true);
    } else if (!_.isEmpty(marketBooth.description)) {
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
        <Dialog title="Create a new Market Booth" onClose={closeDialog}>
          <form class={styles.Form}>
            <TextField
              name="name"
              label="name"
              required={true}
              value={marketBooth.name}
              onValue={onNameInput}
              errors={errors.name}
            />

            <HSpace />

            <TextArea
              name="description"
              label="description"
              rows={8}
              required={false}
              value={marketBooth.description}
              onValue={onDescriptionInput}
              errors={errors.description}
            />

            <HSpace />
          </form>

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="active-filled"
              onClick={(e) => createMarketBooth(e)}
            >
              Save
            </ActionButton>
          </div>
        </Dialog>
      </Show>

      <DiscardConfirmation
        showSignal={discardConfirmation()}
        onCancel={continueEditing}
        onDiscard={confirmCloseDialog}
      />
    </>
  );
}
