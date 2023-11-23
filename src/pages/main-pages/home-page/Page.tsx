import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  createResource,
  createSignal,
  resetErrorBoundaries,
} from "solid-js";

import { ContentError } from "../../../components/content";
import { RefreshIcon, SearchIcon } from "../../../components/icons";
import { Section } from "../../../components/layout";
import { DefaultBoundary } from "../../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../../contexts/ServiceClientContext";
import { TKEYS } from "../../../locales";
import {
  ListShopsRequest,
  ShopsFilter,
  ShopsFilterField,
  ShopsOrderByField,
} from "../../../services/peoplesmarkets/commerce/v1/shop";
import { Direction } from "../../../services/peoplesmarkets/ordering/v1/ordering";
import styles from "./Page.module.scss";
import { ShopList } from "./ShopList";
import { LinkButton } from "../../../components/form/LinkButton";
import {
  buildDashboardPath,
  buildGetStartedPath,
} from "../../../routes/main-routing";
import { useAccessTokensContext } from "../../../contexts/AccessTokensContext";

export default function ShopsPage() {
  const [trans] = useTransContext();

  const { isAuthenticated } = useAccessTokensContext();
  const { shopService } = useServiceClientContext();

  const searchField = ShopsFilterField.SHOPS_FILTER_FIELD_NAME_AND_DESCRIPTION;

  const defaultOrderBy = {
    field: ShopsOrderByField.SHOPS_ORDER_BY_FIELD_CREATED_AT,
    direction: Direction.DIRECTION_DESC,
  };

  const defaultFilter = {
    field: ShopsFilterField.SHOPS_FILTER_FIELD_NAME_AND_DESCRIPTION,
    query: "",
  };

  const [filter, setFilter] = createSignal<ShopsFilter>(_.clone(defaultFilter));

  const [shops, { refetch }] = createResource(() => filter(), fetchShops);

  async function fetchShops(filter: ShopsFilter) {
    let request = {
      orderBy: defaultOrderBy,
      extended: true,
    } as ListShopsRequest;

    if (!_.isNil(filter.query) && !_.isEmpty(filter.query)) {
      request.filter = filter;
    }

    return shopService
      .list(request)
      .then((res) => res.shops)
      .catch(() => []);
  }

  function loaded() {
    return !_.isNil(shops());
  }

  function handleSearchInput(query: string) {
    if (!_.isEmpty(_.trim(query))) {
      setFilter(() => ({ field: searchField, query }));
    } else {
      setFilter(() => defaultFilter);
    }

    resetErrorBoundaries();
  }

  async function handleSearchSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  return (
    <ErrorBoundary fallback={<ContentError />}>
      <Section flat>
        <form class={styles.Search} onSubmit={handleSearchSubmit}>
          <SearchIcon class={styles.SearchIcon} />

          <input
            class={styles.SearchInput}
            id="search"
            type="search"
            placeholder={trans(TKEYS["home-page"]["search-shops"])}
            value={filter()?.query || ""}
            onInput={(event) => handleSearchInput(event.currentTarget.value)}
            aria-label="search"
          />

          <RefreshIcon class={styles.RefreshIcon} onClick={refetch} />
        </form>
      </Section>

      <Section>
        <DefaultBoundary loaded={loaded}>
          <ShopList shops={shops()} />
        </DefaultBoundary>
      </Section>

      <Show when={!isAuthenticated()}>
        <Section>
          <div class={styles.Actions}>
            <LinkButton
              actionType="active-filled"
              round
              tall
              href={buildGetStartedPath()}
            >
              <Trans
                key={TKEYS["main-navigation"].actions["create-your-own-shop"]}
              />
            </LinkButton>
          </div>
        </Section>
      </Show>
    </ErrorBoundary>
  );
}
