import { cleanInput } from "./repl";
import { describe, it, expect, beforeEach, afterEach, test } from "vitest";
import { Cache } from "./pokecache.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "   spaced    out   ",
    expected: ["spaced", "out"],
  },
  {
    input: "single",
    expected: ["single"],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "one   two   three",
    expected: ["one", "two", "three"],
  },
  {
    input: "\n new \t line ",
    expected: ["new", "line"],
  },
  {
    input: "HELLO WORLD",
    expected: ["hello", "world"],
  },
  {
    input: "MiXeD CaSe InPut",
    expected: ["mixed", "case", "input"],
  },
  {
    input: "  UPPER   lower  MiXeD  ",
    expected: ["upper", "lower", "mixed"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});

describe("Cache", () => {
  let cache: Cache;

  afterEach(() => {
    cache?.stopReapLoop();
  });

  it("should store and retrieve string values", () => {
    cache = new Cache(1000);
    cache.add("key1", "value1");
    const val = cache.get<string>("key1");
    expect(val).toBe("value1");
  });

  it("should store and retrieve object values", () => {
    cache = new Cache(1000);
    const obj = { foo: "bar" };
    cache.add("objKey", obj);
    const val = cache.get<typeof obj>("objKey");
    expect(val).toEqual(obj);
  });

  it("should return undefined for missing keys", () => {
    cache = new Cache(1000);
    const val = cache.get("missing");
    expect(val).toBeUndefined();
  });

  it("should reap expired entries", async () => {
    cache = new Cache(200);
    cache.add("temp", "data");
    expect(cache.get("temp")).toBe("data");

    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(cache.get("temp")).toBeUndefined();
  });

  it("should handle multiple entries with different intervals", async () => {
    const entries = [
      { key: "a", val: "valA", interval: 100 },
      { key: "b", val: "valB", interval: 300 },
    ];

    for (const e of entries) {
      const c = new Cache(e.interval);
      c.add(e.key, e.val);
      expect(c.get(e.key)).toBe(e.val);

      await new Promise((resolve) => setTimeout(resolve, e.interval + 200));
      expect(c.get(e.key)).toBeUndefined();

      c.stopReapLoop();
    }
  });

  it("should not reap entries if stopReapLoop is called", async () => {
    cache = new Cache(100);
    cache.add("stay", "here");
    cache.stopReapLoop();

    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(cache.get("stay")).toBe("here");
  });

  it("should handle empty string key", () => {
    cache = new Cache(1000);
    cache.add("", "empty");
    expect(cache.get("")).toBe("empty");
  });

  it("should handle undefined/null values", () => {
    cache = new Cache(1000);
    cache.add("undef", undefined);
    cache.add("nul", null);

    expect(cache.get("undef")).toBeUndefined();
    expect(cache.get("nul")).toBeNull();
  });

  it("should correctly reap many entries", async () => {
    cache = new Cache(100);
    for (let i = 0; i < 50; i++) {
      cache.add(`key${i}`, `val${i}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    for (let i = 0; i < 50; i++) {
      expect(cache.get(`key${i}`)).toBeUndefined();
    }
  });
});


