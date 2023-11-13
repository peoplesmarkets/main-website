import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { MdButton } from "../form";
import { MdIcon } from "../assets/MdIcon";

export function ContentError() {
  return (
    <p
      style={{
        color: "var(--danger-content-color)",
        font: "var(--font-label)",
      }}
    >
      <Trans key={TKEYS.fetching["content-error"]} />

      <MdButton type="filled" onClick={() => location.reload()}>
        <Trans key={TKEYS.common.reload} />
        <MdIcon slot="icon" icon="refresh" />
      </MdButton>
    </p>
  );
}
