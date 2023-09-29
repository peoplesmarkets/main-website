import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noObj,
  renderIntoRoot,
} from "../../lib/testing";
import { OfferImages } from "./OfferImages";
import { OfferPrice } from "./OfferPrice";
import { ShopList } from "./ShopList";
import { MediaList } from "./MediaList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("ShopList", () => {
    const { container } = renderIntoRoot(() => (
      <ShopList shops={getNoObj} />
    ));
    expect(container).toBeDefined();
  });

  test("MediaList", () => {
    const { container } = renderIntoRoot(() => <MediaList medias={getNoObj} />);
    expect(container).toBeDefined();
  });

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
  test("OfferPrice", () => {
    const { container } = renderIntoRoot(() => <OfferPrice offer={getNoObj} />);
    expect(container).toBeDefined();
  });
});
