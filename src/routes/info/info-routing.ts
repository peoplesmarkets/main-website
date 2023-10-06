import { buildBaseUrl, buildPath, isCustomDomain } from "../../lib";

export const ROOT_PATH = "/info";
export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export function buildImprintPath() {
  return buildPath(ROOT_PATH, IMPRINT_PATH);
}

export function buildImprintPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildImprintPath());
  }
  return buildImprintPath();
}

export function buildPrivacyPolicyPath() {
  return buildPath(ROOT_PATH, PRIVACY_POLICY_PATH);
}

export function buildPrivacyPolicyPathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildPrivacyPolicyPath());
  }
  return buildPrivacyPolicyPath();
}

export function buildTermsOfServicePath() {
  return buildPath(ROOT_PATH, TERMS_OF_SERVICE_PATH);
}

export function buildTermsOfServicePathOrUrl() {
  if (isCustomDomain()) {
    return buildBaseUrl(buildTermsOfServicePath());
  }
  return buildTermsOfServicePath();
}
