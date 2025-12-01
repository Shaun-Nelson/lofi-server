import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import type { Request, Response, NextFunction } from "express";

const findMock = jest.fn();

jest.mock("../../models/Sound", () => ({
  __esModule: true,
  default: {
    find: findMock,
  },
}));

import SoundModel from "../../models/Sound";
import { getSound } from "../../services/sound.service";

describe("sound service", () => {
  const req = { body: { id: "rain" } } as Partial<Request>;
  const res = {} as Partial<Response>;
  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retrieves a sound by id using the model", async () => {
    findMock.mockResolvedValueOnce({ id: "rain", name: "Rain" } as never);

    const result = await getSound(req as Request, res as Response, next);

    expect(findMock).toHaveBeenCalledWith("rain");
    expect(result).toEqual({ id: "rain", name: "Rain" });
    expect(next).not.toHaveBeenCalled();
  });

  it("forwards errors to next", async () => {
    const error = new Error("db failure");
    findMock.mockRejectedValueOnce(error as never);

    await getSound(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
