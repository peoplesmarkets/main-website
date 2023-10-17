import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import { MainLogoText } from "../components/assets";
import {
  CommunityIcon,
  DashboardIcon,
  LanguageIcon,
  LogoutIcon,
  MainLogoIcon,
  ReportIcon,
  SearchGlobalIcon,
  SignInIcon,
  StoreFrontIcon,
  ThemeIcon,
} from "../components/icons";
import { Border, Cover, Slot } from "../components/layout";
import { Panel, PanelItem, PanelSettingsItem } from "../components/navigation";
import { ReportDialog } from "../components/report/ReportDialog";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../contexts/ThemeContext";
import { clickOutside } from "../directives";
import {
  buildAuthorizationRequest,
  setDocumentLanguage,
  setDocumentTitle,
  setFaviconHref,
} from "../lib";
import { MAIN_FAVICON } from "../lib/constants";
import { TKEYS, getNextLanguageKey } from "../locales";
import { EN } from "../locales/en";
import MainFooter from "./MainFooter";
import styles from "./MainRoutesWrapper.module.scss";
import { buildCommunityPathOrUrl } from "./community/community-routing";
import {
  buildDashboardPath,
  buildIndexPathOrUrl,
  buildOffersPath,
  buildShopsPath,
} from "./main-routing";

false && clickOutside;

export default function MainRoutesWrapper() {
  const [, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated, endSession } = useAccessTokensContext();

  const [signingIn, setSigningIn] = createSignal(false);
  const [showSlider, setShowSlider] = createSignal(false);
  const [showReportDialog, setShowReportDialog] = createSignal(false);

  onMount(() => {
    setDocumentTitle(EN["Peoples-Markets"]);

    setFaviconHref(MAIN_FAVICON);
    setSigningIn(false);
  });

  async function handleSignIn() {
    setSigningIn(true);
    setShowSlider(false);
    try {
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        buildDashboardPath()
      );
      window.location.href = signInUrl.toString();
    } catch (err) {
      console.log(err);
      setSigningIn(false);
    }
  }

  function handleOpenReportDialog() {
    setShowSlider(false);
    setShowReportDialog(true);
  }

  function handleCloseReportDialog() {
    setShowSlider(false);
    setShowReportDialog(false);
  }

  function handleSwichtLanguage() {
    const currentLanguage = getI18next()?.language;

    if (!_.isNil(currentLanguage)) {
      const lang = getNextLanguageKey(currentLanguage);
      changeLanguage(lang);
      setDocumentLanguage(lang);
    }
  }

  function handleSwitchTheme() {
    if (theme() === Theme.DefaultDark) {
      setTheme(Theme.DefaultLight);
    } else {
      setTheme(Theme.DefaultDark);
    }
  }

  async function handleLogout() {
    endSession();
  }

  return (
    <>
      <Show when={signingIn()}>
        <Cover pageLoad />
      </Show>

      <Panel showSlider={showSlider} setShowSlider={setShowSlider}>
        <Slot name="logo">
          <A
            class={styles.MainLink}
            href={buildIndexPathOrUrl()}
            aria-label="Go to home page"
          >
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoText class={styles.MainLogo} />
          </A>
        </Slot>

        <Slot name="items">
          <PanelItem Icon={StoreFrontIcon} path={buildShopsPath}>
            <Trans key={TKEYS["main-navigation"].links["shops"]} />
          </PanelItem>

          <PanelItem Icon={SearchGlobalIcon} path={buildOffersPath}>
            <Trans key={TKEYS["main-navigation"].links.offers} />
          </PanelItem>

          <PanelItem Icon={CommunityIcon} path={buildCommunityPathOrUrl}>
            <Trans key={TKEYS["main-navigation"].links.community} />
          </PanelItem>

          <Show when={isAuthenticated()}>
            <Border narrow />

            <PanelItem Icon={DashboardIcon} path={buildDashboardPath}>
              <Trans key={TKEYS["main-navigation"].links.dashboard} />
            </PanelItem>
          </Show>
        </Slot>

        <Slot name="settings">
          <Show when={!isAuthenticated()}>
            <PanelSettingsItem Icon={SignInIcon} onClick={handleSignIn}>
              <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
            </PanelSettingsItem>
          </Show>

          <PanelSettingsItem Icon={ReportIcon} onClick={handleOpenReportDialog}>
            <Trans key={TKEYS["main-navigation"].settings.report} />
          </PanelSettingsItem>

          <PanelSettingsItem Icon={LanguageIcon} onClick={handleSwichtLanguage}>
            <Trans key={TKEYS["main-navigation"].settings["change-language"]} />
          </PanelSettingsItem>

          <PanelSettingsItem Icon={ThemeIcon} onClick={handleSwitchTheme}>
            <Show when={theme() === Theme.DefaultDark}>
              <Trans
                key={TKEYS["main-navigation"].settings["switch-to-light-mode"]}
              />
            </Show>
            <Show when={theme() !== Theme.DefaultDark}>
              <Trans
                key={TKEYS["main-navigation"].settings["switch-to-dark-mode"]}
              />
            </Show>
          </PanelSettingsItem>

          <Show when={isAuthenticated()}>
            <PanelSettingsItem Icon={LogoutIcon} onClick={handleLogout}>
              <Trans key={TKEYS["main-navigation"].actions["sign-out"]} />
            </PanelSettingsItem>
          </Show>
        </Slot>
      </Panel>

      {/* PAGE CONTENT */}
      <Outlet />
      {/* PAGE CONTENT */}

      <MainFooter />

      <Show when={showReportDialog()}>
        <ReportDialog onClose={handleCloseReportDialog} />
      </Show>
    </>
  );
}
