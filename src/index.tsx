// @refresh reload
import { TransProvider } from "@mbarzda/solid-i18next";
import { Router } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import _ from "lodash";
import { render } from "solid-js/web";

// import "@peoplesmarkets/frontend-lib/theme.scss";
import "./theme.scss";

import App from "./App";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { LOCALES } from "./locales";

const root = document.getElementById("root");

if (_.isEmpty(import.meta.env.VITE_SERIVCE_APIS_URL)) {
  throw new Error(
    "ERROR: missing environment variable 'VITE_SERIVCE_APIS_URL'"
  );
}

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

if (_.isEmpty(import.meta.env.VITE_COMMUNITY_WEBSITE_URL)) {
  throw new Error(
    "ERROR: missing environment variable 'VITE_COMMUNITY_WEBSITE_URL'"
  );
}

render(() => {
  const instance = i18next.createInstance({
    load: "all",
    resources: LOCALES,
  });
  instance.use(LanguageDetector);

  return (
    <Router>
      <AccessTokenProvider>
        <TransProvider instance={instance}>
          <App />
        </TransProvider>
      </AccessTokenProvider>
    </Router>
  );
}, root!);
