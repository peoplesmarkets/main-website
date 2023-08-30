// @refresh reload
import _ from "lodash";
import { render } from "solid-js/web";

import "./theme.scss";

import App from "./App";

const root = document.getElementById("root");

if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_URL)) {
  throw new Error("ERROR: missing environment variable 'VITE_AUTH_OAUTH_URL'");
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

if (_.isEmpty(import.meta.env.VITE_AUTH_OAUTH_REDIRECT_URL)) {
  throw new Error(
    "ERROR: missing environment variable 'VITE_AUTH_OAUTH_REDIRECT_URL'"
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

if (_.isEmpty(import.meta.env.VITE_IMAGE_MAX_SIZE)) {
  throw new Error("ERROR: missing environment variable 'VITE_IMAGE_MAX_SIZE'");
}

render(() => <App />, root!);
