import _ from "lodash";
import { createContext, createSignal, useContext } from "solid-js";
import { ParentProps } from "solid-js/types/render";

import { MarketBoothResponse } from "../services/peoplesmarkets/commerce/v1/market_booth";

const SELECTED_MARKET_BOOTH_STORAGE_KEY = "selected_market_booth_storage";

export function useMarketBoothContext() {
  return useContext(MarketBoothContext);
}

type MarketBoothContextType = ReturnType<typeof initialize>;

const MarketBoothContext = createContext<MarketBoothContextType>(initialize());

export function MarketBoothProvider(props: ParentProps) {
  return (
    <MarketBoothContext.Provider value={useContext(MarketBoothContext)}>
      {props.children}
    </MarketBoothContext.Provider>
  );
}

function initialize() {
  const [currentMarketBooth, _setCurrentMarketBooth] = createSignal<
    MarketBoothResponse | undefined
  >();

  const storedMarketBooth = localStorage?.getItem(
    SELECTED_MARKET_BOOTH_STORAGE_KEY
  );

  if (_.isNil(storedMarketBooth)) {
    localStorage?.removeItem(SELECTED_MARKET_BOOTH_STORAGE_KEY);
  } else {
    const parsed = JSON.parse(storedMarketBooth);

    _setCurrentMarketBooth(parsed);
  }

  function setCurrentMarketBooth(
    marketBooth?: MarketBoothResponse | undefined
  ) {
    _setCurrentMarketBooth(marketBooth);

    if (_.isNil(marketBooth) || _.isEmpty(marketBooth)) {
      localStorage?.removeItem(SELECTED_MARKET_BOOTH_STORAGE_KEY);
    } else {
      localStorage?.setItem(
        SELECTED_MARKET_BOOTH_STORAGE_KEY,
        JSON.stringify(marketBooth)
      );
    }
  }

  return {
    currentMarketBooth,
    setCurrentMarketBooth,
  } as const;
}
