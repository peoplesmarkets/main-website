import { useTransContext } from "@mbarzda/solid-i18next";
import { ComponentProps, Show, splitProps } from "solid-js";

import { TKEYS, getNextLanguageKey } from "../../locales";
import { MdIcon } from "../assets";
import { Font } from "../content";

type Props = ComponentProps<"i"> & {
  readonly showLang?: boolean | undefined;
};

export function LanguageIcon(props: Props) {
  const [local, others] = splitProps(props, ["showLang"]);
  const [trans] = useTransContext();

  return (
    <span
      style={{
        display: "flex",
        "justify-content": "start",
        "align-items": "baseline",
      }}
    >
      <MdIcon {...others} icon="language" />
      <Show when={Boolean(local.showLang)}>
        <Font type="detail">{getNextLanguageKey(trans(TKEYS.lang))}</Font>
      </Show>
    </span>
  );
}
