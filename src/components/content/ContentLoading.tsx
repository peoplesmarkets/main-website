import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../../locales/dev";

export function isResolved(
  state: "unresolved" | "pending" | "errored" | "ready" | "refreshing"
): boolean {
  return state === "ready" || state === "refreshing";
}

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
