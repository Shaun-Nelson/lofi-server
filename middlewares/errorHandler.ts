import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/errors";
import { logger } from "../utils/logger";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message =
    err instanceof HttpError ? err.message : "Internal Server Error";
  const details = err instanceof HttpError ? err.details : undefined;

  if (status >= 500) {
    logger.error(err);
  } else {
    logger.warn(`[${status}] ${message}`, details);
    logger.debug(err);
  }
  res.status(status).json({ error: message, details });
};
