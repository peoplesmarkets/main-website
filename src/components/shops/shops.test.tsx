import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { ShopBanner } from "./ShopBanner";
import { OfferList } from "./OfferList";
import { OfferBuy } from "./OfferBuy";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("OfferBuy", () => {
    const { container } = renderIntoRoot(() => <OfferBuy offer={getNoObj} />);
    expect(container).toBeDefined();
  });

  test("OfferList", () => {
    const { container } = renderIntoRoot(() => <OfferList offers={getNoObj} />);
    expect(container).toBeDefined();
  });

  test("ShopBanner", () => {
    const { container } = renderIntoRoot(() => <ShopBanner shop={getNoObj} />);
    expect(container).toBeDefined();
  });
});
