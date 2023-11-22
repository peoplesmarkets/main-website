import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createSignal, onMount } from "solid-js";

import { PlaceholderImage } from "../../components/assets";
import { Font } from "../../components/content";
import { MdList } from "../../components/content/MdList";
import { MdListItem } from "../../components/content/MdListItem";
import { ActionButton } from "../../components/form";
import { TKEYS } from "../../locales";
import { buildOfferDetailConfigurationPath } from "../../routes/main-routing";
import { OfferResponse } from "../../services/peoplesmarkets/commerce/v1/offer";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { OfferPrice } from "../OfferPrice";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./OfferList.module.scss";

type Props = {
  shop: ShopResponse | undefined;
  offers: OfferResponse[] | undefined;
};

export function OfferList(props: Props) {
  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  onMount(() => {
    if (!props.shop?.isActive && _.isEmpty(props.offers)) {
      setShowCreateOffer(true);
    }
  });

  function offerDetailConfigurationPath(offer: OfferResponse): string {
    const shopSlug = props.shop?.slug;
    if (!_.isNil(shopSlug)) {
      return buildOfferDetailConfigurationPath(shopSlug, offer.offerId);
    }
    return "";
  }

  function handleOpenCreateOffer() {
    setShowCreateOffer(true);
  }

  function handleCloseCreateOffer() {
    setShowCreateOffer(false);
  }

  function handleUpdate() {}

  return (
    <>
      <Font type="headline" key={TKEYS.dashboard.offers["My-Offers"]} />

      <MdList class={styles.List}>
        <For
          each={props.offers}
          fallback={
            <MdListItem class={styles.ListItem} type="text">
              <div slot="headline">
                <Font
                  type="body"
                  key={TKEYS.dashboard.offers["no-offers-yet"]}
                />
              </div>
            </MdListItem>
          }
        >
          {(offer) => (
            <MdListItem
              class={styles.ListItem}
              type="link"
              href={offerDetailConfigurationPath(offer)}
            >
              <div slot="start">
                <div class={styles.Image}>
                  <Show
                    when={!_.isEmpty(offer.images)}
                    fallback={<PlaceholderImage small />}
                  >
                    <img
                      class={styles.Thumbnail}
                      src={offer.images[0].imageUrl}
                    />
                  </Show>
                </div>
              </div>

              <div slot="headline">
                <div class={styles.Headline}>
                  <Font type="label" class={styles.Name}>
                    {offer.name}
                  </Font>
                  <Show
                    when={offer.isActive}
                    fallback={
                      <Font type="body" warn key={TKEYS.common.hidden} />
                    }
                  >
                    <Font type="body" active key={TKEYS.common.public} />
                  </Show>
                </div>
              </div>

              <div slot="supporting-text">
                <Show when={!_.isNil(offer?.price)}>
                  <OfferPrice offer={offer} small />
                </Show>
              </div>

              <div slot="end" />
            </MdListItem>
          )}
        </For>
      </MdList>

      <div class={styles.Actions}>
        <ActionButton
          actionType="active-filled"
          onClick={handleOpenCreateOffer}
        >
          <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
        </ActionButton>
      </div>

      <CreateOfferDialog
        show={showCreateOffer()}
        shop={props.shop}
        first={_.isEmpty(props.offers)}
        onUpdate={handleUpdate}
        onClose={handleCloseCreateOffer}
      />
    </>
  );
}
