import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../../lib/testing";
import CommunityRoutes from "./CommunityRoutes";
import Home from "./Home";
import { Posts } from "./Posts";
import { PostsNav } from "./PostsNav";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("CommunityRoutes", () => {
    const { container } = renderIntoRoot(() => <CommunityRoutes />);
    expect(container).toBeDefined();
  });
  test("Home", () => {
    const { container } = renderIntoRoot(() => <Home />);
    expect(container).toBeDefined();
  });
  test("Posts", () => {
    const { container } = renderIntoRoot(() => <Posts />);
    expect(container).toBeDefined();
  });
  test("PostsNav", () => {
    const { container } = renderIntoRoot(() => <PostsNav />);
    expect(container).toBeDefined();
  });
});
