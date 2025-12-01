import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";

const getSoundMock = jest.fn();

jest.mock("../../services/sound.service", () => ({
  __esModule: true,
  getSound: getSoundMock,
}));

import { getSound } from "../../services/sound.service";
import { getSoundById } from "../../controllers/sound.controller";

describe("sound controller", () => {
  const req = { body: { id: "rain" } } as Partial<Request>;
  const json = jest.fn();
  const res = { json } as Partial<Response>;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("responds with sound payload from service", async () => {
    getSoundMock.mockResolvedValueOnce({ id: "rain" } as never);

    await getSoundById(req as Request, res as Response, next);

    expect(getSoundMock).toHaveBeenCalledWith(req as Request, res as Response, next);
    expect(json).toHaveBeenCalledWith({ id: "rain" });
    expect(next).not.toHaveBeenCalled();
  });

  it("delegates errors to next", async () => {
    const error = new Error("service failed");
    getSoundMock.mockImplementationOnce(() => {
      throw error;
    });

    await getSoundById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
