import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import { buildPath } from "../../lib";
import { ShopData } from "./ShopData";

const ROOT_PATH = "/shops";
const SHOP_PATH = "/:shopSlug";
const SHOP_SETTINGS_PATH = SHOP_PATH + "/settings";
const OFFER_PATH = SHOP_PATH + "/offer/:offerId";

export function buildShopDetailPath(slug: string): string {
  return buildPath(ROOT_PATH, slug);
}

export function buildShopSettingsPath(slug: string): string {
  return buildPath(buildShopDetailPath(slug), "settings");
}

export function buildOfferPath(slug: string, offerId: string): string {
  return buildPath(buildShopDetailPath(slug), "offer", offerId);
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
          path={SHOP_PATH}
          component={lazy(() => import("./ShopDetail"))}
        />

        <Route
          path={SHOP_SETTINGS_PATH}
          component={lazy(() => import("./ShopSettings"))}
        />

        <Route
          path={OFFER_PATH}
          component={lazy(() => import("./OfferDetail"))}
        />
      </Route>
    </>
  );
}