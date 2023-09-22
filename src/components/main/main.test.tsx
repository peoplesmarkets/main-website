import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { OfferList } from "./OfferList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("OfferList", () => {
    const { container } = renderIntoRoot(() => <OfferList offers={getNoObj} />);
    expect(container).toBeDefined();
  });
});
