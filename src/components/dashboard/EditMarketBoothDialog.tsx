import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import {
  MarketBoothResponse,
  UpdateMarketBoothRequest,
} from "../../services/peoplesmarkets/commerce/v1/market_booth";
import {
  ActionButton,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  marketBooth: () => MarketBoothResponse;
  class?: string;
  onClose: () => void;
  onUpdate?: () => void;
};

export function EditMarketBoothDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooth, setMarketBooth] = createStore<UpdateMarketBoothRequest>(
    UpdateMarketBoothRequest.create()
  );

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  createEffect(() => {
    if (
      _.isNil(marketBooth.marketBoothId) ||
      _.isEmpty(marketBooth.marketBoothId)
    ) {
      setMarketBooth(_.clone(props.marketBooth()));
    }
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

  async function updateMarketBooth(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      setErrors("name", [trans(TKEYS.form.errors["not-modified"])]);
      setErrors("description", [trans(TKEYS.form.errors["not-modified"])]);
      return;
    }

    try {
      await marketBoothService.update(marketBooth);

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

  function dataWasChanged() {
    return !_.isEqual(props.marketBooth(), marketBooth);
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
        <Dialog
          title={trans(
            TKEYS.dashboard["market-booth"]["edit-market-booth-details"]
          )}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateMarketBooth}>
            <TextField
              name="name"
              label={trans(TKEYS["market-booth"].labels.name)}
              required
              value={marketBooth.name}
              onValue={onNameInput}
              errors={errors.name}
            />

            <TextArea
              name="description"
              label={trans(TKEYS["market-booth"].labels.description)}
              rows={8}
              value={marketBooth.description}
              onValue={onDescriptionInput}
              errors={errors.description}
            />

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => updateMarketBooth(e)}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
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
