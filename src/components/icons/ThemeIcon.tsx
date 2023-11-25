import { ComponentProps, Show } from "solid-js";

import { Theme, useThemeContext } from "../../contexts/ThemeContext";
import { MdIcon } from "../assets";

type Props = ComponentProps<"i"> & {};

export function ThemeIcon(props: Props) {
  const { theme } = useThemeContext();

  return (
    <Show
      when={theme() === Theme.DefaultDark}
      fallback={<MdIcon {...props} icon="dark_mode" />}
    >
      <MdIcon {...props} icon="light_mode" />
    </Show>
  );
}
