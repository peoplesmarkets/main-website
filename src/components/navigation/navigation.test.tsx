import { describe, test, expect, beforeEach, afterEach } from "vitest";

import {
  createDOM,
  cleanupDOM,
  getNoObj,
  noObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { Select } from "./Select";
import { Slider } from "./Slider";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Select", () => {
    const { container } = renderIntoRoot(() => (
      <Select
        label="label"
        options={() => [{ key: "", name: "" }]}
        selected={() => "selected"}
        onValue={() => {}}
      />
    ));
    expect(container).toBeDefined();
  });
  test("Slider", () => {
    const { container } = renderIntoRoot(() => (
      <Slider>
        <div></div>
      </Slider>
    ));
    expect(container).toBeDefined();
  });
});
