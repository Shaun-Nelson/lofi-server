import { Request, Response, NextFunction } from "express";
import { getMix, createMix } from "../services/mix.service";

// GET /api/mix/:id
export async function getMixById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mix = await getMix(req, res, next);

    res.json(mix);
  } catch (err) {
    next(err);
  }
}

// POST /api/mix
export async function postMix(req: Request, res: Response, next: NextFunction) {
  try {
    const newMix = await createMix(req, res, next);

    res.json(newMix);
  } catch (err) {
    next(err);
  }
}
