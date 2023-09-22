import { afterEach, beforeEach, describe, expect, test } from "vitest";

import {
  base64ToUtf8,
  encodeArrayBufferToBase64Url,
  getInitials,
  parseJwtPayload,
  utf8ToBase64,
} from "./string-manipulation";
import { cleanupDOM, createDOM, expectNoError } from "./testing";

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

  describe("base64ToUtf8", () => {
    test("decode symbols : ok", () => {
      const base64 = "YSDEgCDwkICAIOaWhyDwn6aE";
      let res;
      try {
        res = base64ToUtf8(base64);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("a Ā 𐀀 文 🦄");
    });
  });

  describe("utf8ToBase64", () => {
    test("encode symbols : ok", () => {
      const utf8 = "a Ā 𐀀 文 🦄";
      let res;
      try {
        res = utf8ToBase64(utf8);
      } catch (err) {
        expectNoError(err);
      }
      expect(res).toEqual("YSDEgCDwkICAIOaWhyDwn6aE");
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
