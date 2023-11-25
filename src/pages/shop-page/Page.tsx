import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import { For, Show, createResource } from "solid-js";

import { Multiline } from "../../components/content";
import { Border, Section } from "../../components/layout";
import { DefaultBoundary } from "../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { ShopData } from "../../routes/shops/ShopData";
import { OffersOrderByField } from "../../services/peoplesmarkets/commerce/v1/offer";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { OfferDetailView } from "./OfferDetailCard";
import styles from "./Page.module.scss";

export default function ShopDetailPage() {
  const { offerService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [offers] = createResource(shopData?.shopId, async (shopId) => {
    const response = await offerService.list({
      shopId,
      orderBy: {
        field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
        direction: Direction.DIRECTION_ASC,
      },
    });
    return response.offers;
  });

  function loaded() {
    return !_.isNil(shopData.shop()) && !_.isNil(offers());
  }

  function isLastItem(index: number) {
    return index + 1 === offers()?.length;
  }

  return (
    <DefaultBoundary loaded={loaded}>
      <Show when={!_.isEmpty(shopData?.shop()?.description)}>
        <Section>
          <span class={styles.Description}>
            <Multiline text={shopData.shop()?.description} />
          </span>
        </Section>
      </Show>

      <Section>
        <For each={offers()}>
          {(offer, index) => (
            <div data-index={index()}>
              <OfferDetailView offer={offer} />

              <Show when={!isLastItem(index())}>
                <Border />
              </Show>
            </div>
          )}
        </For>
      </Section>
    </DefaultBoundary>
  );
}
