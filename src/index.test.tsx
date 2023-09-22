import { afterEach, beforeEach, describe, expect, test } from "vitest";

import Footer from "./Footer";
import { cleanupDOM, createDOM, renderIntoRoot } from "./lib/testing";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Footer", () => {
    const { container } = renderIntoRoot(() => <Footer />);
    expect(container).toBeDefined();
  });
});
