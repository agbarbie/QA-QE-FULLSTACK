import { validateUsername, getUsername, parseValue, calculateArea,hasKey} from "./1.unions";

describe("validateUsername", () => {
  it("should return true for valid usernames", () => {
    expect(validateUsername("Matt1234")).toBe(true);
    expect(validateUsername("Alice")).toBe(false);
    expect(validateUsername("Bob")).toBe(false);
  });
});

describe("getUsername", () => {
  it("should return a formatted username or Guest", () => {
    expect(getUsername("Alice")).toBe("User: Alice");
    expect(getUsername(null)).toBe("Guest");
  });
});

describe("parseValue", () => {
  it("should handle a { data: { id: string } } object", () => {
    const result = parseValue({
      data: {
        id: "123",
      },
    });

    expect(result).toBe("123");
  });

  it("should throw an error for invalid inputs", () => {
    expect(() => parseValue("123")).toThrow("Parsing error!");
    expect(() => parseValue(123)).toThrow("Parsing error!");
  });
});

describe("calculateArea", () => {
  it("should calculate the area of a circle", () => {
    const result = calculateArea({
      kind: "circle",
      radius: 5,
    });

    expect(result).toBeCloseTo(78.54, 2); // Floating-point precision
  });

  it("should calculate the area of a square", () => {
    const result = calculateArea({
      kind: "square",
      sideLength: 4,
    });

    expect(result).toBe(16);
  });
});

it("Should work on string keys", () => {
  const obj = {
    foo: "bar",
  };

  expect(hasKey(obj, "foo")).toBe(true);
  expect(hasKey(obj, "bar")).toBe(false);
});

it("Should work on number keys", () => {
  const obj = {
    1: "bar",
  };

  expect(hasKey(obj, 1)).toBe(true);

  expect(hasKey(obj, 2)).toBe(false);

});

