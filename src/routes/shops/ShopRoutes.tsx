import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { buildPath } from "../../lib";
import { ShopData } from "./ShopData";

const ROOT_PATH = "/shops";
const MARKET_BOOTH_PATH = "/:marketBoothId";
const OFFER_PATH = MARKET_BOOTH_PATH + "/offer/:offerId";

export function buildShopDetailPath(shopId: string): string {
  return buildPath(ROOT_PATH, shopId);
}

export function buildOfferPath(shopId: string, offerId: string): string {
  return buildPath(buildShopDetailPath(shopId), "offer", offerId);
}

export function ShopRoutes() {
  return (
    <>
      <Route
        path={ROOT_PATH}
        data={ShopData}
        component={lazy(() => import("./ShopRoutesWrapper"))}
      >
        <Route
          path={MARKET_BOOTH_PATH}
          component={lazy(() => import("./ShopDetail"))}
        />

        <Route
          path={OFFER_PATH}
          component={lazy(() => import("./OfferDetail"))}
        />
      </Route>
    </>
  );
}
