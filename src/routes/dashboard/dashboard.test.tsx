import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import Dashboard from "./Dashboard";
import Offer from "./Offer";
import MarketBooth from "./MarketBooth";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Dashboard", () => {
    const { container } = renderIntoRoot(() => <Dashboard />);
    expect(container).toBeDefined();
  });
  test("MarketBooth", () => {
    const { container } = renderIntoRoot(() => <MarketBooth />);
    expect(container).toBeDefined();
  });
  test("Offer", () => {
    const { container } = renderIntoRoot(() => <Offer />);
    expect(container).toBeDefined();
  });
});
