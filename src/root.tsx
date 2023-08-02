// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Link,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import _ from "lodash";

import "./theme.scss";
import { AccessTokenProvider } from "./AccessTokensContext";
import { initializeThemeStore } from "./ThemeStore";
import TopAppBar from "./components/layout/TopAppBar";
import styles from "./root.module.scss";
import Footer from "./components/layout/Footer";

export const HOME_PAGE_PATH = "/";
export const GET_STARTED_PATH = "/get-started";

export const SIGN_IN_PATH = "/sign-in";
export const SIGN_IN_CALLBACK = "/sign-in/callback";

export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export default function Root() {
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

  if (_.isEmpty(import.meta.env.VITE_RESPONSIBLE_DEVELOPER_URL)) {
    throw new Error(
      "ERROR: missing environment variable 'VITE_RESPONSIBLE_DEVELOPER_URL'"
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

  initializeThemeStore();

  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="color-scheme" content="light dark" />
        <Meta name="theme-color" content="#000000" />

        <Link rel="shortcut icon" type="image/svg" href="/assets/favicon.svg" />
        <Link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800"
        />

        <Title>People's Markets</Title>
      </Head>
      <Body class={styles.root}>
        <Suspense>
          <ErrorBoundary>
            <TopAppBar />

            <main class={styles.Content}>
              <AccessTokenProvider>
                <Routes>
                  <FileRoutes />
                </Routes>
              </AccessTokenProvider>
            </main>

            <Footer />
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
