import { Show } from "solid-js";

import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { MdIcon } from "../assets";

export function ThemeIcon() {
  const { theme } = useThemeContext();

  return (
    <Show
      when={theme() === Theme.DefaultDark}
      fallback={<MdIcon icon="dark_mode" />}
    >
      <MdIcon icon="light_mode" />
    </Show>
  );
}
