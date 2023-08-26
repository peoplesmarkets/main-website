import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";

export function ContentError() {
  return (
    <p
      style={{
        color: "var(--danger-content-color)",
        font: "var(--font-label)",
      }}
    >
      <Trans key={TKEYS.fetching["content-error"]} />
    </p>
  );
}
