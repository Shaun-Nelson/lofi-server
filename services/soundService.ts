import { Request, Response, NextFunction } from "express";
import SoundModel from "../models/Sound";

export function getSound(req: Request, res: Response, next: NextFunction) {
  try {
    const soundId = req.body._id;
    const sound = SoundModel.findById(soundId);

    return sound;
  } catch (err) {
    next(err);
  }
}
