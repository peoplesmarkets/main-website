import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService, StripeService } from "../../services";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";
import { ShopCustomizationService } from "../../services/commerce/shop_customization";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const shopCustomizationService = new ShopCustomizationService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [shop, shopActions] = createResource(
    () => params.shopSlug,
    fetchMarketBooth
  );

  const [shopCustomization, shopCustomizationActions] = createResource(
    () => shop?.()?.marketBoothId,
    fetchShopCustomization
  );

  const [stripeAccount, stripeAccountActions] = createResource(
    () => shop?.()?.marketBoothId,
    fetchStripeAccount
  );

  async function fetchMarketBooth(idOrName: string) {
    try {
      const response = await marketBoothService.getBySlug(idOrName);

      if (_.isNil(response.marketBooth)) {
        throw new Error("Not Found");
      }

      return response.marketBooth;
    } catch (err) {
      throw new Error("Not Found");
    }
  }

  async function fetchShopCustomization(shopId: string) {
    try {
      const response = await shopCustomizationService.get(shopId);

      if (_.isNil(response.shopCustomization)) {
        throw new Error("Not Found");
      }

      return response.shopCustomization;
    } catch (err) {
      throw new Error("Not Found");
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
    stripeAccount: {
      data: stripeAccount,
      refetch: stripeAccountActions.refetch,
    },
  };
}
