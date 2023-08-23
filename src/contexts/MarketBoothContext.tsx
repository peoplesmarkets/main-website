import _ from "lodash";
import { createContext, createSignal, useContext } from "solid-js";
import { ParentProps } from "solid-js/types/render";

import { MarketBoothResponse } from "../services/peoplesmarkets/commerce/v1/market_booth";
import { useAccessTokensContext } from "./AccessTokensContext";
import { MarketBoothService } from "../services";

export function useMarketBoothContext() {
  return useContext(MarketBoothContext);
}

type MarketBoothContextType = ReturnType<typeof initialize>;

const handle = initialize();

const MarketBoothContext = createContext<MarketBoothContextType>(handle);

export function MarketBoothProvider(props: ParentProps) {
  return (
    <MarketBoothContext.Provider value={handle}>
      {props.children}
    </MarketBoothContext.Provider>
  );
}

function initialize() {
  const { accessToken, currentSession } = useAccessTokensContext();

  const marketBoothService = new MarketBoothService(accessToken);

  const [marketBoothList, setMarketBoothList] = createSignal<
    MarketBoothResponse[]
  >([]);

  const [currentMarketBooth, _setCurrentMarketBooth] = createSignal<
    MarketBoothResponse | undefined
  >();

  const [initialized, setInitialized] = createSignal(false);

  function setCurrentMarketBooth(marketBooth?: string | MarketBoothResponse) {
    if (_.isString(marketBooth)) {
      const foundMarketBooth = marketBoothList()?.find(
        (m) => m.marketBoothId === marketBooth
      );
      _setCurrentMarketBooth(foundMarketBooth);
      return !_.isNil(foundMarketBooth);
    }

    _setCurrentMarketBooth(marketBooth);
    return !_.isNil(marketBooth);
  }

  /* eslint-disable solid/reactivity */
  async function refetchMarketBoothList() {
    const response = await marketBoothService.list(currentSession().userId);
    setMarketBoothList(response.marketBooths);
    if (_.isEmpty(response.marketBooths)) {
      setCurrentMarketBooth();
    } else if (
      _.isNil(currentMarketBooth()) ||
      !response.marketBooths.find(
        (m) => m.marketBoothId === currentMarketBooth()?.marketBoothId
      )
    ) {
      setCurrentMarketBooth(_.first(response.marketBooths));
    }
    setInitialized(true);
  }
  /* eslint-enable solid/reactivity */

  async function refetchCurrentMarketBooth() {
    if (!_.isNil(currentMarketBooth())) {
      const response = await marketBoothService.get(
        currentMarketBooth()!.marketBoothId
      );
      setCurrentMarketBooth(response.marketBooth);
    }
  }

  async function initializeMarketBoothList() {
    if (!initialized()) {
      await refetchMarketBoothList();
    }
  }

  return {
    currentMarketBooth,
    setCurrentMarketBooth,
    refetchCurrentMarketBooth,
    marketBoothList,
    refetchMarketBoothList,
    initializeMarketBoothList,
  } as const;
}
