import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  For,
  Show,
  Suspense,
  createResource,
  createSignal,
} from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { TKEYS } from "../../locales";
import { buildOfferSettingsPath } from "../../routes/shops/shop-routing";
import { ShopResponse } from "../../services/peoplesmarkets/commerce/v1/shop";
import { PlaceholderImage } from "../assets/PlaceholderImage";
import { ContentError } from "../content";
import { ActionButton } from "../form";
import { Section } from "../layout/Section";
import { CreateOfferDialog } from "./CreateOfferDialog";
import styles from "./OfferSettings.module.scss";

type Props = {
  readonly shop: () => ShopResponse | undefined;
};

export function OfferSettings(props: Props) {
  const { currentSession } = useAccessTokensContext();

  const { offerService } = useServiceClientContext();

  const [offers, { refetch }] = createResource(
    () => props.shop()?.shopId,
    fetchOffers
  );

  const [showCreateOffer, setShowCreateOffer] = createSignal(false);

  async function fetchOffers(shopId: string) {
    const response = await offerService.list({
      userId: currentSession().userId || undefined,
      shopId,
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
    <ErrorBoundary fallback={<ContentError />}>
      <Suspense>
        <Section>
          <div class={styles.TitleSection}>
            <span class={styles.Title}>
              <Trans key={TKEYS.dashboard.offers["title-plural"]} />:
            </span>
            <ActionButton actionType="neutral" onClick={handleOpenCreateOffer}>
              <Trans key={TKEYS.dashboard.offers["create-new-offer"]} />
            </ActionButton>
          </div>

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
        </Section>

        <Show when={showCreateOffer() && !_.isNil(props.shop())}>
          <CreateOfferDialog
            shopId={props.shop()?.shopId}
            onClose={handleCloseCreateOffer}
            onUpdate={refreshOffers}
          />
        </Show>
      </Suspense>
    </ErrorBoundary>
  );
}
