import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { render } from "@solidjs/testing-library";

import App from "./App";
import { cleanupDOM, createDOM, noOp, renderIntoRoot } from "./lib/testing";
import Footer from "./Footer";
import { Panel } from "./Panel";
import { Theme } from "./contexts/ThemeStore";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("App", () => {
    const TheApp = () => <App />;

    const root = document.getElementById("root");

    expect(root).toBeDefined();

    const { container } = render(TheApp, {
      container: root!,
    });
    expect(container).toBeDefined();
  });
  test("Footer", () => {
    const { container } = renderIntoRoot(() => (
      <Footer theme={() => Theme.Light} />
    ));
    expect(container).toBeDefined();
  });
  test("Panel", () => {
    const { container } = renderIntoRoot(() => (
      <Panel theme={() => Theme.Dark} setTheme={noOp} />
    ));
    expect(container).toBeDefined();
  });
});
