import { TransProvider } from "@mbarzda/solid-i18next";
import { Route, Router, Routes } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import styles from "./App.module.scss";
import Footer from "./Footer";
import { Panel } from "./Panel";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { MarketBoothProvider } from "./contexts/MarketBoothContext";
import { initializeThemeStore } from "./contexts/ThemeStore";
import { signInDataRoute } from "./data-routes";
import { dashboardDataRoute } from "./data-routes/dashboard";
import { buildPath } from "./lib";
import { LOCALES } from "./locales";
import { lazy } from "solid-js";

export const INDEX_PATH = "/";
export const MARKET_BOOTHS_PATH = "/";
export const OFFERS_PATH = "/offers";

export const SIGN_IN_PATH = "/sign-in";
export const SIGN_IN_CALLBACK = "/sign-in/callback";

export const DASHBOARD_PATH = "/dashboard";

export const OFFERS_SUBPATH = "/offers";

export const USER_SETTINGS_PATH = "/user-settings";

export const COMMUNITY_PATH = "/community";
export const DEVELOPMENT_POSTS_SUBPATH = "/development-posts";
export const COMMUNITY_DEVELOPMENT_POSTS_PATH =
  COMMUNITY_PATH + DEVELOPMENT_POSTS_SUBPATH;

export const GET_STARTED_PATH = "/get-started";
export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

const CommunityRoutes = lazy(
  () => import("./routes/community/CommunityRoutes")
);

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
              <Route
                path={INDEX_PATH}
                component={lazy(() => import("./routes/commerce/MarketBooths"))}
              />
              <Route
                path={buildPath(MARKET_BOOTHS_PATH, ":marketBoothId")}
                component={lazy(
                  () => import("./routes/commerce/MarketBoothDetail")
                )}
              />
              <Route
                path={OFFERS_PATH}
                component={lazy(() => import("./routes/commerce/Offers"))}
              />
              <Route
                path={buildPath(OFFERS_PATH, ":offerId")}
                component={lazy(() => import("./routes/commerce/OfferDetail"))}
              />

              <AccessTokenProvider>
                <Route path={SIGN_IN_PATH} data={signInDataRoute} />
                <Route
                  path={SIGN_IN_CALLBACK}
                  component={lazy(() => import("./routes/SignInCallback"))}
                />

                <MarketBoothProvider>
                  <Route path={DASHBOARD_PATH} data={dashboardDataRoute} />
                  <Route
                    path={buildPath(DASHBOARD_PATH, ":marketBoothId")}
                    component={lazy(
                      () => import("./routes/dashboard/Dashboard")
                    )}
                  />
                  <Route
                    path={buildPath(
                      DASHBOARD_PATH,
                      ":marketBoothId",
                      OFFERS_SUBPATH,
                      ":offerId"
                    )}
                    component={lazy(() => import("./routes/dashboard/Offers"))}
                  />

                  <Route
                    path={USER_SETTINGS_PATH}
                    component={lazy(() => import("./routes/UserSettings"))}
                  />
                </MarketBoothProvider>
              </AccessTokenProvider>

              <Route
                path={COMMUNITY_PATH}
                component={lazy(
                  () => import("./routes/community/CommunityRoutes")
                )}
              />

              <Route
                path={GET_STARTED_PATH}
                component={lazy(() => import("./routes/info/GetStarted"))}
              />
              <Route
                path={IMPRINT_PATH}
                component={lazy(() => import("./routes/info/Imprint"))}
              />
              <Route
                path={PRIVACY_POLICY_PATH}
                component={lazy(() => import("./routes/info/PrivacyPolicy"))}
              />
              <Route
                path={TERMS_OF_SERVICE_PATH}
                component={lazy(() => import("./routes/info/TermsOfService"))}
              />

              <Route
                path="*"
                component={lazy(() => import("./routes/info/404"))}
              />
            </Routes>
          </main>

          <Footer theme={theme} />
        </div>
      </TransProvider>
    </Router>
  );
}
