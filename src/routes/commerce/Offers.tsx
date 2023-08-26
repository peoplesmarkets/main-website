import { Trans } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { For, createResource, createSignal } from "solid-js";

import { SearchGlobalIcon } from "../../components/icons/SearchGlobalIcon";
import { SearchIcon } from "../../components/icons/SearchIcon";
import { Page, Section } from "../../components/layout";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import styles from "./Offers.module.scss";
import { Multiline } from "../../components/content/Multiline";

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
          <div class={styles.Title}>
            <SearchGlobalIcon class={styles.TitleIcon} />
            <span>
              <Trans key={TKEYS["offers-search"].title} />
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
        <For each={offers()}>
          {(offer) => (
            <div class={styles.ResultRow}>
              <span class={styles.Label}>{offer.name}</span>
              <span class={styles.Detail}>
                <Multiline text={() => offer.description} maxRows={6} />
              </span>
            </div>
          )}
        </For>
      </Section>
    </Page>
  );
}
