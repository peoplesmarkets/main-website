import { A } from "@solidjs/router";

import { Page } from "@peoplesmarkets/frontend-lib";

import { INDEX_PATH } from "../App";
import { Trans } from "@mbarzda/solid-i18next";
import { TKEYS } from "../locales/dev";

export default function NotFound() {
  return (
    <>
      <Page wide={true}>
        <p
          style={{
            "font-size": "48px",
            "font-weight": "600",
            color: "var(--content-font-color)",
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
            color: "var(--active-font-color)",
            "text-decoration": "underline",
          }}
          href={INDEX_PATH}
        >
          <Trans key={TKEYS["page-not-found"]["back-to-home"]} />
        </A>
      </Page>
    </>
  );
}
