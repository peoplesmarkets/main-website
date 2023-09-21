import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import MarketBoothDetail from "./MarketBoothDetail";
import OfferDetail from "./OfferDetail";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("MarketBoothDetail", () => {
    const { container } = renderIntoRoot(() => <MarketBoothDetail />);
    expect(container).toBeDefined();
  });
  test("OfferDetail", () => {
    const { container } = renderIntoRoot(() => <OfferDetail />);
    expect(container).toBeDefined();
  });
});
