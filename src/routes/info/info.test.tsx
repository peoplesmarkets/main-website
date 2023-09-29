import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import Imprint from "./Imprint";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Imprint", () => {
    const { container } = renderIntoRoot(() => <Imprint />);
    expect(container).toBeDefined();
  });
  test("PrivacyPolicy", () => {
    const { container } = renderIntoRoot(() => <PrivacyPolicy />);
    expect(container).toBeDefined();
  });
  test("TermsOfService", () => {
    const { container } = renderIntoRoot(() => <TermsOfService />);
    expect(container).toBeDefined();
  });
});
