import { Request, Response, NextFunction } from "express";
import MixModel from "../models/Mix";

export async function getMix(req: Request, res: Response, next: NextFunction) {
  try {
    const mix = await MixModel.find(req.body.name);

    return mix;
  } catch (err) {
    next(err);
  }
}

export async function createMix(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newMix = await MixModel.create(req.body);

    return newMix;
  } catch (err) {
    next(err);
  }
}
