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

  const emptyUpdateRequest = UpdateMarketBoothRequest.create();
  const updateFields = ["marketBoothId", "name", "description"];
  const [marketBooth, setMarketBooth] =
    createStore<UpdateMarketBoothRequest>(emptyUpdateRequest);

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
      setMarketBooth(_.clone(_.pick(props.marketBooth(), updateFields)));
    }
  });

  function resetErrors() {
    setErrors({ name: [], description: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setMarketBooth("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setMarketBooth("description", value.trim());
  }

  async function updateMarketBooth(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("name", [notModified]);
      setErrors("description", [notModified]);
      return;
    }

    await marketBoothService.update(marketBooth);

    props.onUpdate?.();
    props.onClose();
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(props.marketBooth(), updateFields),
      _.pick(marketBooth, updateFields)
    );
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
            TKEYS.dashboard["market-booth"]["edit-name-and-description"]
          )}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateMarketBooth}>
            <TextField
              label={trans(TKEYS["market-booth"].labels.name)}
              required
              value={marketBooth.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS["market-booth"].labels.description)}
              rows={8}
              value={marketBooth.description}
              onValue={handleDescriptionInput}
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
