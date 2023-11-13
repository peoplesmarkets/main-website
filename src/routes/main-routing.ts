import { buildPath, buildBaseUrl } from "../lib";
import { isCustomDomain } from "../lib/env";

export const ROOT_PATH = "/";
export const GET_STARTED_PATH = "";
export const SHOPS_PATH = "/shops";
export const OFFERS_PATH = "/offers";
export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_CREATE_SHOP_PATH = "/create-shop";

export function buildIndexPath() {
  return "/";
}

export function buildIndexPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildIndexPath());
  }
  return buildIndexPath();
}

export function buildGetStartedPath() {
  return buildPath(ROOT_PATH, GET_STARTED_PATH);
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

export function buildDashboardPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildDashboardPath());
  }
  return buildDashboardPath();
}

export function buildDashboardCreateShopPath() {
  return buildPath(ROOT_PATH, DASHBOARD_PATH, DASHBOARD_CREATE_SHOP_PATH);
}
