import { buildBaseUrl, buildPath } from "../../lib";
import { getOriginFromWindow } from "../../lib/env";

export const DASHBOARD_SHOP_PATH_SEGMENT = "/:shopId";
export const DASHBOARD_OFFER_PATH_SEGMENT = "/:offerId";

export function buildIndexPath() {
  return "/";
}

export function buildIndexUrl() {
  return buildBaseUrl(buildIndexPath());
}

export function buildShopsPath() {
  return buildPath(buildIndexPath(), "shops");
}

export function buildDashboardPath() {
  return buildPath(buildIndexPath(), "dashboard");
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

export function buildSignOutCallbackPath() {
  return buildPath(buildIndexPath(), "user", "sign-out", "callback");
}

export function buildSignOutCallbackUrl() {
  return `${getOriginFromWindow()}${buildSignOutCallbackPath()}`;
}
