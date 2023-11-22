import { Show, createSignal, onMount } from "solid-js";

import { Outlet, useLocation } from "@solidjs/router";
import { MainLogoLink, MdIcon } from "../components/assets";
import { EnvironmentBanner } from "../components/content/EnvironmentBanner";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import {
  setDocumentMetaDescription,
  setDocumentTitle,
  setFaviconHref,
} from "../lib";
import { MAIN_FAVICON } from "../lib/constants";
import { EN } from "../locales/en";
import MainFooter from "./MainFooter";
import styles from "./MainRoutesWrapper.module.scss";
import { SettingsSlider } from "./SettingsSlider";
import { MdButton } from "../components/form";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../locales";
import { useSelectedShopContext } from "../contexts/ShopContext";
import _ from "lodash";
import { buildDashboardPath, buildGetStartedPath } from "./main-routing";

export default function MainRoutesWrapper() {
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
    if (location.pathname === buildGetStartedPath()) {
      return false;
    }

    return !isAuthenticated() || _.isNil(selectedShopId());
  }

  function createShopPath() {
    if (isAuthenticated()) {
      return buildDashboardPath();
    }
    return buildGetStartedPath();
  }

  function handleShowSettingsSlider() {
    setShowSettingsSlider(true);
  }

  function handleCloseSettingsSlider() {
    setShowSettingsSlider(false);
  }

  return (
    <>
      <div class={styles.HeaderContainer}>
        <div class={styles.Header}>
          <MainLogoLink />

          <Show when={showCreateShop()}>
            <MdButton type="filled" href={createShopPath()}>
              <Trans key={TKEYS["main-navigation"].actions["create-shop"]} />
            </MdButton>
          </Show>

          <div class={styles.HeaderActions}>
            <MdIcon
              class={styles.HeaderIcon}
              icon="menu"
              onClick={handleShowSettingsSlider}
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
        onClose={handleCloseSettingsSlider}
      />

      <EnvironmentBanner />
    </>
  );
}
