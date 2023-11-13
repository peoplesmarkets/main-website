import _ from "lodash";

import { buildBaseUrl, buildPath } from "../../lib";
import {
  getOriginFromWindow,
  getSchemeFromWindow,
  isCustomDomain,
} from "../../lib/env";

export const ROOT_PATH = "/shops";
export const SHOP_PATH = "/:shopSlug";
export const CONFIGURATION_PATH = "/configuration";
export const OFFERS_CONFIGURATION_PATH = "/offers";
export const SETTINGS_CONFIGURATION_PATH = "/settings";
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

export function buildShopConfigurationPath(shopSlug: string): string {
  return buildPath(buildShopDetailPath(shopSlug), CONFIGURATION_PATH);
}

export function buildShopSettingsPath(shopSlug: string): string {
  return buildPath(
    buildShopConfigurationPath(shopSlug),
    SETTINGS_CONFIGURATION_PATH
  );
}

export function buildOffersConfigurationPath(shopSlug: string): string {
  return buildPath(
    buildShopConfigurationPath(shopSlug),
    OFFERS_CONFIGURATION_PATH
  );
}

export function buildOfferDetailConfigurationPath(
  shopSlug: string,
  offerId: string
): string {
  return buildPath(buildShopConfigurationPath(shopSlug), "offer", offerId);
}

export function buildOfferPath(shopSlug: string, offerId: string): string {
  return buildPath(buildShopDetailPath(shopSlug), "offer", offerId);
}

export function buildOfferUrl(shopSlug: string, offerId: string): string {
  const offerPath = buildOfferPath(shopSlug, offerId);
  if (isCustomDomain()) {
    return `${getOriginFromWindow()}${offerPath}`;
  } else {
    return buildBaseUrl(offerPath);
  }
}

export function buildOfferPathOrUrl(
  shopSlug: string,
  offerId: string,
  shopDomain?: string | undefined
) {
  if (!_.isNil(shopDomain) && !_.isEmpty(shopDomain)) {
    return `${getSchemeFromWindow()}${shopDomain}/offer/${offerId}`;
  }
  return buildOfferPath(shopSlug, offerId);
}

export function buildOfferSettingsPath(shopSlug: string, offerId: string) {
  return buildPath(buildShopSettingsPath(shopSlug), "offer", offerId);
}

export function buildInventoryPath(shopSlug: string) {
  return buildPath(buildShopDetailPath(shopSlug), INVENTORY_PATH);
}

export function buildInventoryUrl(shopSlug: string) {
  const inventoryPath = buildInventoryPath(shopSlug);
  if (isCustomDomain()) {
    return `${getOriginFromWindow()}${inventoryPath}`;
  }
  return buildBaseUrl(inventoryPath);
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
