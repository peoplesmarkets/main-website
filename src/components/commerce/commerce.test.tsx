import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  noObj,
  renderIntoRoot,
} from "../../lib/testing";
import { OfferListItem } from "./OfferListItem";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("OfferListItem", () => {
    const { container } = renderIntoRoot(() => (
      <OfferListItem
        offer={
          {
            name: "",
            offerId: "",
          } as any
        }
      />
    ));
    expect(container).toBeDefined();
  });
});
