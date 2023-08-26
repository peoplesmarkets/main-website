import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { ContentError } from "./ContentError";
import { ContentLoading } from "./ContentLoading";
import { Markdown } from "./Markdown";
import { Multiline } from "./Multiline";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("ContentError", () => {
    const { container } = renderIntoRoot(() => <ContentError />);
    expect(container).toBeDefined();
  });
  test("ContentLoading", () => {
    const { container } = renderIntoRoot(() => <ContentLoading />);
    expect(container).toBeDefined();
  });
  test("Markdown", () => {
    const { container } = renderIntoRoot(() => <Markdown src={() => ""} />);
    expect(container).toBeDefined();
  });
  test("Multiline", () => {
    const { container } = renderIntoRoot(() => <Multiline text={getNoObj} />);
    expect(container).toBeDefined();
  });
});
