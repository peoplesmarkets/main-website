import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { MediaList } from "./MediaList";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("MediaList", () => {
    const { container } = renderIntoRoot(() => (
      <MediaList medias={getNoObj} onUpdate={noOp} />
    ));
    expect(container).toBeDefined();
  });
});
