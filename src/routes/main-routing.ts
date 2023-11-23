import { buildBaseUrl, buildPath } from "../lib";
import { getOriginFromWindow, isCustomDomain } from "../lib/env";

export const DASHBOARD_SHOP_PATH_SEGMENT = "/:shopId";
export const DASHBOARD_OFFER_PATH_SEGMENT = "/:offerId";

export function buildIndexPath() {
  return "/";
}

export function buildIndexUrl() {
  return buildBaseUrl(buildIndexPath());
}

export function buildIndexPathOrUrl() {
  if (isCustomDomain()) {
    return buildIndexUrl();
  }
  return buildIndexPath();
}

export function buildGetStartedPath() {
  return buildPath(buildIndexPath(), "get-started");
}

export function buildShopsPath() {
  return buildPath(buildIndexPath(), "shops");
}

export function buildDashboardPath() {
  return buildPath(buildIndexPath(), "dashboard");
}

export function buildDashboardPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildDashboardPath());
  }
  return buildDashboardPath();
}

export function buildShopDashboardPath(shopId: string): string {
  return buildPath(buildDashboardPath(), shopId);
}

export function buildShopConfigurationPath(shopId: string): string {
  return buildPath(buildShopDashboardPath(shopId), "configurator");
}

export function buildOfferDetailConfigurationPath(
  shopId: string,
  offerId: string
): string {
  return buildPath(buildShopDashboardPath(shopId), "offer", offerId);
}

export function buildShopSettingsPath(shopId: string): string {
  return buildPath(buildShopDashboardPath(shopId), "settings");
}

export function buildMediaConfigurationPath(shopId: string) {
  return buildPath(buildShopDashboardPath(shopId), "media");
}

export function buildSignInCallbackPath() {
  return buildPath(buildIndexPath(), "user", "sign-in", "callback");
}

export function buildSignInCallbackUrl() {
  return `${getOriginFromWindow()}${buildSignInCallbackPath()}`;
}
