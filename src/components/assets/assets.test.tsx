import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import { MainLogoText } from "./MainLogoText";
import { PlaceholderImage } from "./PlaceholderImage";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("MainLogoText", () => {
    const { container } = renderIntoRoot(() => <MainLogoText />);
    expect(container).toBeDefined();
  });
  test("PlaceholderImage", () => {
    const { container } = renderIntoRoot(() => <PlaceholderImage />);
    expect(container).toBeDefined();
  });
});
