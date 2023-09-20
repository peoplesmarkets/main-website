import { TransProvider } from "@mbarzda/solid-i18next";
import { Route, Router, Routes } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";

import { lazy, onMount } from "solid-js";
import styles from "./App.module.scss";
import Footer from "./Footer";
import { Panel } from "./Panel";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { signInDataRoute } from "./data-routes";
import { buildPath } from "./lib";
import { LOCALES, setDocumentLanguage } from "./locales";
import InfoRoutes from "./routes/info/InfoRoutes";
import { ThemeProvider } from "./contexts/ThemeContext";

export const INDEX_PATH = "/";
export const MARKET_BOOTHS_PATH = "/";
export const OFFERS_PATH = "/offers";

export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_MARKET_BOOTH_PATH = DASHBOARD_PATH + "/market-booth";

export const OFFERS_SUBPATH = "/offers";
export const MEDIAS_SUBPATH = "/medias";

export const SIGN_IN_PATH = "/user/sign-in";
export const SIGN_IN_CALLBACK_PATH = "/user/sign-in/callback";
export const USER_SETTINGS_PATH = "/user/settings";

export const COMMUNITY_PATH = "/community";
export const DEVELOPMENT_POSTS_SUBPATH = "/development-posts";
export const COMMUNITY_DEVELOPMENT_POSTS_PATH =
  COMMUNITY_PATH + DEVELOPMENT_POSTS_SUBPATH;

export const INFO_PATH = "/info";
export const GET_STARTED_PATH = "/get-started";
export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

const CommunityRoutes = lazy(
  () => import("./routes/community/CommunityRoutes")
);

export default function App() {
  const i18nextInstance = i18next.createInstance({
    load: "all",
    resources: LOCALES,
  });
  i18nextInstance.use(LanguageDetector);
  i18nextInstance.use(ICU);

  onMount(() => {
    setDocumentLanguage(i18nextInstance.language);
  });

  return (
    <Router>
      <TransProvider instance={i18nextInstance}>
        <ThemeProvider>
          <AccessTokenProvider>
            <div class={styles.App}>
              <Panel />

              <main class={styles.Content}>
                <Routes>
                  <Route
                    path={INDEX_PATH}
                    component={lazy(
                      () => import("./routes/commerce/MarketBooths")
                    )}
                  />
                  <Route
                    path={OFFERS_PATH}
                    component={lazy(() => import("./routes/commerce/Offers"))}
                  />

                  <Route
                    path={buildPath(MARKET_BOOTHS_PATH, ":marketBoothId")}
                    component={lazy(
                      () => import("./routes/commerce/MarketBoothDetail")
                    )}
                  />
                  <Route
                    path={buildPath(OFFERS_PATH, ":offerId")}
                    component={lazy(
                      () => import("./routes/commerce/OfferDetail")
                    )}
                  />

                  <Route
                    path={buildPath(DASHBOARD_PATH)}
                    component={lazy(
                      () => import("./routes/dashboard/Dashboard")
                    )}
                  />
                  <Route
                    path={buildPath(
                      DASHBOARD_MARKET_BOOTH_PATH,
                      ":marketBoothId"
                    )}
                    component={lazy(
                      () => import("./routes/dashboard/MarketBooth")
                    )}
                  />
                  <Route
                    path={buildPath(
                      DASHBOARD_MARKET_BOOTH_PATH,
                      ":marketBoothId",
                      OFFERS_SUBPATH,
                      ":offerId"
                    )}
                    component={lazy(() => import("./routes/dashboard/Offer"))}
                  />
                  <Route
                    path={buildPath(
                      DASHBOARD_MARKET_BOOTH_PATH,
                      ":marketBoothId",
                      MEDIAS_SUBPATH
                    )}
                    component={lazy(() => import("./routes/dashboard/Medias"))}
                  />

                  <Route
                    path={USER_SETTINGS_PATH}
                    component={lazy(() => import("./routes/user/Settings"))}
                  />

                  <Route path={SIGN_IN_PATH} data={signInDataRoute} />
                  <Route
                    path={SIGN_IN_CALLBACK_PATH}
                    component={lazy(
                      () => import("./routes/user/SignInCallback")
                    )}
                  />

                  <Route path={COMMUNITY_PATH}>
                    <CommunityRoutes />
                  </Route>

                  <Route path={INFO_PATH}>
                    <InfoRoutes />
                  </Route>

                  <Route
                    path="*"
                    component={lazy(() => import("./routes/info/404"))}
                  />
                </Routes>
              </main>

              <Footer />
            </div>
          </AccessTokenProvider>
        </ThemeProvider>
      </TransProvider>
    </Router>
  );
}
