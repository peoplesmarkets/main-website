import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import ShopDetail from "./ShopDetail";
import OfferDetail from "./OfferDetail";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("ShopDetail", () => {
    const { container } = renderIntoRoot(() => <ShopDetail />);
    expect(container).toBeDefined();
  });
  test("OfferDetail", () => {
    const { container } = renderIntoRoot(() => <OfferDetail />);
    expect(container).toBeDefined();
  });
});
