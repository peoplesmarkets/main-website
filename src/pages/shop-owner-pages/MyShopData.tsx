import { grpc } from "@improbable-eng/grpc-web";
import { RouteDataFuncArgs, useNavigate } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";
import { buildDashboardPath } from "../../routes/main-routing";

export function MyShopData({ params }: RouteDataFuncArgs) {
  const navigate = useNavigate();
  const { shopService } = useServiceClientContext();

  function navigateToDashboard() {
    navigate(buildDashboardPath(), { replace: true });
    return undefined;
  }

  async function fetchShopByDomain(domain: string) {
    try {
      const response = await shopService.getMyShop({ domain });
      if (_.isNil(response.shop)) {
        return navigateToDashboard();
      }
      return response.shop;
    } catch (err: any) {
      if (err?.code === grpc.Code.NotFound) {
        return navigateToDashboard();
      }
      throw err;
    }
  }

  async function fetchShop(slug: string) {
    try {
      const response = await shopService.getMyShop({ slug });
      if (_.isNil(response.shop)) {
        return navigateToDashboard();
      }
      return response.shop;
    } catch (err: any) {
      if (err?.code === grpc.Code.NotFound) {
        return navigateToDashboard();
      }
      throw err;
    }
  }

  const [shop, { refetch, mutate }] = isCustomDomain()
    ? createResource(() => getDomainFromWindow(), fetchShopByDomain)
    : createResource(() => params.shopSlug, fetchShop);

  return {
    shop,
    refetch,
    mutate,
  };
}
