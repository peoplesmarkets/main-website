import { TransProvider } from "@mbarzda/solid-i18next";
import { Route, Router, Routes } from "@solidjs/router";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import { Show, onMount } from "solid-js";

import { Redirect } from "./components/navigation/Redirect";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { isCustomDomain, setDocumentLanguage } from "./lib";
import { LOCALES } from "./locales";
import NotFound from "./routes/404";
import MainRoutes from "./routes/MainRoutes";
import CommunityRoutes from "./routes/community/CommunityRoutes";
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
            <Routes>
              <Show when={isCustomDomain()}>
                <ShopRoutes />
              </Show>

              <Show when={!isCustomDomain()}>
                <MainRoutes />

                <ShopRoutes />

                <UserRoutes />

                <CommunityRoutes />

                <InfoRoutes />
              </Show>

              <Route path="/redirect" element={<Redirect />} />

              <Route path="*" component={NotFound} />
            </Routes>
          </AccessTokenProvider>
        </ThemeProvider>
      </TransProvider>
    </Router>
  );
}
