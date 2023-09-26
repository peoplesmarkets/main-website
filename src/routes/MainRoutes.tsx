import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { buildPath, buildBaseUrl } from "../lib";
import { isCustomDomain } from "../lib/env";

const ROOT_PATH = "";
const MARKET_BOOTHS_PATH = "/";
const OFFERS_PATH = "/offers";

export function buildIndexPath() {
  return "/";
}

export function buildIndexPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildIndexPath());
  }
  return buildIndexPath();
}

export function buildMarketBoothsPath() {
  return buildPath(ROOT_PATH, MARKET_BOOTHS_PATH);
}

export function buildOffersPath() {
  return buildPath(ROOT_PATH, OFFERS_PATH);
}

export default function MainRoutes() {
  return (
    <>
      <Route
        path={ROOT_PATH}
        component={lazy(() => import("./MainRoutesWrapper"))}
      >
        <Route
          path={MARKET_BOOTHS_PATH}
          component={lazy(() => import("./MarketBooths"))}
        />
        <Route path={OFFERS_PATH} component={lazy(() => import("./Offers"))} />
      </Route>
    </>
  );
}
