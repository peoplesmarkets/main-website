import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  asyncNoOp,
  cleanupDOM,
  createDOM,
  getNoObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { CreateMarketBoothDialog } from "./CreateMarketBoothDialog";
import { CreateOfferDialog } from "./CreateOfferDialog";
import { EditMarketBoothDialog } from "./EditMarketBoothDialog";
import { EditOfferDialog } from "./EditOfferDialog";
import { MarketBoothSettings } from "./MarketBoothSettings";
import { OfferSettings } from "./OfferSettings";
import { CreateOfferImageDialog } from "./CreateOfferImageDialog";
import { MarketBoothImage } from "./MarketBoothImage";
import { MediaSettings } from "./MediaSettings";
import { EditShopBannerDialog } from "./EditShopBannerDialog";

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
  test("CreateOfferImageDialog", () => {
    const { container } = renderIntoRoot(() => (
      <CreateOfferImageDialog
        offerId=""
        lastOrdering={0}
        onClose={noOp}
        onUpdate={noOp}
      />
    ));
    expect(container).toBeDefined();
  });
  test("EditMarketBoothDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditMarketBoothDialog
        marketBooth={() => ({ marketBoothId: "" } as any)}
        onClose={noOp}
      />
    ));
    expect(container).toBeDefined();
  });
  test("EditShopBannerDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditShopBannerDialog
        shopId=""
        onClose={noOp}
        onUpdate={noOp}
      />
    ));
    expect(container).toBeDefined();
  });
  test("EditOfferDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditOfferDialog offer={getNoObj} onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("MarketBoothImage", () => {
    const { container } = renderIntoRoot(() => (
      <MarketBoothImage onUpdate={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("MarketBoothSettings", () => {
    const { container } = renderIntoRoot(() => (
      <MarketBoothSettings onUpdate={asyncNoOp} onDelete={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("MediaSettings", () => {
    const { container } = renderIntoRoot(() => (
      <MediaSettings offer={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
  test("OfferSettings", () => {
    const { container } = renderIntoRoot(() => <OfferSettings />);
    expect(container).toBeDefined();
  });
});
