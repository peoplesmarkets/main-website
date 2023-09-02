import { afterEach, beforeEach, describe, expect, test } from "vitest";

import Footer from "./Footer";
import { Panel } from "./Panel";
import { Theme } from "./contexts/ThemeStore";
import { cleanupDOM, createDOM, noOp, renderIntoRoot } from "./lib/testing";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

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
