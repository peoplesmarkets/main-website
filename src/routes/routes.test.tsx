import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoRoot } from "../lib/testing";
import SignInCallback from "./SignInCallback";
import UserSettings from "./UserSettings";
import { CODE_CHALLENGE_STORAGE_KEY, buildPath } from "../lib";
import { USER_SETTINGS_PATH } from "../App";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("UserSettings", () => {
    const { container } = renderIntoRoot(() => <UserSettings />);
    expect(container).toBeDefined();
  });
});
