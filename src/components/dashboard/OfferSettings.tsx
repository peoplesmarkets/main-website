import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import {
  For,
  Match,
  Show,
  Switch,
  createResource,
  createSignal,
  onMount,
} from "solid-js";

import { DASHBOARD_PATH, OFFERS_SUBPATH } from "../../App";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { buildPath } from "../../lib";
import { TKEYS } from "../../locales/dev";
import { OfferService } from "../../services";
import { MarketBoothResponse } from "../../services/peoplesmarkets/commerce/v1/market_booth";
import { ContentError, ContentLoading, isResolved } from "../content";
import { ActionButton } from "../form";
import { ImageIcon } from "../icons";
import { Section } from "../layout/Section";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./OfferSettings.module.scss";

type Props = {
  readonly marketBooth: () => MarketBoothResponse;
};

export function OfferSettings(props: Props) {
  const { accessToken, currentSession } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offers, { refetch }] = createResource(fetchOffers);

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  onMount(async () => {
    await refreshOffers();
  });

  async function fetchOffers() {
    const response = await offerService.list(
      currentSession().userId,
      props.marketBooth().marketBoothId
    );

    return response.offers;
  }

  async function refreshOffers() {
    refetch();
  }

  function handleOpenCreateOffer() {
    setShowCreateOffer(true);
  }

  function handleCloseCreateOffer() {
    setShowCreateOffer(false);
  }

  return (
    <>
      <Section>
        <span class={styles.Title}>
          <Trans key={TKEYS.dashboard.offers["title-plural"]} />
        </span>

        <Switch>
          <Match when={offers.state === "errored"}>
            <ContentError />
          </Match>
          <Match when={offers.state === "pending"}>
            <ContentLoading />
          </Match>
          <Match when={isResolved(offers.state)}>
            <div class={styles.Table}>
              <For each={offers()}>
                {(offer) => (
                  <A
                    class={styles.Row}
                    href={buildPath(
                      DASHBOARD_PATH,
                      props.marketBooth().marketBoothId,
                      OFFERS_SUBPATH,
                      offer.offerId
                    )}
                  >
                    <Show
                      when={!_.isEmpty(offer.images)}
                      fallback={
                        <div class={styles.ImagePlaceholder}>
                          <ImageIcon class={styles.PlaceholderIcon} />
                        </div>
                      }
                    >
                      <img
                        class={styles.Image}
                        src={_.first(offer.images)?.imageUrl}
                        alt=""
                      />
                    </Show>

                    <span class={styles.Name}>{offer.name}</span>
                  </A>
                )}
              </For>
            </div>
          </Match>
        </Switch>

        <div class={styles.TableActions}>
          <ActionButton
            actionType="active-filled"
            onClick={handleOpenCreateOffer}
          >
            <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
          </ActionButton>
        </div>
      </Section>

      <Show when={showCreateOffer()}>
        <CreateOfferDialog
          marketBoothId={props.marketBooth().marketBoothId}
          onClose={handleCloseCreateOffer}
          onUpdate={refreshOffers}
        />
      </Show>
    </>
  );
}
