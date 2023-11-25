import _ from "lodash";

import { buildBaseUrl, buildPath } from "../../lib";
import {
  getOriginFromWindow,
  getSchemeFromWindow,
  isCustomDomain,
} from "../../lib/env";

export const ROOT_PATH = "/shops";
export const SHOP_PATH = "/:shopSlug";

export const OFFER_PATH = "/offer/:offerId";
export const INVENTORY_PATH = "/inventory";
export const SUBSCRIPTION_PATH = "/subscription/:subscriptionId";

export function buildShopDetailPath(shopSlug: string): string {
  if (isCustomDomain()) {
    return "/";
  }
  return buildPath(ROOT_PATH, shopSlug);
}

export function buildShopDetailPathOrUrl(
  domain: string | undefined,
  shopSlug: string
) {
  if (!_.isNil(domain) && !_.isEmpty(domain)) {
    return `${getSchemeFromWindow()}${domain}`;
  }
  return buildShopDetailPath(shopSlug);
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

export function buildSubscriptionPath(
  shopSlug: string,
  subscriptionId: string
) {
  return buildPath(
    buildShopDetailPath(shopSlug),
    "subscription",
    subscriptionId
  );
}
