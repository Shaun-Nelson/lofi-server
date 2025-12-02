import { Request, Response, NextFunction } from "express";
import SoundModel from "../models/Sound";

export async function getSound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sound = await SoundModel.findOne({ id: req.params.id });

    return sound;
  } catch (err) {
    next(err);
  }
}
