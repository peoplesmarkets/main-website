import { buildPath, buildBaseUrl } from "../lib";
import { isCustomDomain } from "../lib/env";

export const ROOT_PATH = "/";
export const SHOPS_PATH = "/shops";
export const OFFERS_PATH = "/offers";
export const DASHBOARD_PATH = "/dashboard";

export function buildIndexPath() {
  return "/";
}

export function buildIndexPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildIndexPath());
  }
  return buildIndexPath();
}

export function buildShopsPath() {
  return buildPath(ROOT_PATH, SHOPS_PATH);
}

export function buildOffersPath() {
  return buildPath(ROOT_PATH, OFFERS_PATH);
}

export function buildDashboardPath() {
  return buildPath(ROOT_PATH, DASHBOARD_PATH);
}
