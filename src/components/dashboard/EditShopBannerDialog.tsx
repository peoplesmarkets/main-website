import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { ShopData } from "../../routes/shops/ShopData";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";
import { PutBannerImageToShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { ProgressBar } from "../assets";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  FileField,
} from "../form";
import { CheckBox } from "../form/CheckBox";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly shopId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditShopBannerDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopCustomizationService = new ShopCustomizationService(accessToken);

  const shopData = useRouteData<typeof ShopData>();

  const [form, setForm] = createStore({
    shopId: undefined as string | undefined,
    image: undefined as File | undefined,
    imageDark: undefined as File | undefined,
    showInListing: undefined as boolean | undefined,
    showOnHome: undefined as boolean | undefined,
  });

  const [errors, setErrors] = createStore({
    image: [] as string[],
    imageDark: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isNil(form.shopId) && _.isEmpty(form.shopId)) {
      setForm("shopId", props.shopId);
      setForm(
        "showInListing",
        shopData?.shopCustomization?.data()?.showBannerInListing
      );
      setForm(
        "showOnHome",
        shopData?.shopCustomization?.data()?.showBannerOnHome
      );
    }
  });

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    const request = PutBannerImageToShopRequest.create({
      shopId: props.shopId,
      showInListing: form.showInListing,
      showOnHome: form.showOnHome,
    });

    if (!_.isNil(form.image)) {
      setUploading(true);
      request.image = {
        contentType: "",
        data: await readAsUint8Array(form.image, 0, form.image.size),
      };
    }
    if (!_.isNil(form.imageDark)) {
      setUploading(true);
      request.imageDark = {
        contentType: "",
        data: await readAsUint8Array(form.imageDark, 0, form.imageDark.size),
      };
    }

    try {
      await shopCustomizationService.putBannerImage(request);
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);

      if (err.code) {
        if (err.code === grpc.Code.ResourceExhausted) {
          const toLarge = trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.common.file),
          });
          setErrors("image", [toLarge]);
          setErrors("imageDark", [toLarge]);
          return;
        }
        if (err.code === grpc.Code.InvalidArgument) {
          const wrongType = trans(TKEYS.form.errors["wrong-type"]);
          setErrors("image", [wrongType]);
          setErrors("imageDark", [wrongType]);
          return;
        }
      }

      throw err;
    }
  }

  async function deleteImage() {
    await shopCustomizationService.removeBannerImage(props.shopId);
    props.onUpdate();
    props.onClose();
  }

  function handleImageInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      setForm("image", _.first(files));
    }
  }

  function handleImageDarkInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      setForm("imageDark", _.first(files));
    }
  }

  function handleShowInListingsInput(value: boolean) {
    resetErrors();
    setForm("showInListing", value);
  }

  function handleShowOnHome(value: boolean) {
    resetErrors();
    setForm("showOnHome", value);
  }

  function resetErrors() {
    setErrors({ image: [], imageDark: [] });
  }

  function removeImage() {
    setShowDeleteConfirmation(true);
  }

  function closeDialog() {
    if (_.isNil(form.image)) {
      props.onClose();
    } else {
      setShowDiscardConfirmation(true);
    }
  }

  function confirmCloseDialog() {
    setShowDiscardConfirmation(false);
    props.onClose();
  }

  function continueEditing() {
    setShowDiscardConfirmation(false);
    setShowDeleteConfirmation(false);
  }

  return (
    <>
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard["market-booth"]["edit-image"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label={trans(
                  TKEYS.dashboard["market-booth"].image["for-light-theme"]
                )}
                errors={errors.image}
                onValue={handleImageInput}
                showLabel
              />

              <FileField
                label={trans(
                  TKEYS.dashboard["market-booth"].image["for-dark-theme"]
                )}
                errors={errors.imageDark}
                onValue={handleImageDarkInput}
                showLabel
              />

              <CheckBox
                label={trans(
                  TKEYS.dashboard["market-booth"].image["show-in-listings"]
                )}
                value={form.showInListing}
                onValue={handleShowInListingsInput}
              />
              <CheckBox
                label={trans(
                  TKEYS.dashboard["market-booth"].image["show-on-home"]
                )}
                value={form.showOnHome}
                onValue={handleShowOnHome}
              />
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton
                actionType="danger"
                onClick={removeImage}
                disabled={uploading()}
              >
                <Trans key={TKEYS.dashboard["market-booth"]["delete-image"]} />
              </ActionButton>

              <ActionButton
                actionType="active-filled"
                onClick={updateImage}
                disabled={uploading()}
                submit
              >
                <Trans key={TKEYS.form.action.Save} />
              </ActionButton>
            </div>
          </form>
        </Dialog>
      </Show>

      <Show when={showDeleteConfirmation()}>
        <DeleteConfirmation
          message={trans(TKEYS.image["delete-confirmation-message"])}
          onCancel={continueEditing}
          onConfirmation={deleteImage}
        />
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
