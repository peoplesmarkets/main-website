import { useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal,
  resetErrorBoundaries,
} from "solid-js";

import { Section } from "../../components/layout";
import { DefaultBoundary } from "../../components/layout/DefaultBoundary";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { ShopData } from "../../routes/shops/ShopData";
import {
  OffersFilter,
  OffersOrderBy,
  OffersOrderByField,
} from "../../services/peoplesmarkets/commerce/v1/offer";
import { ShopLayoutType } from "../../services/peoplesmarkets/commerce/v1/shop_customization";
import { Direction } from "../../services/peoplesmarkets/ordering/v1/ordering";
import { OfferQueryPanel } from "./OfferQueryPanel";
import { ShopLayoutFead } from "./ShopLayoutFead";
import { ShopLayoutOfferList } from "./ShopLayoutOfferList";

export default function ShopDetailPage() {
  const { offerService } = useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [filter, setFilter] = createSignal<OffersFilter>();

  const defaultOrderBy = {
    field: OffersOrderByField.OFFERS_ORDER_BY_FIELD_UPDATED_AT,
    direction: Direction.DIRECTION_ASC,
  };

  const [orderBy, setOrderBy] = createSignal<OffersOrderBy>(
    _.clone(defaultOrderBy)
  );

  function request() {
    return {
      shopId: shopData?.shopId(),
      filter: filter(),
      orderBy: orderBy(),
    };
  }

  const [offersResponse, { refetch }] = createResource(
    request,
    async (request) => {
      const response = await offerService.list(request);
      return response;
    }
  );

  function loaded() {
    return !_.isNil(shopData.shop()) && !_.isNil(offersResponse()?.offers);
  }

  function showQueryPanel() {
    const layoutType = shopData.shop()?.customization?.layoutType;
    if (!_.isNil(layoutType)) {
      return [ShopLayoutType.SHOP_LAYOUT_TYPE_OFFER_LIST].includes(layoutType);
    }
    return false;
  }

  function handleFilterChanged(offersFilter: OffersFilter | undefined) {
    if (_.isEmpty(offersFilter?.query)) {
      setFilter();
    } else {
      setFilter(offersFilter);
    }
    resetErrorBoundaries();
  }

  function handleOrderByChanged(offersOrderBy: OffersOrderBy | undefined) {
    if (_.isNil(offersOrderBy)) {
      setOrderBy(_.clone(defaultOrderBy));
    } else {
      setOrderBy(offersOrderBy);
    }
  }

  function handleUpdate() {
    refetch();
  }

  return (
    <>
      <Show when={showQueryPanel()}>
        <Section>
          <OfferQueryPanel
            filter={filter()}
            onFilterChange={handleFilterChanged}
            orderBy={orderBy()}
            onOrderByChange={handleOrderByChanged}
            onUpdate={handleUpdate}
          />
        </Section>
      </Show>

      <DefaultBoundary loaded={loaded}>
        <Section>
          <Switch>
            <Match
              when={
                shopData.shop()?.customization?.layoutType ===
                ShopLayoutType.SHOP_LAYOUT_TYPE_FEAD
              }
            >
              <ShopLayoutFead offers={offersResponse()?.offers} />
            </Match>
            <Match
              when={
                shopData.shop()?.customization?.layoutType ===
                ShopLayoutType.SHOP_LAYOUT_TYPE_OFFER_LIST
              }
            >
              <ShopLayoutOfferList offers={offersResponse()?.offers} />
            </Match>
          </Switch>
        </Section>
      </DefaultBoundary>
    </>
  );
}
