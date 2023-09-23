import { TransProvider } from "@mbarzda/solid-i18next";
import { Route, Router, Routes } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import { onMount } from "solid-js";

import styles from "./App.module.scss";
import Footer from "./Footer";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LOCALES, setDocumentLanguage } from "./locales";
import MainRoutes from "./routes/MainRoutes";
import MainRoutesWrapper from "./routes/MainRoutesWrapper";
import CommunityRoutes from "./routes/community/CommunityRoutes";
import DashboardRoutes from "./routes/dashboard/DashboardRoutes";
import NotFound from "./routes/404";
import InfoRoutes from "./routes/info/InfoRoutes";
import { ShopRoutes } from "./routes/shops/ShopRoutes";
import { UserRoutes } from "./routes/user/UserRoutes";

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
              <Routes>
                <MainRoutes />

                <ShopRoutes />

                <DashboardRoutes />

                <UserRoutes />

                <CommunityRoutes />

                <InfoRoutes />

                <Route path="*" component={MainRoutesWrapper}>
                  <Route path="*" component={NotFound} />
                </Route>
              </Routes>

              <Footer />
            </div>
          </AccessTokenProvider>
        </ThemeProvider>
      </TransProvider>
    </Router>
  );
}
