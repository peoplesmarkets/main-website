import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import {
  MarketBoothService,
  ShopDomainService,
  StripeService,
} from "../../services";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const shopCustomizationService = new ShopCustomizationService(accessToken);
  const shopDomainService = new ShopDomainService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [shop, shopActions] = isCustomDomain()
    ? createResource(() => getDomainFromWindow(), fetchShopByDomain)
    : createResource(() => params.shopSlug, fetchMarketBooth);

  const [shopCustomization, shopCustomizationActions] = createResource(
    () => shop?.()?.marketBoothId,
    fetchShopCustomization
  );

  const [shopDomain, shopDomainActions] = createResource(
    () => shop?.()?.marketBoothId,
    fetchShopDomain
  );

  const [stripeAccount, stripeAccountActions] = createResource(
    () => shop?.()?.marketBoothId,
    fetchStripeAccount
  );

  async function fetchShopByDomain(domain: string) {
    const response = await marketBoothService.getByDomain(domain);

    if (_.isNil(response.marketBooth)) {
      throw new Error("Not Found");
    }

    return response.marketBooth;
  }

  async function fetchMarketBooth(slug: string) {
    const response = await marketBoothService.getBySlug(slug);

    if (_.isNil(response.marketBooth)) {
      throw new Error("Not Found");
    }

    return response.marketBooth;
  }

  async function fetchShopCustomization(shopId: string) {
    try {
      const response = await shopCustomizationService.get(shopId);
      return response.shopCustomization;
    } catch (_) {
      return;
    }
  }

  async function fetchShopDomain(shopId: string) {
    try {
      const response = await shopDomainService.getDomainStatus(shopId);
      return response.domainStatus;
    } catch (_) {
      return;
    }
  }

  async function fetchStripeAccount(marketBoothId: string) {
    try {
      const response = await stripeService.getAccount(marketBoothId);

      if (_.isNil(response.account)) {
        return {
          marketBoothId,
          enabled: false,
        } as StripeAccount;
      }
      return response.account;
    } catch (err: any) {
      return {
        marketBoothId,
        enabled: false,
      } as StripeAccount;
    }
  }

  return {
    refetch: () => {
      shopActions.refetch();
      shopCustomizationActions.refetch();
      shopDomainActions.refetch();
      stripeAccountActions.refetch();
    },
    shop: {
      data: shop,
      refetch: shopActions.refetch,
    },
    shopCustomization: {
      data: shopCustomization,
      refetch: shopCustomizationActions.refetch,
    },
    shopDomain: {
      data: shopDomain,
      refetch: shopDomainActions.refetch,
    },
    stripeAccount: {
      data: stripeAccount,
      refetch: stripeAccountActions.refetch,
    },
  };
}
