import { describe, it, expect } from "@jest/globals";

import { HttpError } from "../../utils/errors";

describe("HttpError", () => {
  it("stores status, message, and optional details", () => {
    const details = { field: "name" };
    const error = new HttpError(400, "Invalid input", details);

    expect(error).toBeInstanceOf(Error);
    expect(error.status).toBe(400);
    expect(error.message).toBe("Invalid input");
    expect(error.details).toEqual(details);
  });

  it("defaults details to undefined when not provided", () => {
    const error = new HttpError(404, "Not found");

    expect(error.details).toBeUndefined();
  });
});
