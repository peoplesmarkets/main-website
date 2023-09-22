import { describe, test, expect, beforeEach, afterEach } from "vitest";

import {
  createDOM,
  cleanupDOM,
  renderIntoRoot,
  getNoObj,
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
      <Panel>
        <PanelItem Icon={getNoObj} label={() => ""} path={() => ""} />
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
