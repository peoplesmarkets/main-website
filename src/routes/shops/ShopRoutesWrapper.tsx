import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, Outlet, useLocation, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  ErrorBoundary,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";

import {
  LanguageIcon,
  SettingsIcon,
  SignInIcon,
  SignOutIcon,
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
  resourceIsReady,
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
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { ContentError } from "../../components/content";

export default function ShopRoutesWrapper() {
  const location = useLocation();
  const [, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated, currentSession, endSession } =
    useAccessTokensContext();

  const { shopCustomizationService, shopDomainService } =
    useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [shopCustomization] = createResource(shopData?.shopId, async (shopId) =>
    shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );
  const [shopDomain] = createResource(shopData?.shopId, async (shopId) =>
    shopDomainService.getDomainStatus(shopId).then((res) => res.domainStatus)
  );

  const [showSlider, setShowSlider] = createSignal(false);
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
    if (!_.isNil(shopCustomization.error)) {
      return;
    }

    const logoImageLightUrl = shopCustomization()?.logoImageLightUrl;
    if (!_.isEmpty(logoImageLightUrl) && theme() === Theme.DefaultLight) {
      return logoImageLightUrl;
    }

    const logoImageDarkUrl = shopCustomization()?.logoImageDarkUrl;
    if (!_.isEmpty(logoImageDarkUrl) && theme() === Theme.DefaultDark) {
      return logoImageDarkUrl;
    }
  }

  onMount(() => {
    setFaviconHref(SHOP_FAVICON);
  });

  createEffect(() => {
    if (!_.isNil(shopData.shop.error)) {
      return;
    }

    const name = shopData.shop()?.name;
    if (_.isNil(name) || _.isEmpty(name)) {
      return;
    }

    setDocumentTitle(name);
  });

  createEffect(() => {
    if (!_.isNil(shopCustomization.error)) {
      return;
    }

    const styles = shopCustomization();
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

  function shopDetailPath() {
    if (!resourceIsReady(shopData.shop)) {
      return "";
    }

    const shopSlug = shopData.shop()?.slug;
    if (!_.isNil(shopSlug)) {
      return buildShopDetailPath(shopSlug);
    }

    return "";
  }

  async function handleSignIn() {
    setSigningIn(true);
    try {
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        location.pathname
      );
      window.location.href = signInUrl.toString();
    } catch (err) {
      setSigningIn(false);
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
    if (!_.isNil(shopData.shop.error) || !_.isError(shopDomain.error)) {
      return;
    }

    const slug = shopData.shop()?.slug;
    const domain = shopData.shop()?.domain;
    const clientId = shopDomain()?.clientId;
    if (
      !_.isNil(clientId) &&
      !_.isEmpty(clientId) &&
      !_.isNil(slug) &&
      !_.isEmpty(slug)
    ) {
      const redirectUrl = buildShopPathOrUrl(domain, slug);

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

      <Panel
        style={customShopStyle}
        showSlider={showSlider}
        setShowSlider={setShowSlider}
      >
        <ErrorBoundary fallback={<ContentError />}>
          <Suspense>
            <Slot name="logo">
              <Show
                when={!_.isEmpty(logoImageUrl())}
                fallback={
                  <A class={styles.MainLink} href={shopDetailPath()}>
                    {shopData.shop()?.name}
                  </A>
                }
              >
                <A class={styles.LogoLink} href={shopDetailPath()}>
                  <img class={styles.Logo} src={logoImageUrl()} alt="" />
                </A>
              </Show>
            </Slot>

            <Slot name="items">
              <PanelItem Icon={StoreFrontIcon} path={shopDetailPath}>
                <Trans key={TKEYS["main-navigation"].links.home} />
              </PanelItem>

              <Border narrow />

              <Show
                when={isAuthenticated() && !_.isEmpty(shopData.shop()?.slug)}
              >
                <Show
                  when={currentSession().userId === shopData.shop()?.userId}
                >
                  <PanelItem
                    Icon={SettingsIcon}
                    path={() => buildShopSettingsPath(shopData.shop()!.slug)}
                  >
                    <Trans key={TKEYS["shop"].settings.title} />
                  </PanelItem>
                </Show>
                <Show
                  when={currentSession().userId !== shopData.shop()?.userId}
                >
                  <PanelItem
                    Icon={InventoryIcon}
                    path={() => buildInventoryPath(shopData.shop()!.slug)}
                  >
                    <Trans key={TKEYS.media.Inventory} />
                  </PanelItem>
                </Show>
              </Show>
            </Slot>
          </Suspense>
        </ErrorBoundary>

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

          <Show when={isAuthenticated()}>
            <PanelSettingsItem Icon={SignOutIcon} onClick={handleLogout}>
              <Trans key={TKEYS["main-navigation"].actions["sign-out"]} />
            </PanelSettingsItem>
          </Show>
        </Slot>
      </Panel>

      <Page style={customShopStyle}>
        <Outlet />
      </Page>

      <ShopFooter />
    </>
  );
}
