import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

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
