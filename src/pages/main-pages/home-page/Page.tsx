import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  For,
  createResource,
  createSignal,
  resetErrorBoundaries,
} from "solid-js";

import { SearchIcon } from "../../../components/icons";
import { RefreshIcon } from "../../../components/icons/RefreshIcon";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { MdChip } from "../../../components/navigation/MdChip";
import { MdChipSet } from "../../../components/navigation/MdChipSet";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import {
  ListOffersRequest,
  OfferResponse,
  OffersFilter,
  OffersFilterField,
  OffersOrderByField,
} from "../../../services/peoplesmarkets/commerce/v1/offer";
import {
  ListShopsRequest,
  ShopResponse,
  ShopsOrderByField,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./Page.module.scss";
import { ShopOrOfferCard } from "./ShopOrOfferCard";

export type Shop = {
  type: "shop";
  shop: ShopResponse;
};

export type Offer = {
  type: "offer";
  offer: OfferResponse;
};

export type ShopOrOffer = Shop | Offer;

export default function HomePage() {
  const [trans] = useTransContext();

  const { shopService, offerService } = useServiceClientContext();

  const searchField =
    OffersFilterField.OFFERS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  const [searchShops] = createSignal(true);
  const [searchOffers] = createSignal(true);

  const [filter, setFilter] = createSignal<OffersFilter | undefined>();

  function shopsRequest() {
    return _.omitBy(
      {
        orderBy: {
          field: ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
          direction: Direction.DIRECTION_DESC,
        },
        filter: filter(),
        extended: true,
      },
      _.isNil
    );
  }

  function offerRequest() {
    return _.omitBy(
      {
        orderBy: {
          field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_CREATED_AT,
          direction: Direction.DIRECTION_DESC,
        },
        filter: filter(),
      },
      _.isNil
    );
  }

  const [shops, shopsActions] = createResource(shopsRequest, fetchShops);
  const [offers, offerActions] = createResource(offerRequest, fetchOffers);

  async function fetchShops(request: ListShopsRequest) {
    return shopService
      .list(request)
      .then((res) => res.shops)
      .catch(() => []);
  }

  async function fetchOffers(request: ListOffersRequest) {
    return offerService
      .list(request)
      .then((res) => res.offers)
      .catch(() => []);
  }

  function shopsAndOffers(): ShopOrOffer[] {
    const fetchedShops = shops();
    const fetchedOffers = offers();

    if (_.isArrayLike(fetchedShops) && _.isArrayLike(fetchedOffers)) {
      const s = fetchedShops.map((shop) => ({
        type: "shop",
        shop,
      })) as ShopOrOffer[];
      const o = fetchedOffers.map((offer) => ({
        type: "offer",
        offer,
      })) as ShopOrOffer[];
      return _.shuffle([...s, ...o]);
    }
    return [];
  }

  function handleSearchInput(query: string) {
    if (!_.isEmpty(_.trim(query))) {
      setFilter({ field: searchField, query });
    } else {
      setFilter();
    }

    resetErrorBoundaries();
  }

  async function handleSearchSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  function handleRefresh() {
    shopsActions.refetch();
    offerActions.refetch();
  }

  return (
    <>
      <Section flat>
        <form class={styles.Search} onSubmit={handleSearchSubmit}>
          <SearchIcon class={styles.SearchIcon} />

          <input
            class={styles.SearchInput}
            id="search"
            type="search"
            placeholder={trans(TKEYS["offers-search"].title)}
            value={filter()?.query || ""}
            onInput={(event) => handleSearchInput(event.currentTarget.value)}
            aria-label="search"
          />

          <RefreshIcon class={styles.RefreshIcon} onClick={handleRefresh} />
        </form>
      </Section>

      <Section class={styles.Filters}>
        <MdChipSet>
          <MdChip type="filter" label="Shops" selected={searchShops()} />

          <MdChip type="filter" label="Offers" selected={searchOffers()} />
        </MdChipSet>
      </Section>

      <DefaultBoundary loaded={() => true}>
        <Section flat>
          <div class={styles.List}>
            <For each={shopsAndOffers()}>
              {(shopOrOffer) => <ShopOrOfferCard shopOrOffer={shopOrOffer} />}
            </For>
          </div>
        </Section>
      </DefaultBoundary>
    </>
  );
}
