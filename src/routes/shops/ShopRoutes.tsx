import { Route } from "@solidjs/router";
import { lazy } from "solid-js";

import _ from "lodash";
import { buildBaseUrl, buildPath } from "../../lib";
import {
  getOriginFromWindow,
  getSchemeFromWindow,
  isCustomDomain,
} from "../../lib/env";
import { ShopData } from "./ShopData";
import { buildSignInCallbackPath } from "../user/UserRoutes";

const ROOT_PATH = "/shops";
const SHOP_PATH = "/:shopSlug";
const SETTINGS_PATH = "/settings";
const OFFER_PATH = "/offer/:offerId";
const MEDIAS_PATH = "/media";

export function buildShopDetailPath(slug: string): string {
  if (isCustomDomain()) {
    return "/";
  }
  return buildPath(ROOT_PATH, slug);
}

export function buildShopPathOrUrl(domain: string | undefined, slug: string) {
  if (!_.isNil(domain) && !_.isEmpty(domain)) {
    return `${getSchemeFromWindow()}${domain}`;
  }
  return buildShopDetailPath(slug);
}

export function buildShopSettingsPath(slug: string): string {
  return buildPath(buildShopDetailPath(slug), SETTINGS_PATH);
}

export function buildOfferPath(slug: string, offerId: string): string {
  return buildPath(buildShopDetailPath(slug), "offer", offerId);
}

export function buildOfferUrl(shopSlug: string, offerId: string): string {
  if (isCustomDomain()) {
    return `${getOriginFromWindow()}${buildOfferPath(shopSlug, offerId)}`;
  } else {
    return buildBaseUrl(buildOfferPath(shopSlug, offerId));
  }
}

export function buildOfferSettingsPath(shopSlug: string, offerId: string) {
  return buildPath(buildShopSettingsPath(shopSlug), "offer", offerId);
}

export function buildMediasSettingsPath(shopSlug: string) {
  return buildPath(buildShopSettingsPath(shopSlug), MEDIAS_PATH);
}

export function ShopRoutes() {
  const rootPath = isCustomDomain() ? "" : ROOT_PATH;
  const shopPath = isCustomDomain() ? "" : SHOP_PATH;

  return (
    <>
      <Route
        path={rootPath}
        data={ShopData}
        component={lazy(() => import("./ShopRoutesWrapper"))}
      >
        <Route path={shopPath}>
          <Route path="" component={lazy(() => import("./ShopDetail"))} />

          <Route
            path={OFFER_PATH}
            component={lazy(() => import("./OfferDetail"))}
          />

          <Route path={SETTINGS_PATH}>
            <Route path="" component={lazy(() => import("./ShopSettingsPage"))} />

            <Route
              path={OFFER_PATH}
              component={lazy(() => import("./OfferSettings"))}
            />

            <Route
              path={MEDIAS_PATH}
              component={lazy(() => import("./MediaSettings"))}
            />
          </Route>

          <Route
            path={buildSignInCallbackPath()}
            component={lazy(() => import("./SignInCallback"))}
          />
        </Route>
      </Route>
    </>
  );
}
