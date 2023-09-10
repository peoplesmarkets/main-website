import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Match, Switch, createResource, createSignal } from "solid-js";

import { OfferList } from "../../components/commerce";
import {
  ContentError,
  ContentLoading,
  isResolved,
} from "../../components/content";
import { SearchGlobalIcon, SearchIcon } from "../../components/icons";
import { Page, Section } from "../../components/layout";
import { TKEYS } from "../../locales";
import { OfferService } from "../../services";
import styles from "./Offers.module.scss";

export default function Offers() {
  const offerService = new OfferService();

  const [searchInput, setSearchInput] = createSignal("");

  const [offers] = createResource(searchInput, fetchOffers);

  async function fetchOffers(search: string) {
    let response;
    if (!_.isEmpty(search)) {
      response = await offerService.search(search);
    } else {
      response = await offerService.list();
    }
    return response.offers;
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
              value={searchInput()}
              onInput={(event) => handleSearchInput(event.currentTarget.value)}
              aria-label="search"
            />
          </form>
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
            <OfferList offers={() => offers()!} showMarketBooth />
          </Match>
        </Switch>
      </Section>
    </Page>
  );
}
