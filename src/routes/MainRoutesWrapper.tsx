import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { MainLogoText } from "../components/assets";
import {
  CommunityIcon,
  DashboardIcon,
  LanguageIcon,
  MainLogoIcon,
  SearchGlobalIcon,
  SignInIcon,
  StoreFrontIcon,
  ThemeIcon,
  UserSettingsIcon,
} from "../components/icons";
import { Cover, Page, Slot } from "../components/layout";
import { Panel, PanelItem, PanelSettingsItem } from "../components/navigation";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../contexts/ThemeContext";
import { clickOutside } from "../directives";
import { buildAuthorizationRequest } from "../lib";
import { TKEYS, getNextLanguageKey, setDocumentLanguage } from "../locales";
import { buildMarketBoothsPath, buildOffersPath } from "./MainRoutes";
import styles from "./MainRoutesWrapper.module.scss";
import { buildCommunityPath } from "./community/CommunityRoutes";
import { buildDashboardPath } from "./dashboard/DashboardRoutes";
import { buildUserSettingsPath } from "./user/UserRoutes";

false && clickOutside;

export default function MainRoutesWrapper() {
  const [trans, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated } = useAccessTokensContext();

  const [signingIn, setSigningIn] = createSignal(false);

  async function handleSignIn() {
    setSigningIn(true);
    window.location.href = (await buildAuthorizationRequest()).toString();
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

  return (
    <>
      <Show when={signingIn()}>
        <Cover />
      </Show>

      <Panel close={signingIn}>
        <Slot name="logo">
          <A
            class={styles.MainLink}
            href={buildMarketBoothsPath()}
            aria-label="Go to home page"
          >
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoText class={styles.MainLogo} />
          </A>
        </Slot>

        <Slot name="items">
          <PanelItem
            Icon={StoreFrontIcon}
            path={buildMarketBoothsPath}
            label={() => trans(TKEYS["main-navigation"].links["market-booths"])}
          />

          <PanelItem
            Icon={SearchGlobalIcon}
            path={buildOffersPath}
            label={() => trans(TKEYS["main-navigation"].links.offers)}
          />

          <Show when={isAuthenticated()}>
            <PanelItem
              Icon={DashboardIcon}
              path={buildDashboardPath}
              label={() => trans(TKEYS["main-navigation"].links.dashboard)}
            />

            <PanelItem
              Icon={UserSettingsIcon}
              path={buildUserSettingsPath}
              label={() =>
                trans(TKEYS["main-navigation"].links["user-settings"])
              }
            />
          </Show>

          <PanelItem
            Icon={CommunityIcon}
            path={buildCommunityPath}
            label={() => trans(TKEYS["main-navigation"].links.community)}
          />
        </Slot>

        <Slot name="settings">
          <Show when={!isAuthenticated()}>
            <PanelSettingsItem Icon={SignInIcon} onClick={handleSignIn}>
              <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
            </PanelSettingsItem>
          </Show>

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
        </Slot>
      </Panel>

      <Page>
        <Outlet />
      </Page>
    </>
  );
}
