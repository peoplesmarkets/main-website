import { Trans } from "@mbarzda/solid-i18next";
import { A, useRouteData } from "@solidjs/router";
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

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { TKEYS } from "../../locales/dev";
import { ShopData } from "../../routes/shops/ShopData";
import { OfferService } from "../../services";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { ContentError, ContentLoading, isResolved } from "../content";
import { ActionButton } from "../form";
import { Section } from "../layout/Section";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./OfferSettings.module.scss";
import { buildOfferSettingsPath } from "../../routes/shops/ShopRoutes";

export function OfferSettings() {
  const shopData = useRouteData<typeof ShopData>();

  const { accessToken, currentSession } = useAccessTokensContext();

  const offerService = new OfferService(accessToken);

  const [offers, { refetch }] = createResource(fetchOffers);

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  onMount(async () => {
    await refreshOffers();
  });

  async function fetchOffers() {
    const response = await offerService.list({
      userId: currentSession().userId || undefined,
      shopId: shopData.shop.data()?.shopId,
    });

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
        <div class={styles.TitleSection}>
          <span class={styles.Title}>
            <Trans key={TKEYS.dashboard.offers["title-plural"]} />:
          </span>
          <ActionButton actionType="neutral" onClick={handleOpenCreateOffer}>
            <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
          </ActionButton>
        </div>

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
                    href={buildOfferSettingsPath(offer.shopSlug, offer.offerId)}
                  >
                    <Show
                      when={!_.isEmpty(offer.images)}
                      fallback={<PlaceholderImage small />}
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
      </Section>

      <Show when={showCreateOffer() && !_.isNil(shopData.shop.data())}>
        <CreateOfferDialog
          shopId={shopData.shop.data()!.shopId}
          onClose={handleCloseCreateOffer}
          onUpdate={refreshOffers}
        />
      </Show>
    </>
  );
}
