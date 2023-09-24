import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Match, Switch, createResource } from "solid-js";
import { createStore } from "solid-js/store";

import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../components/content";
import { Select, SelectKey } from "../components/form";
import { SearchGlobalIcon, SearchIcon } from "../components/icons";
import { RefreshIcon } from "../components/icons/RefreshIcon";
import { Page, Section } from "../components/layout";
import { OfferList } from "../components/main";
import { TKEYS } from "../locales";
import { OfferService } from "../services";
import {
  ListOffersRequest,
  OffersFilterField,
  OffersOrderByField,
} from "../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./Offers.module.scss";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";

export default function Offers() {
  const [trans] = useTransContext();

  const { accessToken } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const searchField =
    OffersFilterField.OFFERS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  const defaultRequest = {
    orderBy: {
      field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_CREATED_AT,
      direction: Direction.DIRECTION_DESC,
    },
  };

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

  function updatedAtOrderByOptions() {
    return [
      {
        key: Direction.DIRECTION_DESC,
        name: trans(TKEYS.query["order-by"]["updated-at"]["newest-first"]),
      },
      {
        key: Direction.DIRECTION_ASC,
        name: trans(TKEYS.query["order-by"]["updated-at"]["oldest-first"]),
      },
    ];
  }

  function selectedCreatedAtOrderByKey() {
    if (
      listRequest.orderBy?.field ===
      OffersOrderByField.OFFERS_ORDER_BY_FIELD_CREATED_AT
    ) {
      return listRequest.orderBy?.direction;
    }
  }

  function selectedUpdatedAtOrderByKey() {
    if (
      listRequest.orderBy?.field ===
      OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT
    ) {
      return listRequest.orderBy?.direction;
    }
  }

  const [listRequest, setListRequest] =
    createStore<ListOffersRequest>(defaultRequest);

  const [offers, { refetch }] = createResource(() => listRequest, fetchOffers);

  async function fetchOffers(request: ListOffersRequest) {
    const response = await offerService.list(request);
    return response.offers;
  }

  function handleSearchInput(value: string) {
    const trimmed = value.trim();

    if (_.isEmpty(trimmed)) {
      if (_.isNil(listRequest.filter)) {
        return;
      }

      setListRequest({ ...listRequest, ...{ filter: undefined } });
    } else {
      setListRequest({
        ...listRequest,
        ...{ filter: { field: searchField, query: trimmed } },
      });
    }

    refetch();
  }

  function handleOrderByInput(field: OffersOrderByField, direction: SelectKey) {
    if (!_.isNumber(direction)) {
      return;
    }

    setListRequest({ ...listRequest, ...{ orderBy: { field, direction } } });
    refetch();
  }

  function handleOrderByRandomInput() {
    setListRequest({
      ...listRequest,
      ...{
        orderBy: {
          field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_RANDOM,
          direction: Direction.DIRECTION_ASC,
        },
      },
    });

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
            <SearchGlobalIcon class={styles.HeadlineIcon} />
            <span>
              <Trans key={TKEYS["offers-search"].title} />
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
                  OffersOrderByField.OFFERS_ORDER_BY_FIELD_CREATED_AT,
                  direction
                )
              }
              value={selectedCreatedAtOrderByKey}
            />
            <Select
              label={trans(TKEYS.query["order-by"]["updated-at"].title)}
              options={updatedAtOrderByOptions}
              onValue={(direction) =>
                handleOrderByInput(
                  OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
                  direction
                )
              }
              value={selectedUpdatedAtOrderByKey}
            />
            <button
              class={styles.QueryButton}
              onClick={handleOrderByRandomInput}
            >
              <Trans key={TKEYS.query["order-by"].random.title} />
            </button>
          </div>
        </div>
      </Section>

      <Section>
        <Switch>
          <Match when={offers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offers.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offers.state)}>
            <OfferList offers={() => offers()!} />
          </Match>
        </Switch>
      </Section>
    </Page>
  );
}
