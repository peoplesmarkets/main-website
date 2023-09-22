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
  Anotation,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";
import { buildShopDetailPath } from "../../routes/shops/ShopRoutes";

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
    slug: [] as string[],
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
    setErrors({ name: [], description: [], slug: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    setMarketBooth("name", value.trim());
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setMarketBooth("description", value.trim());
  }

  function handleSlugInput(value: string) {
    resetErrors();
    setMarketBooth("slug", value);
  }

  async function updateMarketBooth(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("name", [notModified]);
      setErrors("description", [notModified]);
      setErrors("slug", [notModified]);
      return;
    }

    try {
      await marketBoothService.update(marketBooth);

      props.onUpdate?.();
      props.onClose();
    } catch (err: any) {
      if (err.code && err.code === grpc.Code.AlreadyExists) {
        setErrors("slug", [trans(TKEYS.form.errors["already-exists"])]);
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
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              name="description"
              label={trans(TKEYS["market-booth"].labels.description)}
              rows={8}
              value={marketBooth.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <TextField
              name="slug"
              label={trans(TKEYS["market-booth"].labels.slug)}
              required
              small
              value={marketBooth.slug}
              onValue={handleSlugInput}
              errors={errors.slug}
            />
            <Anotation>
              {import.meta.env.VITE_BASE_URL}
              {buildShopDetailPath(marketBooth.slug!)}
            </Anotation>

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
