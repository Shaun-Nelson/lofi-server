import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";

const getMixMock = jest.fn();
const createMixMock = jest.fn();

jest.mock("../../services/mix.service", () => ({
  __esModule: true,
  getMix: getMixMock,
  createMix: createMixMock,
}));

import { getMix, createMix } from "../../services/mix.service";
import { getMixById, postMix } from "../../controllers/mix.controller";

describe("mix controller", () => {
  const json = jest.fn();
  const res = { json } as Partial<Response>;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns mix data from the service for GET", async () => {
    const req = { body: { name: "focus" } } as Partial<Request>;
    getMixMock.mockResolvedValueOnce({ name: "focus" } as never);

    await getMixById(req as Request, res as Response, next);

    expect(getMixMock).toHaveBeenCalledWith(req as Request, res as Response, next);
    expect(json).toHaveBeenCalledWith({ result: expect.any(Promise) });
  });

  it("delegates sync errors from GET to next", async () => {
    const req = { body: { name: "focus" } } as Partial<Request>;
    const error = new Error("failed");
    getMixMock.mockImplementationOnce(() => {
      throw error;
    });

    await getMixById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("returns created mix for POST", async () => {
    const payload = { name: "calm" };
    const req = { body: payload } as Partial<Request>;
    createMixMock.mockResolvedValueOnce(payload as never);

    await postMix(req as Request, res as Response, next);

    expect(createMixMock).toHaveBeenCalledWith(req as Request, res as Response, next);
    expect(json).toHaveBeenCalledWith({ results: payload });
    expect(next).not.toHaveBeenCalled();
  });

  it("handles POST errors via next", async () => {
    const req = { body: { name: "broken" } } as Partial<Request>;
    const error = new Error("create failed");
    createMixMock.mockRejectedValueOnce(error as never);

    await postMix(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
