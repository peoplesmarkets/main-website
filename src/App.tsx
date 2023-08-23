import { Route, Router, Routes } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { lazy } from "solid-js";

import { initializeThemeStore } from "@peoplesmarkets/frontend-lib";

import { TransProvider } from "@mbarzda/solid-i18next";
import styles from "./App.module.scss";
import Footer from "./Footer";
import { Panel } from "./Panel";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { MarketBoothProvider } from "./contexts/MarketBoothContext";
import { signInDataRoute } from "./data-routes";
import { LOCALES } from "./locales";
import NotFound from "./routes/404";

export const INDEX_PATH = "/";
export const GET_STARTED_PATH = "/get-started";

export const SIGN_IN_PATH = "/sign-in";
export const SIGN_IN_CALLBACK = "/sign-in/callback";

export const DASHBOARD_PATH = "/dashboard";
export const USER_SETTINGS_PATH = "/user-settings";

export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export default function App() {
  const [theme, setTheme] = initializeThemeStore();

  const i18nextInstance = i18next.createInstance({
    load: "all",
    resources: LOCALES,
  });
  i18nextInstance.use(LanguageDetector);

  return (
    <Router>
      <TransProvider instance={i18nextInstance}>
        <div class={styles.App}>
          <Panel theme={theme} setTheme={setTheme} />

          <main class={styles.Content}>
            <Routes>
              <AccessTokenProvider>
                <Route
                  path={INDEX_PATH}
                  component={lazy(() => import("./routes/GetStarted"))}
                />
                <Route
                  path={GET_STARTED_PATH}
                  component={lazy(() => import("./routes/GetStarted"))}
                />

                <Route path={SIGN_IN_PATH} data={signInDataRoute} />
                <Route
                  path={SIGN_IN_CALLBACK}
                  component={lazy(() => import("./routes/SignInCallback"))}
                />

                <MarketBoothProvider>
                  <Route
                    path={DASHBOARD_PATH}
                    component={lazy(() => import("./routes/Dashboard"))}
                  />
                  <Route
                    path={buildPath(DASHBOARD_PATH, ":marketBoothId")}
                    component={lazy(() => import("./routes/Dashboard"))}
                  />

                  <Route
                    path={USER_SETTINGS_PATH}
                    component={lazy(() => import("./routes/UserSettings"))}
                  />
                </MarketBoothProvider>
              </AccessTokenProvider>

              <Route
                path={IMPRINT_PATH}
                component={lazy(() => import("./routes/Imprint"))}
              />
              <Route
                path={PRIVACY_POLICY_PATH}
                component={lazy(() => import("./routes/PrivacyPolicy"))}
              />
              <Route
                path={TERMS_OF_SERVICE_PATH}
                component={lazy(() => import("./routes/TermsOfService"))}
              />

              <Route path="*" component={NotFound} />
            </Routes>
          </main>

          <Footer theme={theme} />
        </div>
      </TransProvider>
    </Router>
  );
}

export function buildPath(...paths: string[]): string {
  return paths.join("/");
}

export function removeTralingSlash(path: string) {
  if (path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function getPathSegments(path: string) {
  if (path === "/") return [""];
  return removeTralingSlash(path).split("/");
}

export function isSubPath(base: string, path: string): boolean {
  const cleanedBase = removeTralingSlash(base);
  const cleanedPath = removeTralingSlash(path);

  if (cleanedBase === cleanedPath) return false;

  if (!cleanedPath.startsWith(cleanedBase)) {
    return false;
  }

  const baseSegments = getPathSegments(cleanedBase);
  const pathSegments = getPathSegments(cleanedPath);

  if (baseSegments.length + 1 !== pathSegments.length) {
    return false;
  }

  pathSegments.pop();

  return baseSegments.join("") === pathSegments.join("");
}
