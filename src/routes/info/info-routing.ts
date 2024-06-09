import { buildBaseUrl, buildPath } from "../../lib";

export const ROOT_PATH = "/info";
export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export function buildImprintPath() {
  return buildPath(ROOT_PATH, IMPRINT_PATH);
}

export function buildPrivacyPolicyPath() {
  return buildPath(ROOT_PATH, PRIVACY_POLICY_PATH);
}

export function buildTermsOfServicePath() {
  return buildPath(ROOT_PATH, TERMS_OF_SERVICE_PATH);
}
