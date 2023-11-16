import { useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  ErrorBoundary,
  Suspense,
  createResource,
  createSignal,
  resetErrorBoundaries,
} from "solid-js";

import { ContentError } from "../components/content";
import { SelectKey } from "../components/form";
import { MdSelect } from "../components/form/MdSelect";
import { RefreshIcon } from "../components/icons/RefreshIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import { Section, Slot } from "../components/layout";
import { useServiceClientContext } from "../contexts/ServiceClientContext";
import { TKEYS } from "../locales";
import {
  ListShopsRequest,
  ShopsFilter,
  ShopsFilterField,
  ShopsOrderByField,
} from "../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../services/peoplesmarkets/ordering/v1/ordering";
import MainRoutesWrapper from "./MainRoutesWrapper";
import styles from "./ShopsOffers.module.scss";
import { ShopList } from "./shops/list/ShopList";

export default function Shops() {
  const [trans] = useTransContext();

  const { shopService } = useServiceClientContext();

  const searchField = ShopsFilterField.SHOPS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  const defaultOrderBy = {
    field: ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
    direction: Direction.DIRECTION_DESC,
  };

  const [orderBy, setOrderBy] = createSignal(_.clone(defaultOrderBy));
  const [filter, setFilter] = createSignal<ShopsFilter | undefined>();

  function request() {
    if (_.isNil(filter())) {
      return {
        orderBy: orderBy(),
        extended: true,
      };
    }

    return {
      orderBy: orderBy(),
      filter: filter(),
      extended: true,
    };
  }

  const [shops, { refetch }] = createResource(request, fetchShops);

  async function fetchShops(request: ListShopsRequest) {
    return shopService
      .list(request)
      .then((res) => res.shops)
      .catch(() => []);
  }

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

  function selectedCreatedAtOrderByKey() {
    if (orderBy().field === ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT) {
      return _.find(createdAtOrderByOptions(), {
        key: orderBy().direction,
      });
    }
  }

  function handleSearchInput(query: string) {
    if (!_.isEmpty(_.trim(query))) {
      setFilter({ field: searchField, query });
    } else {
      setFilter();
    }

    resetErrorBoundaries();
  }

  function handleOrderByInput(field: ShopsOrderByField, direction: SelectKey) {
    let dir: number;
    if (_.isNumber(direction)) {
      dir = direction;
    } else if (_.isString(direction)) {
      dir = parseInt(direction, 10);
    } else {
      dir = direction ? 1 : 0;
    }

    setOrderBy({ field, direction: dir });
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
            value={filter()?.query || ""}
            onInput={(event) => handleSearchInput(event.currentTarget.value)}
            aria-label="search"
          />

          <RefreshIcon class={styles.RefreshIcon} onClick={refetch} />
        </form>
      </Slot>

      <Slot name="content">
        <Section>
          <div class={styles.Filters}>
            <MdSelect
              type="outlined"
              label={trans(TKEYS.query["order-by"]["created-at"].title)}
              options={createdAtOrderByOptions()}
              selected={selectedCreatedAtOrderByKey()}
              onChange={(direction) =>
                handleOrderByInput(
                  ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
                  direction
                )
              }
            />
          </div>
        </Section>

        <Section>
          <Suspense>
            <ErrorBoundary fallback={<ContentError />}>
              <ShopList shops={shops()} />
            </ErrorBoundary>
          </Suspense>
        </Section>
      </Slot>
    </MainRoutesWrapper>
  );
}
