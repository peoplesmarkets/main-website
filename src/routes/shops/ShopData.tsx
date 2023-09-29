import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import {
  ShopService,
  ShopDomainService,
  StripeService,
} from "../../services";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();

  const shopService = new ShopService(accessToken);
  const shopCustomizationService = new ShopCustomizationService(accessToken);
  const shopDomainService = new ShopDomainService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [shop, shopActions] = isCustomDomain()
    ? createResource(() => getDomainFromWindow(), fetchShopByDomain)
    : createResource(() => params.shopSlug, fetchShop);

  const [shopCustomization, shopCustomizationActions] = createResource(
    () => shop?.()?.shopId,
    fetchShopCustomization
  );

  const [shopDomain, shopDomainActions] = createResource(
    () => shop?.()?.shopId,
    fetchShopDomain
  );

  const [stripeAccount, stripeAccountActions] = createResource(
    () => shop?.()?.shopId,
    fetchStripeAccount
  );

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

  async function fetchStripeAccount(shopId: string) {
    try {
      const response = await stripeService.getAccount(shopId);

      if (_.isNil(response.account)) {
        return {
          shopId,
          enabled: false,
        } as StripeAccount;
      }
      return response.account;
    } catch (err: any) {
      return {
        shopId,
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
