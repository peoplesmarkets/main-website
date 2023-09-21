import { RouteDataFuncArgs } from "@solidjs/router";
import { createResource } from "solid-js";

import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { MarketBoothService } from "../../services";

export function storeData({ params }: RouteDataFuncArgs) {
  const { accessToken } = useAccessTokensContext();
  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBooth] = createResource(
    () => params.marketBoothId,
    fetchMarketBooth
  );

  async function fetchMarketBooth(marketBoothId: string) {
    const response = await marketBoothService.get(marketBoothId);
    return response.marketBooth;
  }

  return marketBooth;
}
