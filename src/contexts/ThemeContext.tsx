import _ from "lodash";
import {
  Context,
  ParentProps,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

export enum Theme {
  DefaultDark = "theme-default-dark",
  Dark = "dark-theme",
  DefaultLight = "theme-default-light",
  Light = "light-theme",
}

type ThemeContextType = ReturnType<typeof initialize>;

const ThemeContext: Context<ThemeContextType> = createContext(initialize());

export function ThemeProvider(props: ParentProps) {
  return (
    <ThemeContext.Provider value={useContext(ThemeContext)}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  if (_.isNil(ThemeContext)) {
    throw new Error("Must be wrapped in <ThemeContext>");
  }

  return useContext(ThemeContext);
}

function initialize() {
  let initialTheme: Theme;
  const themeString = localStorage?.getItem("theme");

  switch (themeString) {
    case Theme.DefaultDark:
    case Theme.Dark:
      initialTheme = Theme.DefaultDark;
      break;
    case Theme.DefaultLight:
    case Theme.Light:
    default:
      initialTheme = Theme.DefaultLight;
  }

  if (_.isNil(initialTheme) && !_.isNil(window?.matchMedia)) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initialTheme = Theme.DefaultDark;
    }
  }

  setThemeHtmlRoot(initialTheme);

  const [theme, setTheme] = createSignal(initialTheme);

  function setThemeHtmlRoot(theme: Theme.DefaultDark | Theme.DefaultLight) {
    const root = document.documentElement;

    root.className = "";
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }

  return {
    theme,
    setTheme: (theme: Theme.DefaultDark | Theme.DefaultLight) => {
      setThemeHtmlRoot(theme);
      setTheme(theme);
    },
  };
}
