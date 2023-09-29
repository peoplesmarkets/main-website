import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { buildPath, buildBaseUrl } from "../lib";
import { isCustomDomain } from "../lib/env";

const ROOT_PATH = "/";
const MARKET_BOOTHS_PATH = "/shops";
const OFFERS_PATH = "/offers";
const DASHBOARD_PATH = "/dashboard";

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

export function buildDashboardPath() {
  return buildPath(ROOT_PATH, DASHBOARD_PATH);
}

export default function MainRoutes() {
  return (
    <>
      <Route
        path={ROOT_PATH}
        component={lazy(() => import("./MainRoutesWrapper"))}
      >
        <Route path="" component={lazy(() => import("./LandingPage"))} />

        <Route
          path={MARKET_BOOTHS_PATH}
          component={lazy(() => import("./MarketBooths"))}
        />

        <Route path={OFFERS_PATH} component={lazy(() => import("./Offers"))} />

        <Route
          path={DASHBOARD_PATH}
          component={lazy(() => import("./Dashboard"))}
        />
      </Route>
    </>
  );
}
