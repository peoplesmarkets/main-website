import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { CreateMarketBoothDialog } from "./CreateMarketBoothDialog";
import { CreateOfferDialog } from "./CreateOfferDialog";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import { EditOfferDialog } from "./EditOfferDialog";
import { MarketBoothSettings } from "./MarketBoothSettings";
import { OfferSettings } from "./OfferSettings";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("CreateMarketBoothDialog", () => {
    const { container } = renderIntoRoot(() => (
      <CreateMarketBoothDialog onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("CreateOfferDialog", () => {
    const { container } = renderIntoRoot(() => (
      <CreateOfferDialog marketBoothId="" onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("EditMarketBoothDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditMarketBoothDialog marketBooth={noObj} onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("EditOfferDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditOfferDialog offer={getNoObj} onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("MarketBoothSettings", () => {
    const { container } = renderIntoRoot(() => (
      <MarketBoothSettings marketBooth={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
  test("OfferSettings", () => {
    const { container } = renderIntoRoot(() => (
      <OfferSettings marketBooth={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
});
