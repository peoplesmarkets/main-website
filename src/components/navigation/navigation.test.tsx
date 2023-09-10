import { describe, test, expect, beforeEach, afterEach } from "vitest";

import {
  createDOM,
  cleanupDOM,
  renderIntoRoot,
} from "../../lib/testing";
import { Slider } from "./Slider";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Slider", () => {
    const { container } = renderIntoRoot(() => (
      <Slider>
        <div></div>
      </Slider>
    ));
    expect(container).toBeDefined();
  });
});
