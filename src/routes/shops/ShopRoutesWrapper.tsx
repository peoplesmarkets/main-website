import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet, useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { isResolved } from "../../components/content";
import {
  LanguageIcon,
  LogoutIcon,
  SettingsIcon,
  SignInIcon,
  StoreFrontIcon,
  ThemeIcon,
} from "../../components/icons";
import { Border, Cover, Page, Slot } from "../../components/layout";
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
import {
  buildShopDetailPath,
  buildShopPathOrUrl,
  buildShopSettingsPath,
} from "./ShopRoutes";
import styles from "./ShopRoutesWrapper.module.scss";
import { isCustomDomain } from "../../lib/env";

export default function ShopRoutesWrapper() {
  const location = useLocation();
  const [trans, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated, currentSession, endSession } =
    useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const [signingIn, setSigningIn] = createSignal(false);

  const emptyShopStyle = {
    "--header-background-color": undefined as string | undefined,
    "--header-content-color": undefined as string | undefined,
    "--footer-background-color": undefined as string | undefined,
    "--footer-content-color": undefined as string | undefined,
  };

  const [customShopStyle, setCustomShopStyle] = createStore(
    _.clone(emptyShopStyle)
  );

  function logoImageUrl() {
    if (
      theme() === Theme.DefaultLight &&
      !_.isEmpty(shopData?.shopCustomization.data()?.logoImageLightUrl)
    ) {
      return shopData.shopCustomization.data()?.logoImageLightUrl;
    }
    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(shopData?.shopCustomization.data()?.logoImageDarkUrl)
    ) {
      return shopData.shopCustomization.data()?.logoImageDarkUrl;
    }
  }

  createEffect(() => {
    const styles = shopData.shopCustomization.data();

    if (_.isNil(styles)) {
      return;
    }

    setCustomShopStyle(_.clone(emptyShopStyle));

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
          "--footer-background-color",
          styles.secondaryBackgroundColorDark!
        );
      }
      if (isCssColor(styles.secondaryContentColorDark)) {
        setCustomShopStyle(
          "--footer-content-color",
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
          "--footer-background-color",
          styles.secondaryBackgroundColorLight!
        );
      }
      if (isCssColor(styles.secondaryContentColorLight)) {
        setCustomShopStyle(
          "--footer-content-color",
          styles.secondaryContentColorLight!
        );
      }
    }
  });

  async function handleSignIn() {
    setSigningIn(true);
    const signInUrl = await buildAuthorizationRequest(
      undefined,
      location.pathname
    );
    setSigningIn(false);
    window.location.href = signInUrl.toString();
  }

  async function handleSignInForCustomDomain() {
    const clientId = shopData?.shopDomain?.data()?.clientId;
    if (!_.isNil(clientId) && !_.isEmpty(clientId)) {
      setSigningIn(true);
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        location.pathname,
        clientId
      );
      setSigningIn(false);
      window.location.href = signInUrl.toString();
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

  async function handleLogout() {
    const shopSlug = shopData?.shop?.data()?.shopId;
    const clientId = shopData?.shopDomain?.data()?.clientId;
    if (
      !_.isNil(clientId) &&
      !_.isEmpty(clientId) &&
      !_.isNil(shopSlug) &&
      !_.isEmpty(shopSlug)
    ) {
      const redirectUrl = buildShopPathOrUrl(
        shopData?.shopDomain?.data()?.domain,
        shopSlug
      );

      endSession(redirectUrl, clientId);
    } else {
      endSession();
    }
  }

  return (
    <>
      <Show when={signingIn()}>
        <Cover pageLoad />
      </Show>

      <Show when={isResolved(shopData.shop.data.state)}>
        <Panel style={customShopStyle} close={signingIn}>
          <Slot name="logo">
            <Show
              when={!_.isEmpty(logoImageUrl())}
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
                <img class={styles.Logo} src={logoImageUrl()} alt="" />
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
              <Border narrow />

              <PanelItem
                Icon={SettingsIcon}
                path={() => buildShopSettingsPath(shopData.shop.data()!.slug)}
                label={() => trans(TKEYS["shop"].settings.title)}
              />
            </Show>
          </Slot>

          <Slot name="settings">
            <Show when={!isAuthenticated()}>
              <Show when={!isCustomDomain()}>
                <PanelSettingsItem Icon={SignInIcon} onClick={handleSignIn}>
                  <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
                </PanelSettingsItem>
              </Show>
              <Show
                when={
                  isCustomDomain() &&
                  !_.isEmpty(shopData?.shopDomain?.data()?.clientId)
                }
              >
                <PanelSettingsItem
                  Icon={SignInIcon}
                  onClick={handleSignInForCustomDomain}
                >
                  <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
                </PanelSettingsItem>
              </Show>
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

            <Show when={isAuthenticated()}>
              <PanelSettingsItem Icon={LogoutIcon} onClick={handleLogout}>
                <Trans key={TKEYS["main-navigation"].actions["sign-out"]} />
              </PanelSettingsItem>
            </Show>
          </Slot>
        </Panel>
      </Show>

      <Page style={customShopStyle}>
        <Outlet />
      </Page>
    </>
  );
}
