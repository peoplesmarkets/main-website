import { useTransContext } from "@mbarzda/solid-i18next";
import { useLocation } from "@solidjs/router";
import _ from "lodash";
import { Show, createEffect, createResource, createSignal, on } from "solid-js";

import { CloseIcon, ThemeIcon } from "../components/icons";
import { Border } from "../components/layout";
import { ReportDialog } from "../components/report";
import { useAccessTokensContext } from "../contexts/AccessTokensContext";
import { useSelectedShopContext } from "../contexts/ShopContext";
import { Theme, useThemeContext } from "../contexts/ThemeContext";
import { clickOutside } from "../directives";
import { buildAuthorizationRequest, setDocumentLanguage } from "../lib";
import { TKEYS, getNextLanguageKey } from "../locales";
import styles from "./SettingsSlider.module.scss";
import { SliderItem } from "./SliderItem";
import { buildDashboardPath, buildShopSettingsPath } from "./main-routing";

false && clickOutside;

type Props = {
  show: boolean;
  onClose: () => void;
};

export function SettingsSlider(props: Props) {
  const location = useLocation();
  const [trans, { changeLanguage, getI18next }] = useTransContext();

  const { theme, setTheme } = useThemeContext();
  const { selectedShopId } = useSelectedShopContext();

  const { endSession, isAuthenticated } = useAccessTokensContext();

  const [showReportDialog, setShowReportDialog] = createSignal(false);

  const [signInUrl] = createResource(
    () => !isAuthenticated(),
    async () => {
      const signInUrl = await buildAuthorizationRequest(
        undefined,
        buildDashboardPath()
      );

      return signInUrl.toString();
    }
  );

  createEffect(
    on(
      () => location.pathname,
      () => props.onClose()
    )
  );

  function themeLabel() {
    if (theme() === Theme.DefaultDark) {
      return trans(TKEYS["main-navigation"].settings["switch-to-light-mode"]);
    }

    return trans(TKEYS["main-navigation"].settings["switch-to-dark-mode"]);
  }

  function handleSignOut() {
    props.onClose();
    endSession();
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

  function handleOpenReportDialog() {
    props.onClose();
    setShowReportDialog(true);
  }

  function handleCloseReportDialog() {
    setShowReportDialog(false);
  }

  return (
    <>
      <div
        class={styles.SettingsSlider}
        classList={{ [styles.SlideIn]: props.show }}
      >
        <div class={styles.Slider} use:clickOutside={props.onClose}>
          <div class={styles.Menu}>
            <CloseIcon class={styles.MenuIcon} onClick={props.onClose} />
          </div>

          <Border flat />

          <div class={styles.Settings}>
            <Show
              when={isAuthenticated()}
              fallback={
                <SliderItem
                  icon="login"
                  type="label"
                  active
                  href={signInUrl()}
                  key={TKEYS["main-navigation"].actions["sign-in"]}
                />
              }
            >
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
          </div>

          <div class={styles.Actions}>
            <Show when={isAuthenticated()}>
              <SliderItem
                type="body"
                icon="logout"
                danger
                key={TKEYS["main-navigation"].actions["sign-out"]}
                iconLeft
                onClick={handleSignOut}
              />
            </Show>

            <SliderItem
              type="body"
              iconLeft
              label={themeLabel()}
              onClick={handleSwitchTheme}
            >
              <ThemeIcon />
            </SliderItem>

            <SliderItem
              type="body"
              icon="language"
              key={TKEYS["main-navigation"].settings["change-language"]}
              iconLeft
              onClick={handleSwichtLanguage}
            />

            <SliderItem
              type="body"
              icon="report"
              key={TKEYS.report.label}
              iconLeft
              onClick={handleOpenReportDialog}
            />
          </div>
        </div>
      </div>

      <ReportDialog
        show={showReportDialog()}
        onClose={handleCloseReportDialog}
      />
    </>
  );
}
