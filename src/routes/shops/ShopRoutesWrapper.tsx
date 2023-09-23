import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet, useNavigate, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { isResolved } from "../../components/content";
import {
  DashboardIcon,
  LanguageIcon,
  SignInIcon,
  StoreFrontIcon,
  ThemeIcon,
} from "../../components/icons";
import { Cover, Page, Slot } from "../../components/layout";
import {
  Panel,
  PanelItem,
  PanelSettingsItem,
} from "../../components/navigation";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { buildAuthorizationRequest } from "../../lib";
import { TKEYS, getNextLanguageKey, setDocumentLanguage } from "../../locales";
import { ShopData } from "./ShopData";
import { buildShopDetailPath } from "./ShopRoutes";
import styles from "./ShopRoutesWrapper.module.scss";
import { buildDashboardMarketBoothPath } from "../dashboard/DashboardRoutes";

export default function ShopRoutesWrapper() {
  const navigate = useNavigate();
  const [trans, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated } = useAccessTokensContext();

  const [signingIn, setSigningIn] = createSignal(false);

  const shopData = useRouteData<typeof ShopData>();

  async function handleSignIn() {
    setSigningIn(true);
    window.location.href = (await buildAuthorizationRequest()).toString();
  }

  function handleGotoDashboard() {
    const shopSlug = shopData.shop.data()?.slug;
    if (!_.isNil(shopSlug)) {
      navigate(buildDashboardMarketBoothPath(shopSlug));
    }
  }

  function handleSwitchTheme() {
    if (theme() === Theme.DefaultDark) {
      setTheme(Theme.DefaultLight);
    } else {
      setTheme(Theme.DefaultDark);
    }
  }

  function handleSwichtLanguage() {
    const currentLanguage = getI18next()?.language;

    if (!_.isNil(currentLanguage)) {
      const lang = getNextLanguageKey(currentLanguage);
      changeLanguage(lang);
      setDocumentLanguage(lang);
    }
  }

  return (
    <>
      <Show when={signingIn()}>
        <Cover />
      </Show>

      <Show when={isResolved(shopData.shop.data.state)}>
        <Panel>
          <Slot name="logo">
            <A
              class={styles.MainLink}
              href={buildShopDetailPath(shopData.shop.data()!.slug)}
            >
              {shopData.shop.data()?.name}
            </A>
          </Slot>

          <Slot name="items">
            <PanelItem
              Icon={StoreFrontIcon}
              path={() => buildShopDetailPath(shopData.shop.data()!.slug)}
              label={() => trans(TKEYS["main-navigation"].links.home)}
            />
          </Slot>

          <Slot name="settings">
            <Show when={!isAuthenticated()}>
              <PanelSettingsItem Icon={SignInIcon} onClick={handleSignIn}>
                <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
              </PanelSettingsItem>
            </Show>
            <Show when={isAuthenticated()}>
              <PanelSettingsItem
                Icon={DashboardIcon}
                onClick={handleGotoDashboard}
              >
                <Trans key={TKEYS["main-navigation"].links.dashboard} />
              </PanelSettingsItem>
            </Show>

            <PanelSettingsItem
              Icon={LanguageIcon}
              onClick={handleSwichtLanguage}
            >
              <Trans
                key={TKEYS["main-navigation"].settings["change-language"]}
              />
            </PanelSettingsItem>

            <PanelSettingsItem Icon={ThemeIcon} onClick={handleSwitchTheme}>
              <Show when={theme() === Theme.DefaultDark}>
                <Trans
                  key={
                    TKEYS["main-navigation"].settings["switch-to-light-mode"]
                  }
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
      </Show>

      <Page>
        <Outlet />
      </Page>
    </>
  );
}
