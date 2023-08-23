import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation, useMatch } from "@solidjs/router";
import _ from "lodash";
import { Accessor, Setter, Show, createEffect, createSignal } from "solid-js";

import {
  BurgerArrowIcon,
  BurgerIcon,
  DashboardIcon,
  LanguageIcon,
  MainLogoIcon,
  MainLogoIconless,
  UserSettingsIcon,
  SignInIcon,
  Theme,
  ThemeIcon,
  buildAuthorizationRequest,
  clickOutside,
} from "@peoplesmarkets/frontend-lib";

import styles from "./Panel.module.scss";
import { TKEYS } from "./locales/dev";
import { getNextLanguageKey } from "./locales";
import {
  DASHBOARD_PATH,
  INDEX_PATH,
  USER_SETTINGS_PATH,
  isSubPath,
} from "./App";
import { useAccessTokensContext } from "./contexts/AccessTokensContext";

false && clickOutside;

type Props = {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

export function Panel(props: Props) {
  const [, { changeLanguage, getI18next }] = useTransContext();
  const { isAuthenticated } = useAccessTokensContext();

  const location = useLocation();

  const [showSlider, setShowSlider] = createSignal(false);
  const [signingIn, setSigningIn] = createSignal(false);

  createEffect(() => {
    if (showSlider()) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });

  createEffect(() => {
    location.pathname && closeSlider();
  });

  function switchTheme() {
    switch (props.theme()) {
      case Theme.Dark:
      case Theme.DefaultDark:
        props.setTheme(Theme.DefaultLight);
        break;
      case Theme.Light:
      case Theme.DefaultLight:
        props.setTheme(Theme.DefaultDark);
        break;
      default:
        break;
    }
  }

  function closeSlider() {
    setShowSlider(false);
  }

  function toggleSlider() {
    setShowSlider(!showSlider());
  }

  function swichtLanguage() {
    const currentLanguage = getI18next()?.language;

    if (!_.isNil(currentLanguage)) {
      changeLanguage(getNextLanguageKey(currentLanguage));
    }
  }

  async function signIn() {
    setSigningIn(true);
    window.location.href = (await buildAuthorizationRequest()).toString();
  }

  return (
    <>
      <div class={styles.Panel}>
        <BurgerIcon class={styles.MenuIcon} onClick={toggleSlider} />
        <div class={styles.Main}>
          <A class={styles.MainLink} href={INDEX_PATH}>
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoIconless class={styles.MainLogo} />
          </A>
        </div>
      </div>

      <div
        class={styles.SliderBackground}
        classList={{
          [styles.SliderBackgroundIn]: showSlider(),
          [styles.SliderBackgroundOut]: !showSlider(),
        }}
      />
      <nav
        class={styles.Slider}
        classList={{
          [styles.SlideIn]: showSlider(),
          [styles.SlideOut]: !showSlider(),
        }}
        use:clickOutside={closeSlider}
      >
        <div class={styles.Menu}>
          <BurgerArrowIcon class={styles.MenuIcon} onClick={closeSlider} />
        </div>

        <div class={styles.MainNavigation}>
          <Show when={!isAuthenticated()}>
            <A
              href={INDEX_PATH}
              replace
              class={styles.NavigationItem}
              classList={{
                [styles.NavigationItemActive]: Boolean(
                  useMatch(() => INDEX_PATH)()
                ),
              }}
            >
              <MainLogoIcon class={styles.MainNavigationIcon} />
              <Trans key={TKEYS["main-navigation"].links.home} />
            </A>
          </Show>
          <Show when={isAuthenticated()}>
            <A
              href={DASHBOARD_PATH}
              class={styles.NavigationItem}
              classList={{
                [styles.NavigationItemActive]: isSubPath(
                  DASHBOARD_PATH,
                  location.pathname
                ),
              }}
            >
              <DashboardIcon class={styles.MainNavigationIcon} />
              <Trans key={TKEYS["main-navigation"].links.dashboard} />
            </A>

            <A
              href={USER_SETTINGS_PATH}
              class={styles.NavigationItem}
              classList={{
                [styles.NavigationItemActive]: Boolean(
                  useMatch(() => USER_SETTINGS_PATH)()
                ),
              }}
            >
              <UserSettingsIcon class={styles.MainNavigationIcon} />
              <Trans key={TKEYS["main-navigation"].actions["user-settings"]} />
            </A>
          </Show>
        </div>

        <div class={styles.Settings}>
          <Show when={!isAuthenticated()}>
            <a
              class={styles.NavigationItem}
              classList={{ [styles.NavigationItemActive]: signingIn() }}
              onClick={() => signIn()}
            >
              <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
              <SignInIcon class={styles.NavigationIcon} />
            </a>
          </Show>

          <button class={styles.NavigationItem} onClick={swichtLanguage}>
            <Trans key={TKEYS["main-navigation"].settings["change-language"]} />
            <LanguageIcon class={styles.NavigationIcon} />
          </button>

          <button class={styles.NavigationItem} onClick={() => switchTheme()}>
            <Show
              when={
                props.theme() === Theme.Dark ||
                props.theme() === Theme.DefaultDark
              }
              fallback={
                <Trans
                  key={TKEYS["main-navigation"].settings["switch-to-dark-mode"]}
                />
              }
            >
              <Trans
                key={TKEYS["main-navigation"].settings["switch-to-light-mode"]}
              />
            </Show>
            <ThemeIcon class={styles.NavigationIcon} theme={props.theme} />
          </button>
        </div>
      </nav>
    </>
  );
}
