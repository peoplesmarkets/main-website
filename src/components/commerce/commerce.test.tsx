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
import { MarketBoothContext } from "./MarketBoothContext";
import { MarketBoothList } from "./MarketBoothList";
import { MediaList } from "./MediaList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("MarketBoothContext", () => {
    const { container } = renderIntoRoot(() => (
      <MarketBoothContext marketBooth={getNoObj}>
        <></>
      </MarketBoothContext>
    ));
    expect(container).toBeDefined();
  });

  test("MarketBoothList", () => {
    const { container } = renderIntoRoot(() => (
      <MarketBoothList marketBooths={getNoObj} basePath="" />
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
    const { container } = renderIntoRoot(() => <OfferList offers={getNoObj} />);
    expect(container).toBeDefined();
  });
});
