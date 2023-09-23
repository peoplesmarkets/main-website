import _ from "lodash";
import { For, Show, createEffect, createSignal } from "solid-js";

import {
  OfferImageResponse,
  OfferResponse,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferImages.module.scss";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { OfferService } from "../../services";
import { TrashIcon } from "../icons";
import { DeleteConfirmation } from "../form";
import { useTransContext } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales";

type Props = {
  readonly offer: () => OfferResponse;
  readonly withDelete?: boolean;
  readonly onUpdate?: () => void;
};

export function OfferImages(props: Props) {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [selectedImage, setSelectedImage] = createSignal<
    OfferImageResponse | undefined
  >();

  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);

  createEffect(() => {
    if (_.isNil(props.offer().images.find((i) => isSelectedImage(i)))) {
      setSelectedImage(_.first(props.offer().images));
    }
  });

  function isSelectedImage(
    offerImage: OfferImageResponse | undefined
  ): boolean {
    return selectedImage()?.offerImageId === offerImage?.offerImageId;
  }

  function images() {
    return props.offer().images.sort((a, b) => a.ordering - b.ordering);
  }

  function handleSelectImage(offerImageId: string) {
    setSelectedImage(_.find(props.offer().images, { offerImageId }));
  }

  function handleDeleteImage() {
    if (props.withDelete) {
      setShowDeleteConfirmation(true);
    }
  }

  function handleContinueEditing() {
    if (props.withDelete) {
      setShowDeleteConfirmation(false);
    }
  }

  async function handleConfirmDeleteImage() {
    if (props.withDelete) {
      await offerService.removeImage(selectedImage()!.offerImageId);
      setShowDeleteConfirmation(false);
      props.onUpdate?.();
    }
  }

  return (
    <>
      <div class={styles.OfferImages}>
        <div class={styles.MainImage}>
          <div class={styles.ImageContainer}>
            <img class={styles.Image} src={selectedImage()?.imageUrl} alt="" />

            <Show when={props.withDelete}>
              <button class={styles.DeleteButton} onClick={handleDeleteImage}>
                <TrashIcon class={styles.DeleteIcon} />
              </button>
            </Show>
          </div>
        </div>

        <Show when={images()?.length > 1}>
          <div class={styles.ImageGallery}>
            <For each={images()}>
              {(image) => (
                <div
                  class={styles.PreviewItem}
                  onClick={() => handleSelectImage(image.offerImageId)}
                >
                  <img
                    class={styles.PreviewImage}
                    classList={{
                      [styles.ActivePreview]: isSelectedImage(image),
                    }}
                    src={image.imageUrl}
                    alt=""
                  />
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>

      <Show when={props.withDelete && showDeleteConfirmation()}>
        <DeleteConfirmation
          message={trans(TKEYS.image["delete-confirmation-message"])}
          onCancel={handleContinueEditing}
          onConfirmation={handleConfirmDeleteImage}
        />
      </Show>
    </>
  );
}
