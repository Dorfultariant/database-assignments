/*
* NOTE: USE THIS FOR PROTECTED ROUTES AS MIDDLEWARE
* */

import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Extends Express request type that includes authenticated user data.
 *
 * @property authUser: Populated when a valid JWT is provided.
 */
export type AuthenticatedRequest = Request & {
  authUser?: {
    userId: number;
    email: string;
  };
};

/**
 * Expected format for JWT payload
 */
type JwtPayload = {
  userId: number;
  email: string;
};

/**
 * Middleware does the verification for the JWT from the `Authorization` header.
 */
export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Bearer token." });
  }

  const token = authHeader.slice("Bearer ".length);
  // WARNING: PLEASE Define in .env 
  const jwtSec: string = process.env.JWT_SECRET ?? "DEV_CHANGE_THIS_SECRET";

  try {
    const payload = jwt.verify(token, jwtSec) as JwtPayload;
    req.authUser = {
      userId: payload.userId,
      email: payload.email,
    };
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}
