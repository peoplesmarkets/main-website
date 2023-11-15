import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { OfferPrice } from "../../pages/OfferPrice";
import { MediaList } from "./MediaList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("MediaList", () => {
    const { container } = renderIntoRoot(() => <MediaList medias={getNoObj} />);
    expect(container).toBeDefined();
  });

  test("OfferPrice", () => {
    const { container } = renderIntoRoot(() => <OfferPrice offer={getNoObj} />);
    expect(container).toBeDefined();
  });
});
