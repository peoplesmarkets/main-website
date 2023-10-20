import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";

export function ContentLoading() {
  return (
    <p
      style={{
        font: "var(--font-label)",
      }}
    >
      <Trans key={TKEYS.fetching["content-loading"]} />
    </p>
  );
}
