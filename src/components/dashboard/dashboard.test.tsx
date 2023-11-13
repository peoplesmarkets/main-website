import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  asyncNoOp,
  cleanupDOM,
  createDOM,
  getNoObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { CreateOfferDialog } from "./CreateOfferDialog";
import { EditShopDialog } from "./EditShopDialog";
import { EditOfferDialog } from "./EditOfferDialog";
import { ShopSettings } from "./ShopSettings";
import { OfferSettings } from "./OfferSettings";
import { CreateOfferImageDialog } from "./CreateOfferImageDialog";
import { ShopImage } from "./ShopImage";
import { MediaSettings } from "./MediaSettings";
import { EditShopBannerDialog } from "./EditShopBannerDialog";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("CreateOfferDialog", () => {
    const { container } = renderIntoRoot(() => (
      <CreateOfferDialog shopId="" onClose={noOp} />
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
  test("EditShopDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditShopDialog shop={() => ({ shopId: "" } as any)} onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("EditShopBannerDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditShopBannerDialog shopId="" onClose={noOp} onUpdate={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("EditOfferDialog", () => {
    const { container } = renderIntoRoot(() => (
      <EditOfferDialog offer={getNoObj} onClose={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("ShopImage", () => {
    const { container } = renderIntoRoot(() => <ShopImage onUpdate={noOp} />);
    expect(container).toBeDefined();
  });
  test("ShopSettings", () => {
    const { container } = renderIntoRoot(() => (
      <ShopSettings onUpdate={asyncNoOp} onDelete={noOp} />
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
    const { container } = renderIntoRoot(() => (
      <OfferSettings shop={getNoObj} />
    ));
    expect(container).toBeDefined();
  });
});
