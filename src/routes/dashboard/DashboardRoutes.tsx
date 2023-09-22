import { Route } from "@solidjs/router";
import MainRoutesWrapper from "../MainRoutesWrapper";
import { lazy } from "solid-js";
import { buildPath } from "../../lib";
import { ShopData } from "../shops/ShopData";

const ROOT_PATH = "/dashboard";
const DASHBOARD_PATH = "/";
const SHOP_PATH = "/:shopSlug";
const OFFER_PATH = SHOP_PATH + "/offer/:offerId";
const MEDIAS_PATH = SHOP_PATH + "/medias";

export function buildDashboardPath() {
  return buildPath(ROOT_PATH, DASHBOARD_PATH);
}

export function buildDashboardMarketBoothPath(slug: string) {
  return buildPath(ROOT_PATH, slug);
}

export function buildDashboardOfferPath(slug: string, offerId: string) {
  return buildPath(ROOT_PATH, slug, "offer", offerId);
}

export function buildDashboardMediaPath(slug: string) {
  return buildPath(ROOT_PATH, slug, "medias");
}

export default function DashboardRoutes() {
  return (
    <Route path={ROOT_PATH} element={<MainRoutesWrapper />}>
      <Route
        path={DASHBOARD_PATH}
        component={lazy(() => import("./Dashboard"))}
      />

      <Route
        path={SHOP_PATH}
        data={ShopData}
        component={lazy(() => import("./MarketBooth"))}
      />

      <Route
        path={OFFER_PATH}
        data={ShopData}
        component={lazy(() => import("./Offer"))}
      />

      <Route
        path={MEDIAS_PATH}
        data={ShopData}
        component={lazy(() => import("./Medias"))}
      />
    </Route>
  );
}
