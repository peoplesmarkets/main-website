import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { ActionButton } from "./ActionButton";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { DiscardConfirmation } from "./DiscardConfirmation";
import { Message } from "./Message";
import { Select } from "./Select";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";
import { PriceField } from "./PriceField";

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
  test("PriceField", () => {
    const { container } = renderIntoRoot(() => (
      <PriceField name="" label="" errors={[]} onValue={noOp} />
    ));
    expect(container).toBeDefined();
  });
  test("Select", () => {
    const { container } = renderIntoRoot(() => (
      <Select
        label=""
        value={getNoObj}
        onValue={noOp}
        options={getNoObj}
        nullable
      />
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
      <TextField errors={[]} label="" name="" onValue={noOp} />
    ));
    expect(container).toBeDefined();
  });
});
