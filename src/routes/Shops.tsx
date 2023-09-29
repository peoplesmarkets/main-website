import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Match, Switch, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import { ShopList } from "../components/commerce/ShopList";
import { ContentError, ContentLoading } from "../components/content";
import { Select, SelectKey } from "../components/form";
import { RefreshIcon } from "../components/icons/RefreshIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import { StoreFrontIcon } from "../components/icons/StorefrontIcon";
import { Page, Section } from "../components/layout";
import { TKEYS } from "../locales/dev";
import { ShopService } from "../services";
import {
  ListShopsRequest,
  ShopsFilterField,
  ShopsOrderByField,
} from "../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./Shops.module.scss";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";

export default function Shops() {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const shopService = new ShopService(accessToken);

  const searchField =
    ShopsFilterField.MARKET_BOOTHS_FILTER_FIELD_NAME_AND_DESCRIPTION;

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
      field: ShopsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT,
      direction: Direction.DIRECTION_DESC,
    },
    extended: true,
  });

  const [shops, { refetch }] = createResource(
    () => listRequest,
    fetchShops
  );

  async function fetchShops(request: ListShopsRequest) {
    const response = await shopService.list(request);    
    return response.shops;
  }

  function selectedCreatedAtOrderByKey() {
    if (
      listRequest.orderBy?.field ===
      ShopsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT
    ) {
      return listRequest.orderBy?.direction;
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

  function handleOrderByInput(
    field: ShopsOrderByField,
    direction: SelectKey
  ) {
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
    <Page>
      <Section>
        <div class={styles.Shops}>
          <div class={styles.Headline}>
            <StoreFrontIcon class={styles.HeadlineIcon} />
            <span>
              <Trans key={TKEYS["market-booths-search"].title} />
            </span>
          </div>

          <form class={styles.Search} onSubmit={handleSearchSubmit}>
            <SearchIcon class={styles.SearchIcon} />

            <input
              class={styles.SearchInput}
              id="search"
              type="search"
              value={listRequest.filter?.query || ""}
              onInput={(event) => handleSearchInput(event.currentTarget.value)}
              aria-label="search"
            />

            <RefreshIcon class={styles.RefreshIcon} onClick={refetch} />
          </form>

          <div class={styles.Filters}>
            <Select
              label={trans(TKEYS.query["order-by"]["created-at"].title)}
              options={createdAtOrderByOptions}
              onValue={(direction) =>
                handleOrderByInput(
                  ShopsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT,
                  direction
                )
              }
              value={selectedCreatedAtOrderByKey}
            />
          </div>
        </div>
      </Section>

      <Section>
        <Switch>
          <Match when={shops.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={shops.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={shops.state === "ready"}>
            <ShopList shops={() => shops()!} />
          </Match>
        </Switch>
      </Section>
    </Page>
  );
}
