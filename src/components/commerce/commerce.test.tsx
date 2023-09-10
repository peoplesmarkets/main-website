import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noObj,
  renderIntoRoot,
} from "../../lib/testing";
import { OfferListItem } from "./OfferListItem";
import { OfferImages } from "./OfferImages";
import { OfferPrice } from "./OfferPrice";
import { OfferList } from "./OfferList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("OfferImages", () => {
    const { container } = renderIntoRoot(() => (
      <OfferImages
        offer={() => ({
          ...noObj,
          images: [],
        })}
      />
    ));
    expect(container).toBeDefined();
  });
  test("OfferListItem", () => {
    const { container } = renderIntoRoot(() => (
      <OfferListItem offer={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
  test("OfferPrice", () => {
    const { container } = renderIntoRoot(() => <OfferPrice offer={getNoObj} />);
    expect(container).toBeDefined();
  });
  test("OfferList", () => {
    const { container } = renderIntoRoot(() => (
      <OfferList offers={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
});
