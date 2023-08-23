import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, renderIntoMain } from "../../../testing";

import { TextArea } from "./TextArea";

// Added this to check that unit testing is working on basic level.
// Need test components befor they get too many to overview

describe("<TextArea />", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("Render default", () => {
    const { container } = renderIntoMain(() => (
      <TextArea
        name="textArea"
        label="text area"
        rows={10}
        errors={[]}
        onValue={() => {}}
      />
    ));

    expect(container).toBeDefined();
  });
});
