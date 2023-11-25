import { A, Outlet, useRouteData } from "@solidjs/router";
import _ from "lodash";
import {
  Show,
  createEffect,
  createResource,
  createSignal,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";

import { MainLogoText, MdIcon } from "../components/assets";
import { Font } from "../components/content";
import { MainLogoIcon } from "../components/icons";
import { Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useServiceClientContext } from "../contexts/ServiceClientContext";
import { Theme, useThemeContext } from "../contexts/ThemeContext";
import {
  buildEndSessionRequest,
  isCssColor,
  setDocumentMetaDescription,
  setDocumentTitle,
  setFaviconHref,
  utf8ToBase64,
} from "../lib";
import { SHOP_FAVICON } from "../lib/constants";
import { TKEYS } from "../locales";
import { EN } from "../locales/en";
import {
  buildIndexPathOrUrl,
  buildSignOutCallbackUrl,
} from "../routes/main/main-routing";
import { ShopData } from "../routes/shops/ShopData";
import {
  buildInventoryPath,
  buildShopDetailPath,
} from "../routes/shops/shop-routing";
import { ShopResponse } from "../services/peoplesmarkets/commerce/v1/shop";
import { SettingsSlider } from "./SettingsSlider";
import styles from "./ShopLayout.module.scss";
import { SliderItem } from "./SliderItem";

export default function ShopLayout() {
  const { theme } = useThemeContext();
  const { isAuthenticated } = useAccessTokensContext();

  const { shopCustomizationService, shopDomainService } =
    useServiceClientContext();

  const shopData = useRouteData<typeof ShopData>();

  const [showSettingsSlider, setShowSettingsSlider] = createSignal(false);

  const [shopCustomization] = createResource(shopData?.shopId, async (shopId) =>
    shopCustomizationService.get(shopId).then((res) => res.shopCustomization)
  );

  const [signOutUrl] = createResource(
    () => shopData?.shop(),
    async (shop: ShopResponse) => {
      const domainResponse = await shopDomainService.getDomainStatus(
        shop.shopId
      );

      const slug = shop?.slug;
      const clientId = domainResponse?.domainStatus?.clientId;

      if (!_.isNil(slug) && !_.isEmpty(slug)) {
        if (!_.isNil(clientId) && !_.isEmpty(clientId)) {
          return buildEndSessionRequest(buildSignOutCallbackUrl(), clientId);
        }

        return buildEndSessionRequest(
          buildSignOutCallbackUrl(),
          undefined,
          utf8ToBase64(buildShopDetailPath(slug))
        );
      }

      return buildIndexPathOrUrl();
    }
  );

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
      <div style={customShopStyle}>
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
                <img class={styles.Logo} src={logoImageUrl()} alt="" />
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
