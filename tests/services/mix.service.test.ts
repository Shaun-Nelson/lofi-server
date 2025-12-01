import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";

const findMock = jest.fn();
const createMock = jest.fn();

jest.mock("../../models/Mix", () => ({
  __esModule: true,
  default: {
    find: findMock,
    create: createMock,
  },
}));

import MixModel from "../../models/Mix";
import { getMix, createMix } from "../../services/mix.service";

describe("mix service", () => {
  const req = { body: { name: "focus" } } as Partial<Request>;
  const res = {} as Partial<Response>;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches a mix by name", async () => {
    findMock.mockResolvedValueOnce([{ name: "focus" }] as never);

    const result = await getMix(req as Request, res as Response, next);

    expect(findMock).toHaveBeenCalledWith("focus");
    expect(result).toEqual([{ name: "focus" }]);
    expect(next).not.toHaveBeenCalled();
  });

  it("creates a new mix", async () => {
    const payload = { name: "calm", sounds: [] };
    const createReq = { body: payload } as Partial<Request>;
    createMock.mockResolvedValueOnce(payload as never);

    const result = await createMix(createReq as Request, res as Response, next);

    expect(createMock).toHaveBeenCalledWith(payload);
    expect(result).toEqual(payload);
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors when fetching a mix", async () => {
    const error = new Error("lookup failed");
    findMock.mockRejectedValueOnce(error as never);

    await getMix(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("forwards errors when creating a mix", async () => {
    const error = new Error("save failed");
    createMock.mockRejectedValueOnce(error as never);

    await createMix(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
