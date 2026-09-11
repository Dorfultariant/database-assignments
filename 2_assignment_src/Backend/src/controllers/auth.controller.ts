/* API END LOGIC HERE 
* calls the business logic under ../services folder
*
* This is not necessary for the assignment 2 but as it helps with the project work most likely, might as well have it here as well.
* 
* NOTE: The following implementation utilizes a previous course "CT70A9700 Cloud Services and Infrastructure" code snippets, 
*     which can be seen in https://github.com/Jepunen/lounastutka/tree/main/Backend , (built as team project), 
*     though the Passkey authentication was removed as obsolete for this assignment
*    
* */

import type { Request, Response, NextFunction } from "express";
import * as AuthService from "../services/auth.service";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errors";

import type {
  PasswordLoginBody,
  PasswordAuthenticationResponse,
} from "./types.ts";

function signToken(userId: number, email: string) {
  const jwtSec: string = process.env.JWT_SECRET ?? "DEV_CHANGE_THIS_SECRET";
  const expires: any = process.env.JWT_EXPIRES_IN ?? "1d";
  return jwt.sign(
    { userId, email },
    jwtSec,
    { expiresIn: expires },
  );
}

export async function loginPassword(
  req: Request<unknown, PasswordLoginBody>,
  res: Response<PasswordAuthenticationResponse>,
  next: NextFunction) {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      throw new AppError("Email and password are required.", 400);
    }

    const user = await AuthService.loginPassword(email, password);
    const token = signToken(user.userId, user.email);
    return res.status(200).json({
      authenticated: true,
      token,
      user: {
        email: user.email,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
}

