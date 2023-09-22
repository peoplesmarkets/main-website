import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A, useLocation } from "@solidjs/router";
import _ from "lodash";
import { JSX, Show, createEffect, createSignal } from "solid-js";

import {
  BurgerArrowIcon,
  BurgerIcon,
  LanguageIcon,
  SignInIcon,
  ThemeIcon,
} from "../../components/icons";
import { getSlots } from "../../components/layout/Slot";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { clickOutside } from "../../directives";
import { buildAuthorizationRequest } from "../../lib";
import { getNextLanguageKey, setDocumentLanguage } from "../../locales";
import { TKEYS } from "../../locales/dev";
import styles from "./Panel.module.scss";

false && clickOutside;

type Props = {
  children: JSX.Element;
};

export function Panel(props: Props) {
  const [trans, { changeLanguage, getI18next }] = useTransContext();
  const { theme, setTheme } = useThemeContext();
  const { isAuthenticated } = useAccessTokensContext();

  const location = useLocation();

  /* eslint-disable-next-line */
  const slots = getSlots(props.children);

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
    if (theme() === Theme.DefaultDark) {
      setTheme(Theme.DefaultLight);
    } else {
      setTheme(Theme.DefaultDark);
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
      const lang = getNextLanguageKey(currentLanguage);
      changeLanguage(lang);
      setDocumentLanguage(lang);
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

        <div class={styles.Main}>{slots.logo}</div>
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

        <div class={styles.MainNavigation}>{slots.items}</div>

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
              when={theme() === Theme.DefaultDark}
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
            <ThemeIcon class={styles.NavigationIcon} />
          </button>
        </div>
      </nav>

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
    </>
  );
}
