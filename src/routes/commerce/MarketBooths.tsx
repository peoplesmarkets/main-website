import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { For, Match, Switch, createResource, createSignal } from "solid-js";

import { MARKET_BOOTHS_PATH } from "../../App";
import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../../components/content";
import { Multiline } from "../../components/content/Multiline";
import { SearchIcon } from "../../components/icons/SearchIcon";
import { StoreFrontIcon } from "../../components/icons/StorefrontIcon";
import { Page, Section } from "../../components/layout";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { MarketBoothService } from "../../services";
import styles from "./MarketBooths.module.scss";

export default function MarketBooths() {
  const marketBoothService = new MarketBoothService();

  const [searchInput, setSearchInput] = createSignal("");

  const [marketBooths] = createResource(searchInput, fetchMarketBooths);

  async function fetchMarketBooths(search: string) {
    let response;
    if (!_.isEmpty(search)) {
      response = await marketBoothService.search(search);
    } else {
      response = await marketBoothService.list();
    }
    return response.marketBooths;
  }

  function handleSearchInput(value: string) {
    setSearchInput(value);
  }

  async function handleSearchSubmit(event: SubmitEvent) {
    event.preventDefault();
  }

  return (
    <Page>
      <Section>
        <div class={styles.MarketBooths}>
          <div class={styles.Title}>
            <StoreFrontIcon class={styles.TitleIcon} />
            <span>
              <Trans key={TKEYS["market-booths-search"].title} />
            </span>
          </div>

          <form class={styles.Search} onSubmit={handleSearchSubmit}>
            <SearchIcon class={styles.SearchIcon} />

            <input
              class={styles.SearchInput}
              type="search"
              value={searchInput()}
              onInput={(event) => handleSearchInput(event.currentTarget.value)}
            />
          </form>
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
          <Match when={isResolved(marketBooths.state)}>
            <For each={marketBooths()}>
              {(marketBooth) => (
                <A
                  class={styles.ResultRow}
                  href={buildPath(
                    MARKET_BOOTHS_PATH,
                    marketBooth.marketBoothId
                  )}
                >
                  <span class={styles.Label}>{marketBooth.name}</span>
                  <span class={styles.Detail}>
                    <Multiline
                      text={() => marketBooth.description}
                      maxRows={6}
                    />
                  </span>
                </A>
              )}
            </For>
          </Match>
        </Switch>
      </Section>
    </Page>
  );
}
