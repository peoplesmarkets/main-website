import { Route } from "@solidjs/router";
import { lazy } from "solid-js";
import { buildPath } from "../../lib";
import { storeData } from "./storeData";

const ROOT_PATH = "/store";
const MARKET_BOOTH_PATH = "/:marketBoothId";
const OFFER_PATH = MARKET_BOOTH_PATH + "/offer/:offerId";

export function buildStoreRootPath() {
  return ROOT_PATH;
}

export function buildMarketBoothPath(marketBoothId: string): string {
  return buildPath(ROOT_PATH, marketBoothId);
}

export function buildOfferPath(marketBoothId: string, offerId: string): string {
  return buildPath(buildMarketBoothPath(marketBoothId), "offer", offerId);
}

export function StoreRoutes() {
  return (
    <>
      <Route
        path={ROOT_PATH}
        data={storeData}
        component={lazy(() => import("./StoreRoutesWrapper"))}
      >
        <Route
          path={MARKET_BOOTH_PATH}
          component={lazy(() => import("./MarketBoothDetail"))}
        />

        <Route
          path={OFFER_PATH}
          component={lazy(() => import("./OfferDetail"))}
        />
      </Route>
    </>
  );
}
