import { Trans } from "@mbarzda/solid-i18next";
import { Outlet, useLocation } from "@solidjs/router";
import _ from "lodash";
import { Show, createSignal, onMount } from "solid-js";

import { MainLogoLink, MdIcon } from "../components/assets";
import { EnvironmentBanner } from "../components/content/EnvironmentBanner";
import { MdButton } from "../components/form";
import { Slot } from "../components/layout";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useSelectedShopContext } from "../contexts/ShopContext";
import {
  buildEndSessionRequest,
  setDocumentMetaDescription,
  setDocumentTitle,
  setFaviconHref,
} from "../lib";
import { MAIN_FAVICON } from "../lib/constants";
import { TKEYS } from "../locales";
import { EN } from "../locales/en";
import {
  buildDashboardPath,
  buildIndexPath,
  buildShopSettingsPath,
  buildSignOutCallbackUrl,
} from "../routes/main/main-routing";
import MainFooter from "./MainFooter";
import styles from "./MainLayout.module.scss";
import { SettingsSlider } from "./SettingsSlider";
import { SliderItem } from "./SliderItem";

export default function MainLayout() {
  const location = useLocation();

  const { isAuthenticated } = useAccessTokensContext();
  const { selectedShopId } = useSelectedShopContext();

  const [showSettingsSlider, setShowSettingsSlider] = createSignal(false);

  onMount(() => {
    setDocumentTitle(EN["Peoples-Markets"]);
    setDocumentMetaDescription(EN.footer["main-paragraph"]);
    setFaviconHref(MAIN_FAVICON);
  });

  function showCreateShop() {
    if (location.pathname === buildDashboardPath()) {
      return false;
    }
    if (location.pathname === buildIndexPath()) {
      return false;
    }

    return !isAuthenticated() || _.isNil(selectedShopId());
  }

  function createShopPath() {
    if (isAuthenticated()) {
      return buildDashboardPath();
    }
    return buildIndexPath();
  }

  function signOutUrl() {
    return buildEndSessionRequest(buildSignOutCallbackUrl(), undefined);
  }

  function handleOpenSettingsSlider() {
    setShowSettingsSlider(true);
  }

  function handleCloseSettingsSlider() {
    setShowSettingsSlider(false);
  }

  return (
    <>
      <div class={styles.HeaderContainer}>
        <div class={styles.Header}>
          <MainLogoLink showText={!showCreateShop()} />

          <Show when={showCreateShop()}>
            <MdButton type="filled" href={createShopPath()}>
              <Trans key={TKEYS["main-navigation"].actions["create-shop"]} />
            </MdButton>
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

        <div class={styles.Footer}>
          <MainFooter />
        </div>
      </div>

      <SettingsSlider
        show={showSettingsSlider()}
        signOutUrl={signOutUrl()}
        onClose={handleCloseSettingsSlider}
      >
        <Slot name="links">
          <Show when={isAuthenticated()}>
            <SliderItem
              type="label"
              icon="view_list"
              key={TKEYS["main-navigation"].links["My-Offers"]}
              href={buildDashboardPath()}
            />

            <SliderItem
              type="label"
              icon="settings"
              key={TKEYS.shop.settings.title}
              href={buildShopSettingsPath(selectedShopId() || "")}
            />
          </Show>
        </Slot>
      </SettingsSlider>

      <EnvironmentBanner />
    </>
  );
}
