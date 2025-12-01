import { Request, Response, NextFunction } from "express";
import { getSound } from "../services/sound.service";

export async function getSoundById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sound = await getSound(req, res, next);

    res.json(sound);
  } catch (err) {
    next(err);
  }
}
