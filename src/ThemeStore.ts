import { Accessor, Setter, createEffect, createSignal } from "solid-js";
import _ from "lodash";

export enum Theme {
  DefaultDark = "theme-default-dark",
  Dark = "dark-theme",
  DefaultLight = "theme-default-light",
  Light = "light-theme",
}

export const themeStore = createSignal(initialize());

function initialize() {
  let theme = localStorage?.getItem("theme");
  if (theme) {
    switch (localStorage.getItem("theme")) {
      case Theme.DefaultDark:
      case Theme.Dark:
        return Theme.DefaultDark;
      case Theme.DefaultLight:
      case Theme.Light:
      default:
        return Theme.DefaultLight;
    }
  }

  if (typeof window?.matchMedia !== undefined) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return Theme.DefaultDark;
    }
  }

  return Theme.DefaultLight;
}

export function initializeThemeStore(): [Accessor<Theme>, Setter<Theme>] {
  const [theme, setTheme] = themeStore;

  createEffect(() => {
    const root = document.documentElement;

    root.className = "";
    root.classList.add(theme());
    localStorage.setItem("theme", theme());
  });

  return [theme, setTheme];
}
