import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { isResolved } from "../../components/content";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { getDomainFromWindow, isCustomDomain } from "../../lib/env";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";

export function ShopData({ params }: RouteDataFuncArgs) {
  const {
    shopService,
    shopCustomizationService,
    shopDomainService,
    stripeService,
  } = useServiceClientContext();

  const [shop, shopActions] = isCustomDomain()
    ? createResource(() => getDomainFromWindow(), fetchShopByDomain)
    : createResource(() => params.shopSlug, fetchShop);

  function shopId() {
    if (_.isNil(shop.error) && isResolved(shop.state)) {
      return shop()?.shopId;
    }
  }

  const [shopCustomization, shopCustomizationActions] = createResource(
    shopId,
    fetchShopCustomization
  );

  const [shopDomain, shopDomainActions] = createResource(
    shopId,
    fetchShopDomain
  );

  const [stripeAccount, stripeAccountActions] = createResource(
    shopId,
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
    error: () => {
      return shop.error;
    },
    shop: () => {
      if (_.isNil(shop.error) && isResolved(shop.state)) {
        return shop();
      }
    },
    shopCustomization: () => {
      if (
        _.isNil(shopCustomization.error) &&
        isResolved(shopCustomization.state)
      ) {
        return shopCustomization();
      }
    },
    shopDomain: () => {
      if (_.isNil(shopDomain.error) && isResolved(shopDomain.state)) {
        return shopDomain();
      }
    },
    stripeAccount: () => {
      if (_.isNil(stripeAccount.error) && isResolved(stripeAccount.state)) {
        return stripeAccount();
      }
    },
  };
}
