import { TransProvider } from "@mbarzda/solid-i18next";
import { Router } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { describe, expect, test } from "vitest";

import App from "./App";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { LOCALES } from "./locales";

describe("App rendering", () => {
  test("Render '<App />' inside all providers : ok", () => {
    const app = render(() => {
      return (
        <Router>
          <AccessTokenProvider>
            <TransProvider options={{ resources: LOCALES }}>
              <App />
            </TransProvider>
          </AccessTokenProvider>
        </Router>
      );
    });

    expect(app).toBeDefined();
  });
});
