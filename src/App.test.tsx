import { TransProvider } from "@mbarzda/solid-i18next";
import { Router } from "@solidjs/router";
import { render } from "@solidjs/testing-library";
import { assert, describe, expect, test } from "vitest";

import App, { getPathSegments, isSubPath, removeTralingSlash } from "./App";
import { AccessTokenProvider } from "./contexts/AccessTokensContext";
import { LOCALES } from "./locales";

describe("App rendering", () => {
  describe("removeTralingSlash", () => {
    function testRemoveTralingSlashHappy(path: string) {
      let res;
      try {
        res = removeTralingSlash(path);
      } catch (err) {
        expect(err).toBeUndefined();
      }
      return res;
    }

    test("'/'", () => {
      const res = testRemoveTralingSlashHappy("/");
      expect(res).toEqual("/");
    });
    test("without tralling slash", () => {
      const res = testRemoveTralingSlashHappy("/first");
      expect(res).toEqual("/first");
    });
    test("with tralling slash", () => {
      const res = testRemoveTralingSlashHappy("/first/");
      expect(res).toEqual("/first");
    });
  });

  describe("getPathSegments", () => {
    function testRemoveTralingSlashHappy(path: string) {
      let res;
      try {
        res = getPathSegments(path);
      } catch (err) {
        expect(err).toBeUndefined();
      }
      return res;
    }

    test("'/'", () => {
      const res = testRemoveTralingSlashHappy("/");
      expect(res).toEqual([""]);
    });
    test("without tralling slash", () => {
      const res = testRemoveTralingSlashHappy("/first");
      expect(res).toEqual(["", "first"]);
    });
    test("with tralling slash", () => {
      const res = testRemoveTralingSlashHappy("/first/");
      expect(res).toEqual(["", "first"]);
    });
    test("with multiple segments", () => {
      const res = testRemoveTralingSlashHappy("/first/second/third");
      expect(res).toEqual(["", "first", "second", "third"]);
    });
  });

  describe("isSubPath", () => {
    function testSubPathHappy(base: string, path: string) {
      let res;
      try {
        res = isSubPath(base, path);
      } catch (err) {
        expect(err).toBeUndefined();
      }
      return res;
    }

    test("root same path : false", () => {
      const res = testSubPathHappy("/", "/");
      assert(!res);
    });
    test("root more than one extra segment : false", () => {
      const res = testSubPathHappy("/", "/first/second");
      assert(!res);
    });
    test("root one extra segment : true", () => {
      const res = testSubPathHappy("/", "/first");
      assert(res);
    });

    test("same path : false", () => {
      const res = testSubPathHappy("/first", "/first");
      assert(!res);
    });
    test("more than one extra segment : false", () => {
      const res = testSubPathHappy("/first", "/first/second/third");
      assert(!res);
    });
    test("different base : false", () => {
      const res = testSubPathHappy("/first", "/other/second");
      assert(!res);
    });
    test("one extra segment : true", () => {
      const res = testSubPathHappy("/first", "/first/second");
      assert(res);
    });
  });

  test("Render '<App />' inside all providers : ok", () => {
    const app = render(() => {
      return (
        <Router>
          <AccessTokenProvider>
            <TransProvider options={{ resources: LOCALES }}>
              <App />
            </TransProvider>
          </AccessTokenProvider>
        </Router>
      );
    });

    expect(app).toBeDefined();
  });
});
