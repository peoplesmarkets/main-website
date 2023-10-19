import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Component, Show } from "solid-js";
import { useAccessTokensContext } from "../../contexts/AccessTokensContext";
import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { clickOutside } from "../../directives";
import { setDocumentLanguage } from "../../lib";
import { TKEYS, getNextLanguageKey } from "../../locales";
import { CloseIcon, LanguageIcon, SignOutIcon, ThemeIcon } from "../icons";
import styles from "./SettingsSlider.module.scss";

false && clickOutside;

type Props = {
  show: boolean;
  onClose: () => void;
};

export function SettingsSlider(props: Props) {
  const [trans, { changeLanguage, getI18next }] = useTransContext();

  const { theme, setTheme } = useThemeContext();

  const { endSession, isAuthenticated } = useAccessTokensContext();

  function themeLabel() {
    if (theme() === Theme.DefaultDark) {
      return trans(TKEYS["main-navigation"].settings["switch-to-light-mode"]);
    }

    return trans(TKEYS["main-navigation"].settings["switch-to-dark-mode"]);
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

  return (
    <div
      class={styles.SettingsSlider}
      classList={{ [styles.SlideIn]: props.show }}
    >
      <div class={styles.Slider} use:clickOutside={props.onClose}>
        <div class={styles.Menu}>
          <span class={styles.Title}>
            <Trans key={TKEYS["main-navigation"].settings.Title} />
          </span>

          <CloseIcon class={styles.MenuIcon} onClick={props.onClose} />
        </div>

        <div class={styles.Settings}>
          <SettingsItem
            Icon={ThemeIcon}
            label={themeLabel()}
            onClick={handleSwitchTheme}
          />

          <SettingsItem
            Icon={LanguageIcon}
            label={trans(TKEYS["main-navigation"].settings["change-language"])}
            onClick={handleSwichtLanguage}
          />

          <Show when={isAuthenticated()}>
            <SettingsItem
              Icon={SignOutIcon}
              label={trans(TKEYS["main-navigation"].actions["sign-out"])}
              onClick={endSession}
            />
          </Show>
        </div>
      </div>
    </div>
  );
}

function SettingsItem(props: {
  Icon: Component<{ class?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button class={styles.SettingsItem} onClick={() => props.onClick()}>
      <props.Icon class={styles.SettingsItemIcon} />
      <span class={styles.SettingsItemLabel}>{props.label}</span>
    </button>
  );
}
