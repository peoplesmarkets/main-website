import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales";
import {
  ActionButton,
  DeleteConfirmation,
  DiscardConfirmation,
  FileField,
} from "../form";
import { Dialog } from "../layout";
import styles from "./CreateEditDialg.module.scss";
import { ProgressBar } from "../assets";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";
import { PutLogoImageToShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop_customization";

type Props = {
  readonly shopId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
};

export function EditShopLogoDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopCustomizationService = new ShopCustomizationService(accessToken);

  const [form, setForm] = createStore({
    shopId: undefined as string | undefined,
    image: undefined as File | undefined,
    imageDark: undefined as File | undefined,
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

  async function updateImage(event: SubmitEvent) {
    event.preventDefault();

    const request = PutLogoImageToShopRequest.create({
      shopId: props.shopId,
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
      await shopCustomizationService.putLogoImage(request);
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
    await shopCustomizationService.removeLogoImage(props.shopId);
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
          title={trans(TKEYS.dashboard["shop"]["edit-logo"])}
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label={trans(
                  TKEYS.dashboard["shop"].image["for-light-theme"]
                )}
                errors={errors.image}
                onValue={handleImageInput}
                showLabel
              />

              <FileField
                label={trans(
                  TKEYS.dashboard["shop"].image["for-dark-theme"]
                )}
                errors={errors.image}
                onValue={handleImageDarkInput}
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
