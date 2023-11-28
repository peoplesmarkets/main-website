import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";
import { resourceIsReady } from "../../lib";
import { GetShopRequest } from "../../services/peoplesmarkets/commerce/v1/shop";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { shopService } = useServiceClientContext();

  function request(): GetShopRequest {
    if (isCustomDomain()) {
      return { domain: getDomainFromWindow(), extended: true };
    }
    return { slug: params.shopSlug, extended: true };
  }

  const [shop, { refetch, mutate }] = createResource(request, fetchShop);

  async function fetchShop(request: GetShopRequest) {
    const response = await shopService.get(request);

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
