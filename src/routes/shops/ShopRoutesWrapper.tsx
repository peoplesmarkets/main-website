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

import { ContentError } from "../../components/content";
import { Cover, Page, Slot } from "../../components/layout";
import {
  Panel,
  PanelItem,
  PanelSettingsItem,
} from "../../components/navigation";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { useServiceClientContext } from "../../contexts/ServiceClientContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import {
  buildAuthorizationRequest,
  isCssColor,
  setDocumentLanguage,
  setDocumentMetaDescription,
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
  buildShopDetailPathOrUrl,
} from "./shop-routing";
import { EN } from "../../locales/en";
import {
  buildShopConfigurationPath,
  buildShopDashboardPath,
  buildShopSettingsPath,
} from "../main-routing";

export default function ShopRoutesWrapper() {
  const location = useLocation();
  const [trans, { changeLanguage, getI18next }] = useTransContext();
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

    const description = shopData.shop()?.description || name;
    setDocumentMetaDescription(description + EN["powered-by-peoplesmarkets"]);
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

  function isOwnedShop() {
    return shopData.shop()?.userId === currentSession().userId;
  }

  function shopCustomizationPath() {
    const shopId = shopData.shop()?.shopId;
    if (!_.isNil(shopId)) {
      return buildShopConfigurationPath(shopId);
    }
    return "";
  }

  function offersConfigurationPath() {
    const shopId = shopData.shop()?.shopId;
    if (!_.isNil(shopId)) {
      return buildShopDashboardPath(shopId);
    }
    return "";
  }

  function shopSettingsPath() {
    const shopId = shopData.shop()?.shopId;
    if (!_.isNil(shopId)) {
      return buildShopSettingsPath(shopId);
    }
    return "";
  }

  function shopDetailPath() {
    const shopSlug = shopData.shop()?.slug;
    if (!_.isNil(shopSlug)) {
      return buildShopDetailPath(shopSlug);
    }
    return "";
  }

  function inventoryPath() {
    const shopSlug = shopData.shop()?.slug;
    if (!_.isNil(shopSlug)) {
      return buildInventoryPath(shopSlug);
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
      const redirectUrl = buildShopDetailPathOrUrl(domain, slug);

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
                  <A
                    class={styles.MainLink}
                    href={buildShopDetailPath(shopData.shop()?.slug!)}
                  >
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
              <Show when={isOwnedShop()}>
                <PanelItem
                  icon="storefront"
                  path={shopCustomizationPath}
                  label={trans(TKEYS["main-navigation"].links["My-Shop"])}
                />

                <PanelItem
                  icon="view_list"
                  path={offersConfigurationPath}
                  label={trans(TKEYS["main-navigation"].links["My-Offers"])}
                />

                <PanelItem
                  icon="settings"
                  path={shopSettingsPath}
                  label={trans(TKEYS.shop.settings.title)}
                />
              </Show>

              <Show when={!isOwnedShop()}>
                <PanelItem
                  icon="storefront"
                  path={shopDetailPath}
                  label={trans(TKEYS["main-navigation"].links.home)}
                />

                <Show when={isAuthenticated()}>
                  <PanelItem
                    icon="inventory_2"
                    path={inventoryPath}
                    label={trans(TKEYS.media.Inventory)}
                  />
                </Show>
              </Show>
            </Slot>
          </Suspense>
        </ErrorBoundary>

        <Slot name="settings">
          <Show when={!isAuthenticated()}>
            <PanelSettingsItem icon="login" onClick={handleSignIn}>
              <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
            </PanelSettingsItem>
          </Show>

          <PanelSettingsItem icon="language" onClick={handleSwichtLanguage}>
            <Trans key={TKEYS["main-navigation"].settings["change-language"]} />
          </PanelSettingsItem>

          <Show when={theme() === Theme.DefaultDark}>
            <PanelSettingsItem icon="light_mode" onClick={handleSwitchTheme}>
              <Trans
                key={TKEYS["main-navigation"].settings["switch-to-light-mode"]}
              />
            </PanelSettingsItem>
          </Show>
          <Show when={theme() !== Theme.DefaultDark}>
            <PanelSettingsItem icon="dark_mode" onClick={handleSwitchTheme}>
              <Trans
                key={TKEYS["main-navigation"].settings["switch-to-dark-mode"]}
              />
            </PanelSettingsItem>
          </Show>

          <Show when={isAuthenticated()}>
            <PanelSettingsItem icon="logout" onClick={handleLogout}>
              <Trans key={TKEYS["main-navigation"].actions["sign-out"]} />
            </PanelSettingsItem>
          </Show>
        </Slot>
      </Panel>

      {/* 
      <div class={styles.Navbar}>
        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.shops)}
          icon="storefront"
          path={buildShopsPath}
        />

        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.offers)}
          icon="travel_explore"
          path={buildOffersPath}
        />

        <NavbarItem
          label={trans(TKEYS["main-navigation"].links.community)}
          icon="forum"
          path={buildCommunityPath}
        />

        <Show
          when={isAuthenticated()}
          fallback={
            <NavbarItem
              label={trans(TKEYS["main-navigation"].links["get-started"])}
              icon="rocket_launch"
              path={buildIndexPath}
            />
          }
        >
          <NavbarItem
            label={trans(TKEYS["main-navigation"].links.dashboard)}
            icon="dashboard"
            path={buildDashboardPath}
          />
        </Show>
      </div> */}

      <Page style={customShopStyle}>
        <Outlet />
      </Page>

      <ShopFooter />
    </>
  );
}
