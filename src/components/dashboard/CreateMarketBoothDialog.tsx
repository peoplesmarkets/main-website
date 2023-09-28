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
  Anotation,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";
import { buildShopDetailPath } from "../../routes/shops/ShopRoutes";
import { slugify } from "../../lib";

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
    slug: "",
    description: "",
  });

  const [errors, setErrors] = createStore({
    name: [] as string[],
    slug: [] as string[],
    description: [] as string[],
  });

  const [discardConfirmation, setDiscardConfirmation] = createSignal(false);

  function resetErrors() {
    setErrors({ name: [], slug: [], description: [] });
  }

  function handleNameInput(value: string) {
    resetErrors();
    if (slugify(marketBooth.name) === marketBooth.slug) {
      setMarketBooth("slug", slugify(value));
    }
    setMarketBooth("name", value);
  }

  function handleSlugInput(value: string) {
    resetErrors();
    setMarketBooth("slug", value);
  }
  function handleDescriptionInput(value: string) {
    resetErrors();
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
        setErrors("slug", [trans(TKEYS.form.errors["already-exists"])]);
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
    resetErrors();
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
              label={trans(TKEYS["market-booth"].labels.name)}
              required
              value={marketBooth.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS["market-booth"].labels.description)}
              rows={8}
              required
              value={marketBooth.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <TextField
              label={trans(TKEYS["market-booth"].labels.slug)}
              required
              small
              value={marketBooth.slug}
              onValue={handleSlugInput}
              errors={errors.slug}
            />
            <Anotation>
              <Trans key={TKEYS.dashboard["market-booth"]["resulting-url"]} />:
            </Anotation>
            <Anotation bordered padded>
              {import.meta.env.VITE_BASE_URL}
              {buildShopDetailPath(marketBooth.slug!)}
            </Anotation>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => createMarketBooth(e)}
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
