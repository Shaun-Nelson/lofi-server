import { Request, Response, NextFunction } from "express";
import MixModel from "../models/Mix";

export async function getMix(req: Request, res: Response, next: NextFunction) {
  try {
    const mix = await MixModel.findById(req.body._id);

    return mix;
  } catch (err) {
    next(err);
  }
}
