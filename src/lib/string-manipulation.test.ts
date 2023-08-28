import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { cleanupDOM, createDOM, expectNoError } from "./testing";
import {
  encodeArrayBufferToBase64Url,
  getInitials,
  parseJwtPayload,
} from "./string-manipulation";

describe("string-manipulation", () => {
  beforeEach(createDOM);
  afterEach(cleanupDOM);

  describe("encodeArrayBufferToBase64Url", () => {
    test("encode empty ArrayBuffer : ok", () => {
      const buffer = new ArrayBuffer(0);
      let res;
      try {
        res = encodeArrayBufferToBase64Url(buffer);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("");
    });
  });

  describe("parseJwtPayload", () => {
    test("encode JWT payload : ok", () => {
      const payload =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      let res;
      try {
        res = parseJwtPayload(payload);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toHaveProperty("sub");
      expect(res).toHaveProperty("name");
      expect(res).toHaveProperty("iat");
    });
  });

  describe("getInitials", () => {
    test("Get initials for single name : ok", () => {
      const name = "Name";
      let res;
      try {
        res = getInitials(0, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(1, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(2, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
    });

    test("Get initials for two names : ok", () => {
      const name = "Name Last";
      let res;
      try {
        res = getInitials(0, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(1, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("N");
      try {
        res = getInitials(2, name);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("NL");
    });
  });
});
