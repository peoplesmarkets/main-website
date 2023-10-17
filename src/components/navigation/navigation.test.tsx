import { describe, test, expect, beforeEach, afterEach } from "vitest";

import {
  createDOM,
  cleanupDOM,
  renderIntoRoot,
  getNoObj,
  noOp,
} from "../../lib/testing";
import { Slider } from "./Slider";
import { Panel } from "./Panel";
import { PanelItem } from "./PanelItem";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Panel + PanelItem", () => {
    const { container } = renderIntoRoot(() => (
      <Panel showSlider={() => true} setShowSlider={noOp}>
        <PanelItem Icon={getNoObj} path={() => ""}>
          <></>
        </PanelItem>
      </Panel>
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
