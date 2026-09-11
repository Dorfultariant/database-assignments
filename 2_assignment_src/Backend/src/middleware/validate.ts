import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/errors";

/**
 * Validation result handler for express-validator middleware chains.
 */
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Array of errors but for now take the first
    const first = errors.array()[0];
    const msg = first?.msg ?? "Error could not be defined.";
    throw new AppError(msg, 400);
  }
  next();
}
