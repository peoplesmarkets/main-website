import _ from "lodash";

export function isCustomDomain() {
  return !_.startsWith(window?.location?.href, import.meta.env.VITE_BASE_URL);
}

export function getDomainFromWindow() {
  if (!isCustomDomain()) {
    throw new Error("Unexpected Error");
  }

  const url = new URL(window.location.href);

  if (!_.isNil(url.port) && !_.isEmpty(url.port)) {
    return `${url.hostname}:${url.port}`;
  }

  return url.hostname;
}

export function getOriginFromWindow() {
  return new URL(window.location.href).origin;
}

export function getSchemeFromWindow() {
  return new URL(window.location.href).protocol + '//';
}

export function checkEnvironmentVariables() {
  if (_.isEmpty(import.meta.env.VITE_BASE_URL)) {
    throw new Error("ERROR: missing environment variable 'VITE_BASE_URL'");
  }

  if (_.isEmpty(import.meta.env.VITE_ENVIRONMENT)) {
    throw new Error("ERROR: missing environment variable 'VITE_ENVIRONMENT'");
  }

  if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_AUTH_OAUTH_URL'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_CLIENT_ID)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_AUTH_OAUTH_CLIENT_ID'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_ORG_ID)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_AUTH_OAUTH_ORG_ID'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_AUTH_OAUTH_LOGOUT_REDIRECT_URL'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_OPEN_SOURCE_REPOSITORIES_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_OPEN_SOURCE_REPOSITORIES_URL'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_MAIN_WEBSITE_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_MAIN_WEBSITE_URL'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_SERIVCE_APIS_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_SERIVCE_APIS_URL'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_FILE_MAX_SIZE)) {
    throw new Error("ERROR: missing environment variable 'VITE_FILE_MAX_SIZE'");
  }

  if (_.isEmpty(import.meta.env.VITE_IMAGE_MAX_SIZE)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_IMAGE_MAX_SIZE'"
    );
  }

  if (_.isEmpty(import.meta.env.VITE_SUPPORT_EMAIL_ADDRESS)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_SUPPORT_EMAIL_ADDRESS'"
    );
  }
}
