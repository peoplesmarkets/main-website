import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  cleanupDOM,
  createDOM,
  getNoObj,
  noOp,
  renderIntoRoot,
} from "../../lib/testing";
import { ActionButton } from "./ActionButton";
import { Anotation } from "./Anotation";
import { Message } from "./Message";
import { PriceField } from "./PriceField";
import { Select } from "./Select";
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
  test("Anotation", () => {
    const { container } = renderIntoRoot(() => <Anotation>sl</Anotation>);
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
      <PriceField label="" value={0} onValue={noOp} errors={[]} />
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
      <TextArea errors={[]} label="" onValue={noOp} rows={3} />
    ));
    expect(container).toBeDefined();
  });
  test("TextField", () => {
    const { container } = renderIntoRoot(() => (
      <TextField errors={[]} label="" onValue={noOp} />
    ));
    expect(container).toBeDefined();
  });
});
