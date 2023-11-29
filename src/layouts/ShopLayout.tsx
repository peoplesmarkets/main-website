import { A, Outlet, useRouteData } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createSignal, onMount } from "solid-js";

import {
  applyTheme,
  argbFromHex,
  themeFromSourceColor,
} from "@material/material-color-utilities";
import { MainLogoText, MdIcon } from "../components/assets";
import { Font } from "../components/content";
import { MainLogoIcon } from "../components/icons";
import { Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useThemeContext } from "../contexts/ThemeContext";
import {
  buildEndSessionRequest,
  setDocumentMetaDescription,
  setDocumentTitle,
  setFaviconHref,
  utf8ToBase64,
} from "../lib";
import { SHOP_FAVICON } from "../lib/constants";
import { TKEYS } from "../locales";
import { EN } from "../locales/en";
import { buildSignOutCallbackUrl } from "../routes/main/main-routing";
import { ShopData } from "../routes/shops/ShopData";
import {
  buildInventoryPath,
  buildShopDetailPath,
} from "../routes/shops/shop-routing";
import { SettingsSlider } from "./SettingsSlider";
import styles from "./ShopLayout.module.scss";
import { SliderItem } from "./SliderItem";

export default function ShopLayout() {
  const { isDarkTheme } = useThemeContext();
  const { isAuthenticated } = useAccessTokensContext();

  const shopData = useRouteData<typeof ShopData>();

  const [showSettingsSlider, setShowSettingsSlider] = createSignal(false);

  function signOutUrl() {
    const shopSlug = shopData.shop()?.slug;
    const clientId = shopData.shop()?.clientId;

    if (!_.isNil(shopSlug) && !_.isEmpty(shopSlug)) {
      if (!_.isNil(clientId) && !_.isNil(clientId)) {
        return buildEndSessionRequest(buildSignOutCallbackUrl(), clientId);
      }

      return buildEndSessionRequest(
        buildSignOutCallbackUrl(),
        undefined,
        utf8ToBase64(buildShopDetailPath(shopSlug))
      );
    }

    return buildEndSessionRequest(buildSignOutCallbackUrl(), undefined);
  }

  function logoImageUrl() {
    const logoImageLightUrl = shopData.shop()?.customization?.logoImageLightUrl;
    if (!_.isEmpty(logoImageLightUrl) && !isDarkTheme()) {
      return logoImageLightUrl;
    }

    const logoImageDarkUrl = shopData.shop()?.customization?.logoImageDarkUrl;
    if (!_.isEmpty(logoImageDarkUrl) && isDarkTheme()) {
      return logoImageDarkUrl;
    }
  }

  onMount(() => {
    setFaviconHref(SHOP_FAVICON);
  });

  createEffect(() => {
    const primaryColor = shopData.shop()?.customization?.primaryColor;
    if (!_.isNil(primaryColor)) {
      const customTheme = themeFromSourceColor(argbFromHex(primaryColor), [
        // { name: "custom-1", value: argbFromHex(primaryColor), blend: true },
      ]);

      applyTheme(customTheme, {
        target: document.body,
        dark: isDarkTheme(),
      });
    }
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

  function handleOpenSettingsSlider() {
    setShowSettingsSlider(true);
  }

  function handleCloseSettingsSlider() {
    setShowSettingsSlider(false);
  }

  return (
    <>
      <div>
        <div class={styles.HeaderContainer}>
          <div class={styles.Header}>
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
                <img
                  class={styles.Logo}
                  src={logoImageUrl()}
                  alt={shopData.shop()?.name + "logo"}
                />
              </A>
            </Show>

            <div class={styles.HeaderActions}>
              <MdIcon
                class={styles.HeaderIcon}
                icon="menu"
                onClick={handleOpenSettingsSlider}
              />
            </div>
          </div>
        </div>

        <div class={styles.Main}>
          <div class={styles.Content}>
            <Outlet />
          </div>
        </div>
      </div>

      <footer class={styles.Footer}>
        <Font type="body" inline key={TKEYS.footer["powered-by"]} />

        <div class={styles.FooterLogo}>
          <A
            class={styles.FooterLogoLink}
            href={import.meta.env.VITE_MAIN_WEBSITE_URL}
            target="_blank"
            aria-label="Peoples Market's home page"
          >
            <MainLogoIcon class={styles.FooterLogoIcon} />
            <MainLogoText class={styles.FooterLogoText} />
          </A>
        </div>
      </footer>

      <SettingsSlider
        show={showSettingsSlider()}
        signOutUrl={signOutUrl()}
        onClose={handleCloseSettingsSlider}
      >
        <Slot name="links">
          <Show when={isAuthenticated()}>
            <SliderItem
              type="label"
              icon="inventory_2"
              key={TKEYS["main-navigation"].links["My-Subscriptions"]}
              href={inventoryPath()}
            />
          </Show>
        </Slot>
      </SettingsSlider>
    </>
  );
}
