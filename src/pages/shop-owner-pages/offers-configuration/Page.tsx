import { Trans } from "@mbarzda/solid-i18next";
import { useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Show, createResource, createSignal } from "solid-js";

import { PlaceholderImage } from "../../../components/assets";
import { OfferPrice } from "../../../components/commerce";
import { Font } from "../../../components/content";
import { MdList } from "../../../components/content/MdList";
import { MdListItem } from "../../../components/content/MdListItem";
import { MdButton } from "../../../components/form";
import { AddIcon } from "../../../components/icons";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { requireAuthentication } from "../../../guards/authentication";
import { TKEYS } from "../../../locales";
import { buildOfferDetailConfigurationPath } from "../../../routes/shops/shop-routing";
import {
  OfferResponse,
  OffersOrderByField,
} from "../../../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";
import { MyShopData } from "../MyShopData";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./Page.module.scss";

export default function OffersConfigurationPage() {
  const location = useLocation();

  const { currentSession } = useAccessTokensContext();

  const { offerService } = useServiceClientContext();

  const shopData = useRouteData<typeof MyShopData>();

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  const [authenticated] = createResource(
    () => location.pathname,
    requireAuthentication
  );

  const [offers, { refetch }] = createResource(
    () => shopData.shop()?.shopId,
    fetchOffers
  );

  async function fetchOffers(shopId: string) {
    const response = await offerService.list({
      userId: currentSession().userId as string | undefined,
      shopId,
      orderBy: {
        field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
        direction: Direction.DIRECTION_DESC,
      },
    });

    if (_.isEmpty(response.offers)) {
      setShowCreateOffer(true);
    }

    return response.offers;
  }

  function loaded() {
    return authenticated();
  }

  function offerDetailConfigurationPath(offer: OfferResponse): string {
    const shopSlug = shopData.shop()?.slug;
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

  function handleUpdate() {
    shopData.refetch();
    refetch();
  }

  return (
    <>
      <Section>
        <div class={styles.TitleSection}>
          <Font type="headline" key={TKEYS.dashboard.offers["My-Offers"]} />
        </div>

        <div class={styles.List}>
          <DefaultBoundary loaded={loaded}>
            <MdList>
              <For each={offers()}>
                {(offer) => (
                  <MdListItem
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
                        <OfferPrice offer={() => offer} small />
                      </Show>
                    </div>

                    <div slot="end" />
                  </MdListItem>
                )}
              </For>
            </MdList>
          </DefaultBoundary>
        </div>

        <div class={styles.Actions}>
          <MdButton type="filled" onClick={handleOpenCreateOffer}>
            <span slot="icon">
              <AddIcon />
            </span>
            <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
          </MdButton>
        </div>

        <CreateOfferDialog
          shop={shopData.shop()}
          show={showCreateOffer()}
          onClose={handleCloseCreateOffer}
          onUpdate={handleUpdate}
        />
      </Section>
    </>
  );
}
