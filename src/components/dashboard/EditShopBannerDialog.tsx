import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createResource, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { readAsUint8Array, resourceIsReady } from "../../lib";
import { TKEYS } from "../../locales";
import { ShopData } from "../../routes/shops/ShopData";
import {
  getAllowedTypesFromError,
  getMaxSizeFromError,
} from "../../services/commerce/shop_customization";
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
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditShopBannerDialog(props: Props) {
  const [trans] = useTransContext();
  const { theme } = useThemeContext();

  const shopData = useRouteData<typeof ShopData>();

  const { shopCustomizationService } = useServiceClientContext();

  const [shopCustomization] = createResource(shopData?.shopId, async (shopId) =>
    shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const [form, setForm] = createStore({
    shopId: undefined as string | undefined,
    image: undefined as File | undefined,
    showInListing: undefined as boolean | undefined,
    showOnHome: undefined as boolean | undefined,
  });

  const [errors, setErrors] = createStore({
    image: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (!resourceIsReady(shopCustomization)) {
      return;
    }

    if (_.isNil(form.shopId) && _.isEmpty(form.shopId)) {
      setForm("shopId", shopData.shopId());
      setForm("showInListing", shopCustomization()?.showBannerInListing);
      setForm("showOnHome", shopCustomization()?.showBannerOnHome);
    }
  });

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    const request = PutBannerImageToShopRequest.create({
      shopId: shopData.shopId(),
      showInListing: form.showInListing,
      showOnHome: form.showOnHome,
    });

    if (!_.isNil(form.image)) {
      setUploading(true);
      const data = await readAsUint8Array(form.image, 0, form.image.size);
      if (theme() === Theme.DefaultLight) {
        request.image = {
          contentType: "",
          data,
        };
      } else {
        request.imageDark = {
          contentType: "",
          data,
        };
      }
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
          const toLarge = trans(TKEYS.form.errors["item-too-large-size"], {
            item: trans(TKEYS.common.file),
            maxSize: getMaxSizeFromError(err),
          });
          setErrors("image", [toLarge]);
          return;
        }
        if (err.code === grpc.Code.InvalidArgument) {
          const wrongType = trans(TKEYS.form.errors["wrong-type"], {
            types: getAllowedTypesFromError(err),
          });
          setErrors("image", [wrongType]);
          return;
        }
      }

      throw err;
    }
  }

  async function deleteImage() {
    const shopId = shopData.shopId();
    if (!_.isNil(shopId)) {
      await shopCustomizationService.removeBannerImage(shopId);
      props.onUpdate();
      props.onClose();
    }
  }

  function handleImageInput(files: FileList | null) {
    resetErrors();
    const file = _.first(files);
    if (!_.isNil(file)) {
      if (file.size > import.meta.env.VITE_IMAGE_MAX_SIZE) {
        setErrors("image", [
          trans(TKEYS.form.errors["item-too-large"], {
            item: trans(TKEYS.common.file),
          }),
        ]);
        return;
      }

      setForm("image", file);
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
    setErrors({ image: [] });
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
      <Dialog
        title={trans(TKEYS.dashboard["shop"]["edit-image"])}
        onClose={closeDialog}
      >
        <form class={styles.Form} onSubmit={updateImage}>
          <FileField
            label={trans(TKEYS.dashboard["shop"].image.label)}
            errors={errors.image}
            onValue={handleImageInput}
            showLabel
          />

          <Show when={uploading()}>
            <ProgressBar />
          </Show>

          <CheckBox
            label={trans(TKEYS.dashboard["shop"].image["show-in-listings"])}
            value={form.showInListing}
            onValue={handleShowInListingsInput}
          />
          <CheckBox
            label={trans(TKEYS.dashboard["shop"].image["show-on-home"])}
            value={form.showOnHome}
            onValue={handleShowOnHome}
          />

          <div class={styles.DialogFooter}>
            <ActionButton
              actionType="danger"
              onClick={removeImage}
              disabled={uploading()}
            >
              <Trans key={TKEYS.dashboard["shop"]["delete-image"]} />
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
