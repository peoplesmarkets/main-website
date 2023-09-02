import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Match, Show, Switch, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import { MARKET_BOOTHS_PATH } from "../../App";
import { ContentError, ContentLoading } from "../../components/content";
import { Multiline } from "../../components/content/Multiline";
import { Select } from "../../components/form";
import { RefreshIcon } from "../../components/icons/RefreshIcon";
import { SearchIcon } from "../../components/icons/SearchIcon";
import { StoreFrontIcon } from "../../components/icons/StorefrontIcon";
import { Page, Section } from "../../components/layout";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import {
  ListMarketBoothsRequest,
  MarketBoothsFilterField,
  MarketBoothsOrderByField,
} from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./MarketBooths.module.scss";

export default function MarketBooths() {
  const [trans] = useTransContext();

  const marketBoothService = new MarketBoothService();

  const searchField =
    MarketBoothsFilterField.MARKET_BOOTHS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  function orderByOptions() {
    return [
      {
        key: `${MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT}:${Direction.DIRECTION_DESC}`,
        name: trans(TKEYS.query["order-by"]["newest-first"]),
      },
      {
        key: `${MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT}:${Direction.DIRECTION_ASC}`,
        name: trans(TKEYS.query["order-by"]["oldest-first"]),
      },
      {
        key: `${MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_RANDOM}:${Direction.DIRECTION_ASC}`,
        name: trans(TKEYS.query["order-by"].random),
      },
    ];
  }

  const [listRequest, setListRequest] = createStore<ListMarketBoothsRequest>({
    orderBy: {
      field: MarketBoothsOrderByField.MARKET_BOOTHS_ORDER_BY_FIELD_CREATED_AT,
      direction: Direction.DIRECTION_DESC,
    },
  });

  const [marketBooths, { refetch }] = createResource(
    () => listRequest,
    fetchMarketBooths
  );

  async function fetchMarketBooths(request: ListMarketBoothsRequest) {
    const response = await marketBoothService.list(request);
    return response.marketBooths;
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

  function handleOrderByInput(value: string | null) {
    if (!value) return;
    const splitted = value.split(":");
    if (!_.isArray(splitted) || splitted.length !== 2) {
      return;
    }

    const field = Number(splitted[0]);
    const direction = Number(splitted[1]);

    if (!_.isNumber(field) || !_.isNumber(direction)) {
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
        <div class={styles.MarketBooths}>
          <div class={styles.Headline}>
            <StoreFrontIcon class={styles.HeadlineIcon} />
            <span>
              <Trans key={TKEYS["market-booths-search"].title} />
            </span>
          </div>

          <form class={styles.Search} onSubmit={handleSearchSubmit}>
            <SearchIcon class={styles.SearchIcon} />

            <label for="search" style={{ display: "none" }}>
              search
            </label>
            <input
              class={styles.SearchInput}
              id="search"
              type="search"
              value={listRequest.filter?.query || ""}
              onInput={(event) => handleSearchInput(event.currentTarget.value)}
            />

            <RefreshIcon
              class={styles.RefreshIcon}
              classList={{
                [styles.Active]: marketBooths.state === "refreshing",
              }}
              onClick={refetch}
            />
          </form>

          <div class={styles.Filters}>
            <Select
              label={trans(TKEYS.query["order-by"].title)}
              options={orderByOptions}
              onValue={handleOrderByInput}
              initial={_.first(orderByOptions())!}
            />
          </div>
        </div>
      </Section>

      <Section>
        <Switch>
          <Match when={marketBooths.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={marketBooths.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={marketBooths.state === "refreshing"}>
            <ContentLoading />
          </Match>
          <Match when={marketBooths.state === "ready"}>
            <For each={marketBooths()}>
              {(marketBooth) => (
                <A
                  class={styles.ResultRow}
                  href={buildPath(
                    MARKET_BOOTHS_PATH,
                    marketBooth.marketBoothId
                  )}
                >
                  <Show when={!_.isEmpty(marketBooth.imageUrl)}>
                    <img
                      class={styles.Image}
                      src={marketBooth.imageUrl}
                      alt=""
                    />
                  </Show>
                  <div>
                    <span class={styles.Label}>{marketBooth.name}</span>
                    <span class={styles.Detail}>
                      <Multiline
                        text={() => marketBooth.description}
                        maxRows={6}
                      />
                    </span>
                  </div>
                </A>
              )}
            </For>
          </Match>
        </Switch>
      </Section>
    </Page>
  );
}
