import { A } from "@solidjs/router";

import { Page } from "@peoplesmarkets/frontend-lib";

import { INDEX_PATH } from "../App";

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
          404 Page Not Found
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
          Back to main page
        </A>
      </Page>
    </>
  );
}
