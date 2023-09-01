import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, noOp, renderIntoRoot } from "../../lib/testing";
import { ActionButton } from "./ActionButton";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { DiscardConfirmation } from "./DiscardConfirmation";
import { Message } from "./Message";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";

/**
 * Render to check if objects are accessed correctly
 */
describe("Render once", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  test("ActionButton", () => {
    const { container } = renderIntoRoot(() => (
      <ActionButton actionType="active" onClick={noOp}>
        <></>
      </ActionButton>
    ));
    expect(container).toBeDefined();
  });
  test("DeleteConfirmation", () => {
    const { container } = renderIntoRoot(() => (
      <DeleteConfirmation
        item=""
        itemName=""
        onCancel={noOp}
        onConfirmation={noOp}
      />
    ));
    expect(container).toBeDefined();
  });
  test("DiscardConfirmation", () => {
    const { container } = renderIntoRoot(() => (
      <DiscardConfirmation onCancel={noOp} onDiscard={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("Message", () => {
    const { container } = renderIntoRoot(() => (
      <Message title="" onClose={noOp}>
        <></>
      </Message>
    ));
    expect(container).toBeDefined();
  });
  test("TextArea", () => {
    const { container } = renderIntoRoot(() => (
      <TextArea errors={[]} label="" name="" onValue={noOp} rows={3} />
    ));
    expect(container).toBeDefined();
  });
  test("TextField", () => {
    const { container } = renderIntoRoot(() => (
      <TextField errors={[]} label="" name="" onValue={() => {}} />
    ));
    expect(container).toBeDefined();
  });
});