import { assert, describe, expect, test } from "vitest";
import { trimLines } from "./Multiline";

describe("Multiline", () => {
  describe("trimLines", () => {
    function testTrimLinesHappy(
      lines: string[] | undefined,
      max: number | undefined
    ) {
      let res;
      try {
        res = trimLines(lines, max);
      } catch (err) {
        expect(err).toBeUndefined();
      }
      return res;
    }

    test("empty, no max", () => {
      const res = testTrimLinesHappy([], undefined);
      expect(res).toEqual([]);
    });
    test("single line, no max", () => {
      const res = testTrimLinesHappy(["first"], undefined);
      expect(res).toEqual(["first"]);
    });
    test("multiple lines, no max", () => {
      const res = testTrimLinesHappy(["first", "second"], undefined);
      expect(res).toEqual(["first", "second"]);
    });

    test("empty, with max", () => {
      const res = testTrimLinesHappy([], 2);
      expect(res).toEqual([]);
    });
    test("single line, with max", () => {
      const res = testTrimLinesHappy(["first"], 2);
      expect(res).toEqual(["first"]);
    });
    test("max match lines count", () => {
      const res = testTrimLinesHappy(["first", "second"], 2);
      expect(res).toEqual(["first", "second"]);
    });
    test("max more than lines count", () => {
      const res = testTrimLinesHappy(["first", "second"], 3);
      expect(res).toEqual(["first", "second"]);
    });
    test("max less than lines count", () => {
      const res = testTrimLinesHappy(["first", "second", "third"], 2);
      expect(res).toEqual(["first", "..."]);
    });
    test("max less than lines count empty lines at the end", () => {
      const res = testTrimLinesHappy(["first", "", ""], 2);
      expect(res).toEqual(["first"]);
    });
    test("max less than lines count empty line in between", () => {
      const res = testTrimLinesHappy(["first", "", "third"], 2);
      expect(res).toEqual(["first", "..."]);
    });
    test("max less than lines count empty line at the end", () => {
      const res = testTrimLinesHappy(["first", "second", ""], 2);
      expect(res).toEqual(["first", "second"]);
    });
  });
});
