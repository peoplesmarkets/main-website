import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

import { initializeThemeStore } from "../../frontend-lib";

import styles from "./App.module.scss";
import Footer from "./Footer";
import TopAppBar from "./TopAppBar";
import NotFound from "./routes/404";

export const INDEX_PATH = "/";
export const GET_STARTED_PATH = "/get-started";

export const SIGN_IN_PATH = "/sign-in";
export const SIGN_IN_CALLBACK = "/sign-in/callback";

export const DASHBOARD_PATH = "/dashboard";

export const IMPRINT_PATH = "/imprint";
export const PRIVACY_POLICY_PATH = "/privacy-policy";
export const TERMS_OF_SERVICE_PATH = "/terms-of-service";

export function buildPath(...paths: string[]): string {
  return paths.join("/");
}

export default function App() {
  const [theme, setTheme] = initializeThemeStore();

  return (
    <div class={styles.App}>
      <TopAppBar theme={theme} setTheme={setTheme} />

      <main class={styles.Content}>
        <Routes>
          <Route
            path={INDEX_PATH}
            // component={lazy(() => import("./routes/Index"))}
            component={lazy(() => import("./routes/GetStarted"))}
          />
          <Route
            path={GET_STARTED_PATH}
            component={lazy(() => import("./routes/GetStarted"))}
          />

          <Route
            path={SIGN_IN_PATH}
            component={lazy(() => import("./routes/sign-in/SignIn"))}
          />
          <Route
            path={SIGN_IN_CALLBACK}
            component={lazy(() => import("./routes/sign-in/SignInCallback"))}
          />

          <Route
            path={DASHBOARD_PATH}
            component={lazy(() => import("./routes/Dashboard"))}
          />

          <Route
            path={buildPath(DASHBOARD_PATH, ":marketBoothId")}
            component={lazy(() => import("./routes/Dashboard"))}
          />

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

          {/* Fall back */}
          <Route path="*" component={NotFound} />
        </Routes>
      </main>

      <Footer theme={theme} />
    </div>
  );
}
