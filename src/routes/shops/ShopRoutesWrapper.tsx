import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { isResolved } from "../../components/content";
import {
  LanguageIcon,
  SettingsIcon,
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
import { buildAuthorizationRequest, isCssColor } from "../../lib";
import { TKEYS, getNextLanguageKey, setDocumentLanguage } from "../../locales";
import { ShopData } from "./ShopData";
import { buildShopDetailPath, buildShopSettingsPath } from "./ShopRoutes";
import styles from "./ShopRoutesWrapper.module.scss";

export default function ShopRoutesWrapper() {
  const [trans, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated, currentSession } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const [signingIn, setSigningIn] = createSignal(false);
  const [customShopStyle, setCustomShopStyle] = createStore<
    Record<string, string>
  >({});

  createEffect(() => {
    const styles = shopData.shopCustomization.data();

    if (_.isNil(styles)) {
      return;
    }

    if (theme() === Theme.DefaultDark) {
      if (isCssColor(styles.headerBackgroundColorDark)) {
        setCustomShopStyle(
          "--header-background-color",
          styles.headerBackgroundColorDark!
        );
      }
      if (isCssColor(styles.headerContentColorDark)) {
        setCustomShopStyle(
          "--header-content-color",
          styles.headerContentColorDark!
        );
      }
      if (isCssColor(styles.secondaryBackgroundColorDark)) {
        setCustomShopStyle(
          "--secondary-background-color",
          styles.secondaryBackgroundColorDark!
        );
      }
      if (isCssColor(styles.secondaryContentColorDark)) {
        setCustomShopStyle(
          "--secondary-content-color",
          styles.secondaryContentColorDark!
        );
      }
    } else {
      if (isCssColor(styles.headerBackgroundColorLight)) {
        setCustomShopStyle(
          "--header-background-color",
          styles.headerBackgroundColorLight!
        );
      }
      if (isCssColor(styles.headerContentColorLight)) {
        setCustomShopStyle(
          "--header-content-color",
          styles.headerContentColorLight!
        );
      }
      if (isCssColor(styles.secondaryBackgroundColorLight)) {
        setCustomShopStyle(
          "--secondary-background-color",
          styles.secondaryBackgroundColorLight!
        );
      }
      if (isCssColor(styles.secondaryContentColorLight)) {
        setCustomShopStyle(
          "--secondary-content-color",
          styles.secondaryContentColorLight!
        );
      }
    }
  });

  async function handleSignIn() {
    setSigningIn(true);
    window.location.href = (await buildAuthorizationRequest()).toString();
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
        <Panel style={customShopStyle}>
          <Slot name="logo">
            <Show
              when={
                isResolved(shopData.shopCustomization.data.state) &&
                !_.isEmpty(shopData.shopCustomization.data()?.logoImageUrl)
              }
              fallback={
                <A
                  class={styles.MainLink}
                  href={buildShopDetailPath(shopData.shop.data()!.slug)}
                >
                  {shopData.shop.data()?.name}
                </A>
              }
            >
              <A
                class={styles.LogoLink}
                href={buildShopDetailPath(shopData.shop.data()!.slug)}
              >
                <img
                  class={styles.Logo}
                  src={shopData.shopCustomization.data()?.logoImageUrl}
                  alt=""
                />
              </A>
            </Show>
          </Slot>

          <Slot name="items">
            <PanelItem
              Icon={StoreFrontIcon}
              path={() => buildShopDetailPath(shopData.shop.data()!.slug)}
              label={() => trans(TKEYS["main-navigation"].links.home)}
            />

            <Show
              when={
                isAuthenticated() &&
                !_.isEmpty(shopData.shop.data()?.slug) &&
                currentSession().userId === shopData.shop.data()?.userId
              }
            >
              <PanelItem
                Icon={SettingsIcon}
                path={() => buildShopSettingsPath(shopData.shop.data()!.slug)}
                label={() => trans(TKEYS["market-booth"].settings.title)}
              />
            </Show>
          </Slot>

          <Slot name="settings">
            <Show when={!isAuthenticated()}>
              <PanelSettingsItem Icon={SignInIcon} onClick={handleSignIn}>
                <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
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

      <Page style={customShopStyle}>
        <Outlet />
      </Page>
    </>
  );
}
