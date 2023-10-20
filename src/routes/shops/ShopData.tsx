import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";
import { resourceIsReady } from "../../lib";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { shopService } = useServiceClientContext();

  const [shop, { refetch, mutate }] = isCustomDomain()
    ? createResource(() => getDomainFromWindow(), fetchShopByDomain)
    : createResource(() => params.shopSlug, fetchShop);

  async function fetchShopByDomain(domain: string) {
    const response = await shopService.getByDomain(domain);

    if (_.isNil(response.shop)) {
      throw new Error("Not Found");
    }

    return response.shop;
  }

  async function fetchShop(slug: string) {
    const response = await shopService.getBySlug(slug);

    if (_.isNil(response.shop)) {
      throw new Error("Not Found");
    }

    return response.shop;
  }

  function shopId() {
    if (resourceIsReady(shop)) {
      return shop()?.shopId;
    }
  }

  return {
    shop,
    refetch,
    mutate,
    shopId,
  };
}
