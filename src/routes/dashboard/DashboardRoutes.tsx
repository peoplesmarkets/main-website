import { Route } from "@solidjs/router";
import MainRoutesWrapper from "../MainRoutesWrapper";
import { lazy } from "solid-js";
import { buildPath } from "../../lib";

const ROOT_PATH = "/dashboard";
const DASHBOARD_PATH = "/";
const MARKET_BOOTH_PATH = "/:marketBoothId";
const OFFER_PATH = MARKET_BOOTH_PATH + "/offer/:offerId";
const MEDIAS_PATH = MARKET_BOOTH_PATH + "/medias";

export function buildDashboardPath() {
  return buildPath(ROOT_PATH, DASHBOARD_PATH);
}

export function buildDashboardMarketBoothPath(marketBoothId: string) {
  return buildPath(ROOT_PATH, marketBoothId);
}

export function buildDashboardOfferPath(
  marketBoothId: string,
  offerId: string
) {
  return buildPath(ROOT_PATH, marketBoothId, "offer", offerId);
}

export function buildDashboardMediaPath(marketBoothId: string) {
  return buildPath(ROOT_PATH, marketBoothId, "medias");
}

export default function DashboardRoutes() {
  return (
    <Route path={ROOT_PATH} element={<MainRoutesWrapper />}>
      <Route
        path={DASHBOARD_PATH}
        component={lazy(() => import("./Dashboard"))}
      />

      <Route
        path={MARKET_BOOTH_PATH}
        component={lazy(() => import("./MarketBooth"))}
      />

      <Route path={OFFER_PATH} component={lazy(() => import("./Offer"))} />

      <Route path={MEDIAS_PATH} component={lazy(() => import("./Medias"))} />
    </Route>
  );
}
