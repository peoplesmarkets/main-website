import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useRouteData } from "@solidjs/router";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales";
import { MyShopData } from "../../pages/shop-owner-pages/MyShopData";
import {
  getAllowedTypesFromError,
  getMaxSizeFromError,
} from "../../services/commerce/shop_customization";
import { PutLogoImageToShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { ProgressBar } from "../assets";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  FileField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";

type Props = {
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditShopLogoDialog(props: Props) {
  const { theme } = useThemeContext();
  const [trans] = useTransContext();

  const { shopCustomizationService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [form, setForm] = createStore({
    shopId: undefined as string | undefined,
    image: undefined as File | undefined,
  });
  const [errors, setErrors] = createStore({
    image: [] as string[],
  });

  const [uploading, setUploading] = createSignal(false);
  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    const request = PutLogoImageToShopRequest.create({
      shopId: shopData.shop()?.shopId,
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
      await shopCustomizationService.putLogoImage(request);
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
    const shopId = shopData.shop()?.shopId;
    if (!_.isNil(shopId)) {
      await shopCustomizationService.removeLogoImage(shopId);
      props.onUpdate();
      props.onClose();
    }
  }

  function handleImageInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      const file = _.first(files)!;
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
      <Show when={!showDiscardConfirmation()}>
        <Dialog
          title={trans(TKEYS.dashboard["shop"]["edit-logo"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label={trans(TKEYS.dashboard["shop"]["logo-image"])}
                errors={errors.image}
                onValue={handleImageInput}
                showLabel
              />
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton actionType="danger" onClick={removeImage}>
                <Trans key={TKEYS.dashboard["shop"]["delete-logo"]} />
              </ActionButton>

              <ActionButton
                actionType="active-filled"
                onClick={updateImage}
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
          message={trans(
            TKEYS.dashboard.shop.image["delete-confirmation-message"]
          )}
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
