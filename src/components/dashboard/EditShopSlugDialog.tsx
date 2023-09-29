import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  buildShopDetailPath,
  buildShopSettingsPath,
} from "../../routes/shops/ShopRoutes";
import { ShopService } from "../../services";
import { UpdateShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop";
import {
  ActionButton,
  Anotation,
  DiscardConfirmation,
  TextField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  onClose: () => void;
};

export function EditShopSlugDialog(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();
  const shopData = useRouteData<typeof ShopData>();
  const { accessToken } = useAccessTokensContext();
  const shopService = new ShopService(accessToken);

  const emptyUpdateRequest = UpdateShopRequest.create();
  const updateFields = ["shopId", "slug"];
  const [shop, setShop] =
    createStore<UpdateShopRequest>(emptyUpdateRequest);

  const [errors, setErrors] = createStore({ slug: [] as string[] });

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (
      _.isNil(shop.shopId) ||
      _.isEmpty(shop.shopId)
    ) {
      setShop(_.clone(_.pick(shopData.shop.data(), updateFields)));
    }
  });

  function resetErrors() {
    setErrors({ slug: [] });
  }

  function handleSlugInput(value: string) {
    resetErrors();
    setShop("slug", value);
  }

  async function handleUpdateShop(event: SubmitEvent) {
    event.preventDefault();

    if (!dataWasChanged()) {
      const notModified = trans(TKEYS.form.errors["not-modified"]);
      setErrors("slug", [notModified]);
      return;
    }

    try {
      const response = await shopService.update(shop);

      if (!_.isNil(response.shop)) {
        navigate(buildShopSettingsPath(response.shop?.slug));
        props.onClose();
      } else {
        props.onClose();
      }
    } catch (err: any) {
      if (err.code) {
        if (err.code === grpc.Code.AlreadyExists) {
          setErrors("slug", [trans(TKEYS.form.errors["already-exists"])]);
        } else {
          setErrors("slug", [err.message]);
        }
      } else {
        throw err;
      }
    }
  }

  function dataWasChanged() {
    return !_.isEqual(
      _.pick(shopData.shop.data(), updateFields),
      _.pick(shop, updateFields)
    );
  }

  function confirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    resetErrors();
    setShowDiscardConfirmation(false);
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard["shop"]["edit-path"])}
          onClose={props.onClose}
        >
          <form class={styles.Form} onSubmit={handleUpdateShop}>
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
                onClick={(e) => handleUpdateShop(e)}
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={showDiscardConfirmation()}>
        <DiscardConfirmation
          onCancel={continueEditing}
          onDiscard={confirmCloseDialog}
        />
      </Show>
    </>
  );
}
