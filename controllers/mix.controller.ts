import { Request, Response, NextFunction } from "express";
import { getMix, createMix } from "../services/mix.service";

// GET /api/mix/:id
export async function getMixById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mix = getMix(req, res, next);

    res.json({ result: mix });
  } catch (err) {
    next(err);
  }
}

// POST /api/mix
export async function postMix(req: Request, res: Response, next: NextFunction) {
  try {
    const newMix = await createMix(req, res, next);

    res.json({ result: newMix });
  } catch (err) {
    next(err);
  }
}
