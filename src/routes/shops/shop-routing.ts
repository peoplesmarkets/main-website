import _ from "lodash";

import { buildBaseUrl, buildPath } from "../../lib";
import {
  getOriginFromWindow,
  getSchemeFromWindow,
  isCustomDomain,
} from "../../lib/env";

export const ROOT_PATH = "/shops";
export const SHOP_PATH = "/:shopSlug";
export const SETTINGS_PATH = "/settings";
export const OFFER_PATH = "/offer/:offerId";
export const INVENTORY_PATH = "/inventory";
export const SUBSCRIPTION_PATH = "/subscription/:subscriptionId";

export function buildShopDetailPath(shopSlug: string): string {
  if (isCustomDomain()) {
    return "/";
  }
  return buildPath(ROOT_PATH, shopSlug);
}

export function buildShopPathOrUrl(
  domain: string | undefined,
  shopSlug: string
) {
  if (!_.isNil(domain) && !_.isEmpty(domain)) {
    return `${getSchemeFromWindow()}${domain}`;
  }
  return buildShopDetailPath(shopSlug);
}

export function buildShopSettingsPath(shopSlug: string): string {
  return buildPath(buildShopDetailPath(shopSlug), SETTINGS_PATH);
}

export function buildOfferPath(shopSlug: string, offerId: string): string {
  return buildPath(buildShopDetailPath(shopSlug), "offer", offerId);
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

export function buildInventoryPath(shopSlug: string) {
  return buildPath(buildShopDetailPath(shopSlug), INVENTORY_PATH);
}

export function buildMediasSettingsPath(shopSlug: string) {
  return buildPath(buildShopSettingsPath(shopSlug), INVENTORY_PATH);
}

export function buildSubscriptionPath(
  shopSlug: string,
  subscriptionId: string
) {
  return buildPath(
    buildInventoryPath(shopSlug),
    "subscription",
    subscriptionId
  );
}
