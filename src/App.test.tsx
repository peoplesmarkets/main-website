import { assert, describe, expect, test } from "vitest";

import App, {
  buildPath,
  getPathSegments,
  isSubPath,
  removeLeadingSlash,
  removeTralingSlash,
} from "./App";
import { renderIntoRoot } from "./lib/testing";

describe("App rendering", () => {
  test("Render '<App />' inside all providers : ok", () => {
    const app = renderIntoRoot(() => <App />, {});

    expect(app).toBeDefined();
  });
});

describe("buildPath", () => {
  function testBuildPathHappy(...paths: string[]) {
    let res;
    try {
      res = buildPath(...paths);
    } catch (err) {
      expect(err).toBeUndefined();
    }
    return res;
  }

  test("'/'", () => {
    const res = testBuildPathHappy("/");
    expect(res).toEqual("/");
  });
  test("'/' + 'first'", () => {
    const res = testBuildPathHappy("/", "first");
    expect(res).toEqual("/first");
  });
  test("with leading slash in subpath", () => {
    const res = testBuildPathHappy("/", "/first");
    expect(res).toEqual("/first");
  });
  test("with traling slash in subpath", () => {
    const res = testBuildPathHappy("/", "first/");
    expect(res).toEqual("/first");
  });
  test("with leading and traling slash in subpath", () => {
    const res = testBuildPathHappy("/", "/first/");
    expect(res).toEqual("/first");
  });
  test("with multiple segments", () => {
    const res = testBuildPathHappy("/", "/first/", "/second", "third");
    expect(res).toEqual("/first/second/third");
  });
});

describe("removeLeadingSlash", () => {
  function testRemoveLeadingSlashHappy(path: string) {
    let res;
    try {
      res = removeLeadingSlash(path);
    } catch (err) {
      expect(err).toBeUndefined();
    }
    return res;
  }

  test("'/'", () => {
    const res = testRemoveLeadingSlashHappy("/");
    expect(res).toEqual("/");
  });
  test("without leading slash", () => {
    const res = testRemoveLeadingSlashHappy("first");
    expect(res).toEqual("first");
  });
  test("with leading slash", () => {
    const res = testRemoveLeadingSlashHappy("/first");
    expect(res).toEqual("first");
  });
  test("with leading and traling slash", () => {
    const res = testRemoveLeadingSlashHappy("/first/");
    expect(res).toEqual("first/");
  });
});

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
