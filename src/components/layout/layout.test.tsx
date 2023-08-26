import { describe, test, expect, beforeEach, afterEach } from "vitest";

import {
  createDOM,
  cleanupDOM,
  getNoObj,
  noObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { Dialog } from "./Dialog";
import { Page } from "./Page";
import { Section } from "./Section";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Dialog", () => {
    const { container } = renderIntoRoot(() => (
      <Dialog onClose={noOp} title="">
        <></>
      </Dialog>
    ));
    expect(container).toBeDefined();
  });
  test("Page", () => {
    const { container } = renderIntoRoot(() => (
      <Page>
        <div></div>
      </Page>
    ));
    expect(container).toBeDefined();
  });
  test("Section", () => {
    const { container } = renderIntoRoot(() => (
      <Section>
        <div></div>
      </Section>
    ));
    expect(container).toBeDefined();
  });
});
