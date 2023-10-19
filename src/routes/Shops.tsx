import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { ErrorBoundary, Suspense, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import { ShopList } from "../components/commerce/ShopList";
import { ContentError } from "../components/content";
import { Select, SelectKey } from "../components/form";
import { RefreshIcon } from "../components/icons/RefreshIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import { Section, Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { TKEYS } from "../locales";
import { ShopService } from "../services";
import {
  ListShopsRequest,
  ShopsFilterField,
  ShopsOrderByField,
} from "../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../services/peoplesmarkets/ordering/v1/ordering";
import MainRoutesWrapper from "./MainRoutesWrapper";
import styles from "./ShopsOffers.module.scss";

export default function Shops() {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopService = new ShopService(accessToken);

  const searchField = ShopsFilterField.SHOPS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  function createdAtOrderByOptions() {
    return [
      {
        key: Direction.DIRECTION_DESC,
        name: trans(TKEYS.query["order-by"]["created-at"]["newest-first"]),
      },
      {
        key: Direction.DIRECTION_ASC,
        name: trans(TKEYS.query["order-by"]["created-at"]["oldest-first"]),
      },
    ];
  }

  const [listRequest, setListRequest] = createStore<ListShopsRequest>({
    orderBy: {
      field: ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
      direction: Direction.DIRECTION_DESC,
    },
    extended: true,
  });

  const [shops, { refetch }] = createResource(() => listRequest, fetchShops);

  async function fetchShops(request: ListShopsRequest) {
    const response = await shopService.list(request);
    return response.shops;
  }

  function selectedCreatedAtOrderByKey() {
    if (
      listRequest.orderBy?.field ===
      ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT
    ) {
      return _.find(createdAtOrderByOptions(), {
        key: listRequest?.orderBy?.direction,
      });
    }
  }

  function handleSearchInput(value: string) {
    const trimmed = value.trim();

    if (_.isEmpty(trimmed)) {
      if (_.isNil(listRequest.filter)) {
        return;
      }

      setListRequest({ ...listRequest, ...{ filter: undefined } });
      refetch();
      return;
    }

    setListRequest({
      ...listRequest,
      ...{ filter: { field: searchField, query: trimmed } },
    });

    refetch();
  }

  function handleOrderByInput(field: ShopsOrderByField, direction: SelectKey) {
    if (!_.isNumber(direction)) {
      return;
    }

    setListRequest({ ...listRequest, ...{ orderBy: { field, direction } } });
    refetch();
  }

  async function handleSearchSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  return (
    <MainRoutesWrapper>
      <Slot name="search">
        <form class={styles.Search} onSubmit={handleSearchSubmit}>
          <SearchIcon class={styles.SearchIcon} />

          <input
            class={styles.SearchInput}
            id="search"
            type="search"
            placeholder={trans(TKEYS["shops-search"].title)}
            value={listRequest.filter?.query || ""}
            onInput={(event) => handleSearchInput(event.currentTarget.value)}
            aria-label="search"
          />

          <RefreshIcon class={styles.RefreshIcon} onClick={refetch} />
        </form>
      </Slot>

      <Slot name="content">
        <Section>
          <div class={styles.Filters}>
            <Select
              label={trans(TKEYS.query["order-by"]["created-at"].title)}
              options={createdAtOrderByOptions}
              value={selectedCreatedAtOrderByKey}
              onValue={(direction) =>
                handleOrderByInput(
                  ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
                  direction
                )
              }
            />
          </div>
        </Section>

        <Section>
          <ErrorBoundary fallback={<ContentError />}>
            <Suspense>
              <ShopList shops={() => shops()} />
            </Suspense>
          </ErrorBoundary>
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}
