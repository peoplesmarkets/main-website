import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  renderIntoRoot,
} from "../../lib/testing";
import { Anotation } from "./Anotaion";
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

  test("Anotation", () => {
    const { container } = renderIntoRoot(() => <Anotation />);
    expect(container).toBeDefined();
  });
  test("ContentLoading", () => {
    const { container } = renderIntoRoot(() => (
      <ContentLoading size="40px" page />
    ));
    expect(container).toBeDefined();
  });
  test("Markdown", () => {
    const { container } = renderIntoRoot(() => <Markdown src={() => ""} />);
    expect(container).toBeDefined();
  });
  test("Multiline", () => {
    const { container } = renderIntoRoot(() => (
      <Multiline text="slkdjfla" maxRows={2} />
    ));
    expect(container).toBeDefined();
  });
});
