import { grpc } from "@improbable-eng/grpc-web";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { readAsUint8Array } from "../../lib";
import { TKEYS } from "../../locales/dev";
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

type Props = {
  readonly marketBoothId: string;
  readonly onUpdate: () => void;
  readonly onClose: () => void;
  readonly logo?: boolean;
};

export function EditMarketBoothImageDialog(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopCustomizationService = new ShopCustomizationService(accessToken);

  const [form, setForm] = createStore({
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

    if (_.isNil(form.image)) {
      setErrors("image", [trans(TKEYS.form.errors["required-field"])]);
      return;
    }

    setUploading(true);

    const request = {
      shopId: props.marketBoothId,
      image: {
        contentType: "",
        data: await readAsUint8Array(form.image, 0, form.image.size),
      },
    };

    try {
      if (props.logo) {
        await shopCustomizationService.putLogoImage(request);
      } else {
        await shopCustomizationService.putBannerImage(request);
      }
      setUploading(false);
      props.onUpdate();
      props.onClose();
    } catch (err: any) {
      setUploading(false);

      if (err.code) {
        if (err.code === grpc.Code.ResourceExhausted) {
          setErrors("image", [
            trans(TKEYS.form.errors["item-too-large"], {
              item: trans(TKEYS.common.file),
            }),
          ]);
          return;
        }
        if (err.code === grpc.Code.InvalidArgument) {
          setErrors("image", [trans(TKEYS.form.errors["wrong-type"])]);
          return;
        }
      }

      throw err;
    }
  }

  async function deleteImage() {
    if (props.logo) {
      await shopCustomizationService.removeLogoImage(props.marketBoothId);
    } else {
      await shopCustomizationService.removeBannerImage(props.marketBoothId);
    }
    props.onUpdate();
    props.onClose();
  }

  function handleImageInput(files: FileList | null) {
    resetErrors();
    if (!_.isNil(files) && !_.isEmpty(files)) {
      setForm("image", _.first(files));
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
          title={
            props.logo
              ? trans(TKEYS.dashboard["market-booth"]["edit-logo"])
              : trans(TKEYS.dashboard["market-booth"]["edit-image"])
          }
          onClose={closeDialog}
        >
          <form class={styles.Form} onSubmit={updateImage}>
            <Show when={!uploading()} fallback={<ProgressBar />}>
              <FileField
                label="image"
                required
                errors={errors.image}
                onValue={handleImageInput}
              />
            </Show>

            <div class={styles.DialogFooter}>
              <ActionButton actionType="danger" onClick={removeImage}>
                <Trans
                  key={
                    props.logo
                      ? trans(TKEYS.dashboard["market-booth"]["delete-logo"])
                      : TKEYS.dashboard["market-booth"]["delete-image"]
                  }
                />
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
