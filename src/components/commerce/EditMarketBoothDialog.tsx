import _ from "lodash";
import { Resource, Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import {
  ActionButton,
  Dialog,
  DiscardConfirmation,
  HSpace,
  TextArea,
  TextField,
} from "@peoplesmarkets/frontend-lib/components";

import { MarketBoothServiceClient } from "../../../clients";
import {
  MarketBoothResponse,
  UpdateMarketBoothRequest,
} from "../../../clients/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import styles from "./EditMarketBoothDialog.module.scss";
import { grpc } from "@improbable-eng/grpc-web";

type Props = {
  marketBooth: MarketBoothResponse;
  class?: string;
  onClose: () => void;
  onUpdate: (marketBooth?: MarketBoothResponse) => void;
};

export function EditMarketBoothDialog(props: Props) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothServiceClient(accessToken);

  const initialMarketBooth = _.cloneDeep(props.marketBooth);

  const [marketBooth, setMarketBooth] = createStore<UpdateMarketBoothRequest>(
    _.cloneDeep(props.marketBooth)
  );

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function onNameInput(value: string) {
    resetErrors();
    setMarketBooth("name", value.trim());
  }

  function onDescriptionInput(value: string) {
    resetErrors();
    setMarketBooth("description", value.trim());
  }

  function dataWasChanged() {
    return (
      marketBooth.name !== initialMarketBooth.name ||
      marketBooth.description !== initialMarketBooth.description
    );
  }

  async function updateMarketBooth(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      setErrors("name", ["not modified"]);
      setErrors("description", ["not modified"]);
      return;
    }

    try {
      const updatedMarketBooth =
        await marketBoothService.client.UpdateMarketBooth(
          marketBooth,
          await marketBoothService.withAuthHeader()
        );

      props.onUpdate(updatedMarketBooth.marketBooth);
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
    if (dataWasChanged()) {
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
    resetErrors();
    setDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!discardConfirmation()}>
        <Dialog title="Edit Market Booth Details" onClose={closeDialog}>
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
              onClick={(e) => updateMarketBooth(e)}
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
