import { Request, Response, NextFunction } from "express";
import { getMix } from "../services/mix.service";

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
