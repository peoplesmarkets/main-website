import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { createStore } from "solid-js/store";

import { PlaceholderAdd } from "../../../components/assets";
import { ContentLoading, Font } from "../../../components/content";
import { ActionButton } from "../../../components/form";
import { DeleteConfirmationDialog } from "../../../components/form/DeleteConfirmationDialog";
import { IconFileField } from "../../../components/form/IconFileField";
import { BurgerIcon } from "../../../components/icons";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { readAsUint8Array } from "../../../lib";
import { resizeImage } from "../../../lib/image";
import { TKEYS } from "../../../locales";
import { ShopResponse } from "../../../services/peoplesmarkets/commerce/v1/shop";
import { PutLogoImageToShopRequest } from "../../../services/peoplesmarkets/commerce/v1/shop_customization";
import commonStyles from "../Common.module.scss";
import styles from "./EditLogo.module.scss";

type Props = {
  shop: ShopResponse | undefined;
  onUpdate: () => void;
};

export function EditLogo(props: Props) {
  const { isDarkTheme } = useThemeContext();

  const { shopCustomizationService } = useServiceClientContext();

  const [shopCustomization, { refetch }] = createResource(
    () => props.shop?.shopId,
    async (shopId) =>
      shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const [logoForm, setLogoForm] = createStore({
    shopId: undefined as string | undefined,
    image: undefined as File | undefined,
    imageUrl: undefined as string | undefined,
  });

  const [logoUploading, setLogoUploading] = createSignal(false);
  const [showDeleteLogoConfirmation, setShowDeleteLogoConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isEmpty(logoForm.shopId)) {
      setLogoForm("shopId", shopCustomization()?.shopId);
    }
  });

  createEffect(() => {
    if (_.isNil(logoForm.image)) {
      if (isDarkTheme() && !_.isNil(shopCustomization()?.logoImageDarkUrl)) {
        setLogoForm("imageUrl", shopCustomization()?.logoImageDarkUrl);
      } else {
        setLogoForm("imageUrl", shopCustomization()?.logoImageLightUrl);
      }
    }
  });

  async function handleLogoFileInput(files: FileList | null) {
    const file = _.first(files);
    if (!_.isNil(file)) {
      const resized = await resizeImage(URL.createObjectURL(file), 270, 270);
      setLogoForm("image", resized);
      setLogoForm("imageUrl", URL.createObjectURL(resized));
    } else {
      setLogoForm("image", undefined);
      setLogoForm("imageUrl", undefined);
    }
  }

  async function handleUpdateLogo(event: SubmitEvent) {
    event.preventDefault();

    const request = PutLogoImageToShopRequest.create({
      shopId: logoForm.shopId,
    });

    if (!_.isNil(logoForm.image)) {
      setLogoUploading(true);
      const data = await readAsUint8Array(
        logoForm.image,
        0,
        logoForm.image.size
      );

      if (isDarkTheme()) {
        request.imageDark = {
          contentType: "image/webp",
          data,
        };
      } else {
        request.image = {
          contentType: "image/webp",
          data,
        };
      }
    }

    try {
      await shopCustomizationService.putLogoImage(request);
      setLogoUploading(false);
      setLogoForm("image", undefined);
      refetch();
      props.onUpdate();
    } catch (err: any) {
      setLogoUploading(false);
      throw err;
    }
  }

  function handleDeleteLogo() {
    setShowDeleteLogoConfirmation(true);
  }

  async function handleConfirmDeleteLogo() {
    const shopId = props.shop?.shopId;
    if (!_.isNil(shopId)) {
      setShowDeleteLogoConfirmation(false);
      await shopCustomizationService.removeLogoImage(shopId);
      setLogoForm({ image: undefined, imageUrl: undefined });
      refetch();
      props.onUpdate();
    }
  }

  function handleContinueEditing() {
    setShowDeleteLogoConfirmation(false);
  }

  return (
    <>
      <div class={commonStyles.Fields}>
        <div class={commonStyles.FieldSet}>
          <div class={commonStyles.FieldInfo}>
            <Font
              type="headline"
              class={commonStyles.Headline}
              key={TKEYS.shop.labels.Logo}
            />

            <span class={commonStyles.Details}>
              <Trans key={TKEYS.dashboard.shop.logo["logo-info"]} />
            </span>
          </div>

          <Suspense fallback={<ContentLoading />}>
            <div class={commonStyles.Field}>
              <div class={styles.LogoPreview}>
                <div class={styles.Panel}>
                  <BurgerIcon class={styles.MenuIcon} onClick={() => {}} />

                  <IconFileField onValue={handleLogoFileInput}>
                    <div class={styles.LogoLink}>
                      <Show
                        when={!_.isEmpty(logoForm.imageUrl)}
                        fallback={
                          <PlaceholderAdd class={styles.PlaceholderAdd} />
                        }
                      >
                        <Show
                          when={!logoUploading()}
                          fallback={<ContentLoading size="42px" />}
                        >
                          <img
                            class={styles.Logo}
                            src={logoForm.imageUrl}
                            alt=""
                          />
                        </Show>
                      </Show>
                    </div>
                  </IconFileField>
                </div>
              </div>
            </div>

            <div class={commonStyles.Actions}>
              <div class={commonStyles.ActionsLeft} />
              <div class={commonStyles.ActionsRight}>
                <ActionButton
                  actionType="danger"
                  round
                  disabled={_.isEmpty(shopCustomization()?.logoImageLightUrl)}
                  onClick={handleDeleteLogo}
                >
                  <Trans key={TKEYS.form.action.Remove} />
                </ActionButton>

                <ActionButton
                  actionType="active-filled"
                  round
                  disabled={_.isNil(logoForm.image)}
                  onClick={handleUpdateLogo}
                >
                  <Trans key={TKEYS.form.action.Save} />
                </ActionButton>
              </div>
            </div>
          </Suspense>
        </div>
      </div>

      <DeleteConfirmationDialog
        show={showDeleteLogoConfirmation()}
        onCancel={handleContinueEditing}
        onConfirmation={handleConfirmDeleteLogo}
      >
        <Font
          type="body"
          key={TKEYS.dashboard.shop.logo["delete-confirmation-message"]}
        />
      </DeleteConfirmationDialog>
    </>
  );
}
