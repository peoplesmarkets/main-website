import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { ShopService } from "../../services";
import { CreateShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop";
import {
  ActionButton,
  Anotation,
  DiscardConfirmation,
  TextArea,
  TextField,
} from "../form";
import { Dialog } from "../layout/Dialog";
import styles from "./CreateEditDialg.module.scss";
import { buildShopDetailPath } from "../../routes/shops/shop-routing";
import { slugify } from "../../lib";

type Props = {
  onClose: () => void;
  onUpdate?: () => void;
};

export function CreateShopDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopService = new ShopService(accessToken);

  const [shop, setShop] = createStore<CreateShopRequest>({
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
    if (slugify(shop.name) === shop.slug) {
      setShop("slug", slugify(value));
    }
    setShop("name", value);
  }

  function handleSlugInput(value: string) {
    resetErrors();
    setShop("slug", value);
  }

  function handleDescriptionInput(value: string) {
    resetErrors();
    setShop("description", value);
  }

  async function createShop(event: SubmitEvent) {
    event.preventDefault();

    if (_.isEmpty(shop.name)) {
      setErrors("name", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    try {
      await shopService.create(shop);

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
    if (!_.isEmpty(shop.name) || !_.isEmpty(shop.description)) {
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
            TKEYS.dashboard["shop"]["create-new-shop"]
          )}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={(e) => createShop(e)}>
            <TextField
              label={trans(TKEYS["shop"].labels.name)}
              required
              value={shop.name}
              onValue={handleNameInput}
              errors={errors.name}
            />

            <TextArea
              label={trans(TKEYS["shop"].labels.description)}
              rows={8}
              required
              value={shop.description}
              onValue={handleDescriptionInput}
              errors={errors.description}
            />

            <TextField
              label={trans(TKEYS["shop"].labels.slug)}
              required
              small
              value={shop.slug}
              onValue={handleSlugInput}
              errors={errors.slug}
            />
            <Anotation>
              <Trans key={TKEYS.dashboard["shop"]["resulting-url"]} />:
            </Anotation>
            <Anotation bordered padded>
              {import.meta.env.VITE_BASE_URL}
              {buildShopDetailPath(shop.slug!)}
            </Anotation>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="active-filled"
                submit
                onClick={(e) => createShop(e)}
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
