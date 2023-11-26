import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, Show, createResource, createSignal } from "solid-js";

import { PlaceholderImage } from "../../components/assets";
import { Font } from "../../components/content";
import { MdList } from "../../components/content/MdList";
import { MdListItem } from "../../components/content/MdListItem";
import { ActionButton } from "../../components/form";
import { DefaultBoundary } from "../../components/layout/DefaultBoundary";
import { Pagination } from "../../components/navigation/Pagination";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { buildOfferDetailConfigurationPath } from "../../routes/main/main-routing";
import {
  OfferResponse,
  OffersFilterField,
  OffersOrderByField,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { PaginationRequest } from "../../services/peoplesmarkets/pagination/v1/pagination";
import { OfferPrice } from "../OfferPrice";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./OfferList.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
};

export function OfferList(props: Props) {
  const { offerService } = useServiceClientContext();

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  function shopId() {
    return props.shop?.shopId;
  }

  const [pagination, setPagination] = createSignal({
    page: 1,
    size: 5,
  });
  const [totalElements, setTotalElements] = createSignal(0);

  const [orderBy] = createSignal({
    field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_NAME,
    direction: Direction.DIRECTION_ASC,
  });

  const [filter] = createSignal({
    field: OffersFilterField.OFFERS_FILTER_FIELD_UNSPECIFIED,
    query: "",
  });

  const [offersListReponse] = createResource(
    () => [shopId(), pagination(), orderBy(), filter()] as const,
    async ([shopId, pagination, orderBy, filter]) => {
      const response = await offerService.list({
        shopId,
        pagination,
        orderBy,
        filter,
      });

      if (!_.isNil(response.pagination)) {
        setTotalElements(response.pagination.totalElements);
      }

      if (pagination.page === 1 && _.isEmpty(response.offers)) {
        setShowCreateOffer(true);
      }

      return response;
    }
  );

  function loaded() {
    return !_.isNil(offersListReponse());
  }

  function offerDetailConfigurationPath(offer: OfferResponse): string {
    const shopSlug = props.shop?.slug;
    if (!_.isNil(shopSlug)) {
      return buildOfferDetailConfigurationPath(shopSlug, offer.offerId);
    }
    return "";
  }

  function paginationResponse() {
    return {
      page: pagination().page,
      size: pagination().size,
      totalElements: totalElements(),
    };
  }

  function handlePagination(next: PaginationRequest) {
    setPagination(next);
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
      <div class={styles.HeadlineSection}>
        <Font type="headline" key={TKEYS.dashboard.offers["My-Offers"]} />

        <ActionButton
          actionType="active-filled"
          onClick={handleOpenCreateOffer}
        >
          <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
        </ActionButton>
      </div>

      <DefaultBoundary loaded={loaded}>
        <MdList class={styles.List}>
          <For
            each={offersListReponse()?.offers}
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
                  <div class={styles.HeadlineSection}>
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
      </DefaultBoundary>

      <div class={styles.Pagination}>
        <Pagination
          pagination={paginationResponse}
          onValue={handlePagination}
        />
      </div>

      <CreateOfferDialog
        show={showCreateOffer()}
        shop={props.shop}
        first={_.isEmpty(offersListReponse()?.offers)}
        onUpdate={handleUpdate}
        onClose={handleCloseCreateOffer}
      />
    </>
  );
}
