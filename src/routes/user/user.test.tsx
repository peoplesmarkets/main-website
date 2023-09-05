import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import Settings from "./Settings";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Settings", () => {
    const { container } = renderIntoRoot(() => <Settings />);
    expect(container).toBeDefined();
  });
});
