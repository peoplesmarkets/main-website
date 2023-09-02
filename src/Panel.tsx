import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation, useMatch } from "@solidjs/router";
import _ from "lodash";
import { Accessor, Setter, Show, createEffect, createSignal } from "solid-js";

import {
  COMMUNITY_PATH,
  DASHBOARD_PATH,
  INDEX_PATH,
  MARKET_BOOTHS_PATH,
  OFFERS_PATH,
  USER_SETTINGS_PATH,
} from "./App";
import styles from "./Panel.module.scss";
import { MainLogoText } from "./components/assets";
import {
  BurgerArrowIcon,
  BurgerIcon,
  DashboardIcon,
  LanguageIcon,
  MainLogoIcon,
  SignInIcon,
  ThemeIcon,
  UserSettingsIcon,
} from "./components/icons";
import CommunityIcon from "./components/icons/CommunityIcon";
import { SearchGlobalIcon } from "./components/icons/SearchGlobalIcon";
import { StoreFrontIcon } from "./components/icons/StorefrontIcon";
import { useAccessTokensContext } from "./contexts/AccessTokensContext";
import { Theme } from "./contexts/ThemeStore";
import { clickOutside } from "./directives";
import { buildAuthorizationRequest, isSubPath } from "./lib";
import { getNextLanguageKey } from "./locales";
import { TKEYS } from "./locales/dev";

false && clickOutside;

type Props = {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
};

export function Panel(props: Props) {
  const [trans, { changeLanguage, getI18next }] = useTransContext();
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

        <div class={styles.EnvironmentBanner}>
          <Show when={!import.meta.env.VITE_ENVIRONMENT?.startsWith("prod")}>
            <p>
              <Trans key={TKEYS["environment-banner"].title} />
            </p>
            <span>
              <Trans key={TKEYS["environment-banner"].description} />
              <A href={trans(TKEYS.peoplesmarkets_main_link)}>
                <Trans key={TKEYS.peoplesmarkets_main_link} />
              </A>
            </span>
          </Show>
        </div>

        <div class={styles.Main}>
          <A class={styles.MainLink} href={INDEX_PATH}>
            <MainLogoIcon class={styles.MainLogoIcon} />
            <MainLogoText class={styles.MainLogo} />
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
          <A
            href={MARKET_BOOTHS_PATH}
            class={styles.NavigationItem}
            classList={{
              [styles.NavigationItemActive]: Boolean(
                useMatch(() => MARKET_BOOTHS_PATH)()
              ),
            }}
          >
            <StoreFrontIcon class={styles.MainNavigationIcon} />
            <Trans key={TKEYS["main-navigation"].links["market-booths"]} />
          </A>
          <A
            href={OFFERS_PATH}
            class={styles.NavigationItem}
            classList={{
              [styles.NavigationItemActive]: Boolean(
                useMatch(() => OFFERS_PATH)()
              ),
            }}
          >
            <SearchGlobalIcon class={styles.MainNavigationIcon} />
            <Trans key={TKEYS["main-navigation"].links["offers"]} />
          </A>

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
              <Trans key={TKEYS["main-navigation"].links["user-settings"]} />
            </A>
          </Show>

          <A
            href={COMMUNITY_PATH}
            class={styles.NavigationItem}
            classList={{
              [styles.NavigationItemActive]:
                isSubPath(COMMUNITY_PATH, location.pathname) ||
                Boolean(useMatch(() => COMMUNITY_PATH)()),
            }}
          >
            <CommunityIcon class={styles.MainNavigationIcon} />
            <Trans key={TKEYS["main-navigation"].links.community} />
          </A>
        </div>

        <div class={styles.Settings}>
          <Show when={!isAuthenticated()}>
            <button
              class={styles.NavigationItem}
              classList={{ [styles.NavigationItemActive]: signingIn() }}
              onClick={() => signIn()}
            >
              <Trans key={TKEYS["main-navigation"].actions["sign-in"]} />
              <SignInIcon class={styles.NavigationIcon} />
            </button>
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
