import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";

import { INDEX_PATH } from "../../App";
import { Page } from "../../components/layout/Page";
import { TKEYS } from "../../locales/dev";

export default function NotFound() {
  return (
    <>
      <Page>
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
          href={INDEX_PATH}
        >
          <Trans key={TKEYS["page-not-found"]["back-to-home"]} />
        </A>
      </Page>
    </>
  );
}
