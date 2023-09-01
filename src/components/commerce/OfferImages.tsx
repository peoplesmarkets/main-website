import _ from "lodash";
import { For, Show, createEffect, createSignal } from "solid-js";

import {
  OfferImageResponse,
  OfferResponse,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import styles from "./OfferImages.module.scss";

type Props = {
  readonly offer: () => OfferResponse;
};

export function OfferImages(props: Props) {
  const [selectedImage, setSelectedImage] = createSignal<
    OfferImageResponse | undefined
  >();

  let imageElement: HTMLImageElement | undefined;
  let imageContainer: HTMLDivElement | undefined;

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

  function otherImages() {
    return props.offer().images.sort((a, b) => a.ordering - b.ordering);
  }

  function handleSelectImage(offerImageId: string) {
    imageContainer?.classList.add(styles.FadeOut);
    imageElement?.classList.add(styles.FadeOut);
    const image = props
      .offer()
      .images.find((i) => i.offerImageId === offerImageId);
    setSelectedImage(image);
    window.scrollTo({ top: 0 });
    imageContainer?.classList.remove(styles.FadeOut);
    imageElement?.classList.remove(styles.FadeOut);
  }

  return (
    <>
      <div class={styles.OfferImages}>
        <div class={styles.MainImage}>
          <div class={styles.ImageContainer} ref={imageContainer}>
            <img
              ref={imageElement}
              class={styles.Image}
              src={selectedImage()?.imageUrl}
              alt=""
            />
          </div>
        </div>

        <Show when={!_.isEmpty(otherImages())}>
          <div class={styles.ImageGallery}>
            <For each={otherImages()}>
              {(image) => (
                <div
                  class={styles.ImageRow}
                  onClick={() => handleSelectImage(image.offerImageId)}
                >
                  <img
                    class={styles.ImagePreview}
                    classList={{
                      [styles.ActivePreview]: isSelectedImage(image),
                    }}
                    src={image.imageUrl}
                  />
                </div>
              )}
            </For>
          </div>
        </Show>
      </div>
    </>
  );
}