import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet, useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import {
  LanguageIcon,
  LogoutIcon,
  SettingsIcon,
  SignInIcon,
  StoreFrontIcon,
  ThemeIcon,
} from "../../components/icons";
import { InventoryIcon } from "../../components/icons/InventoryIcon";
import { Border, Cover, Page, Slot } from "../../components/layout";
import {
  Panel,
  PanelItem,
  PanelSettingsItem,
} from "../../components/navigation";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import {
  buildAuthorizationRequest,
  isCssColor,
  setDocumentLanguage,
  setDocumentTitle,
  setFaviconHref,
} from "../../lib";
import { SHOP_FAVICON } from "../../lib/constants";
import { TKEYS, getNextLanguageKey } from "../../locales";
import { ShopData } from "./ShopData";
import { ShopFooter } from "./ShopFooter";
import styles from "./ShopRoutesWrapper.module.scss";
import {
  buildInventoryPath,
  buildShopDetailPath,
  buildShopPathOrUrl,
  buildShopSettingsPath,
} from "./shop-routing";

export default function ShopRoutesWrapper() {
  const location = useLocation();
  const [, { changeLanguage, getI18next }] = useTransContext();
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
      !_.isEmpty(shopData?.shopCustomization()?.logoImageLightUrl)
    ) {
      return shopData.shopCustomization()?.logoImageLightUrl;
    }
    if (
      theme() === Theme.DefaultDark &&
      !_.isEmpty(shopData?.shopCustomization()?.logoImageDarkUrl)
    ) {
      return shopData.shopCustomization()?.logoImageDarkUrl;
    }
  }

  createEffect(() => {
    const shopName = shopData?.shop()?.name;
    if (!_.isNil(shopName) && !_.isEmpty(shopName)) {
      setDocumentTitle(shopName);
    }
    setFaviconHref(SHOP_FAVICON);

    const styles = shopData?.shopCustomization();
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
    const shopSlug = shopData?.shop()?.shopId;
    const clientId = shopData?.shopDomain()?.clientId;
    if (
      !_.isNil(clientId) &&
      !_.isEmpty(clientId) &&
      !_.isNil(shopSlug) &&
      !_.isEmpty(shopSlug)
    ) {
      const redirectUrl = buildShopPathOrUrl(
        shopData?.shopDomain()?.domain,
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

      <Panel style={customShopStyle} close={signingIn}>
        <Show when={!_.isNil(shopData.shop())}>
          <Slot name="logo">
            <Show
              when={!_.isEmpty(logoImageUrl())}
              fallback={
                <A
                  class={styles.MainLink}
                  href={buildShopDetailPath(shopData.shop()!.slug)}
                >
                  {shopData.shop()?.name}
                </A>
              }
            >
              <A
                class={styles.LogoLink}
                href={buildShopDetailPath(shopData.shop()!.slug)}
              >
                <img class={styles.Logo} src={logoImageUrl()} alt="" />
              </A>
            </Show>
          </Slot>

          <Slot name="items">
            <PanelItem
              Icon={StoreFrontIcon}
              path={() => buildShopDetailPath(shopData.shop()!.slug)}
            >
              <Trans key={TKEYS["main-navigation"].links.home} />
            </PanelItem>

            <Border narrow />

            <Show when={isAuthenticated() && !_.isEmpty(shopData.shop()?.slug)}>
              <Show when={currentSession().userId === shopData.shop()?.userId}>
                <PanelItem
                  Icon={SettingsIcon}
                  path={() => buildShopSettingsPath(shopData.shop()!.slug)}
                >
                  <Trans key={TKEYS["shop"].settings.title} />
                </PanelItem>
              </Show>
              <Show when={currentSession().userId != shopData.shop()?.userId}>
                <PanelItem
                  Icon={InventoryIcon}
                  path={() => buildInventoryPath(shopData.shop()!.slug)}
                >
                  <Trans key={TKEYS.media.Inventory} />
                </PanelItem>
              </Show>
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

            <Show when={isAuthenticated()}>
              <PanelSettingsItem Icon={LogoutIcon} onClick={handleLogout}>
                <Trans key={TKEYS["main-navigation"].actions["sign-out"]} />
              </PanelSettingsItem>
            </Show>
          </Slot>
        </Show>
      </Panel>

      <Page style={customShopStyle}>
        <Outlet />
      </Page>

      <ShopFooter />
    </>
  );
}
