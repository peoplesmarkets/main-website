import { RouteDataFuncArgs } from "@solidjs/router";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService, StripeService } from "../../services";
import _ from "lodash";
import { StripeAccount } from "../../services/peoplesmarkets/payment/v1/stripe";

export function ShopData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);
  const stripeService = new StripeService(accessToken);

  const [shop] = createResource(() => params.marketBoothId, fetchMarketBooth);
  const [stripeAccount] = createResource(
    () => params.marketBoothId,
    fetchStripeAccount
  );

  async function fetchMarketBooth(marketBoothId: string) {
    const response = await marketBoothService.get(marketBoothId);

    if (_.isNil(response.marketBooth)) {
      throw new Error("Not Found");
    }

    return response.marketBooth;
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

  return { shop, stripeAccount };
}
