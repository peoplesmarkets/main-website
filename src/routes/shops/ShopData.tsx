import { RouteDataFuncArgs } from "@solidjs/router";
import _ from "lodash";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService, StripeService } from "../../services";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [shop, shopActions] = createResource(
    () => params.shopSlug,
    fetchMarketBooth
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
    shop: {
      data: shop,
      refetch: shopActions.refetch,
    },
    stripeAccount: {
      data: stripeAccount,
      refetch: stripeAccountActions.refetch,
    },
  };
}
