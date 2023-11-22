import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { TKEYS } from "../locales";
import MainRoutesWrapper from "./MainRoutesWrapper";
import { buildIndexPath } from "./main-routing";

export default function NotFound() {
  return (
    <MainRoutesWrapper>
      <p
        style={{
          "font-size": "48px",
          "font-weight": "600",
          color: "var(--primary-content-color)",
          "text-decoration": "none",
        }}
      >
        <Trans key={TKEYS["page-not-found"].title} />
      </p>
      <A
        style={{
          "font-size": "18px",
          "font-weight": "normal",
          "text-align": "right",
          color: "var(--active-content-color)",
          "text-decoration": "underline",
        }}
        href={buildIndexPath()}
      >
        <Trans key={TKEYS["page-not-found"]["back-to-home"]} />
      </A>
    </MainRoutesWrapper>
  );
}
