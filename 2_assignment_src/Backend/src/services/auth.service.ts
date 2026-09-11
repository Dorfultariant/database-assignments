import { AppError } from "../utils/errors";
import argon2 from "argon2";

import db from "../database/helpers";

// export async function registerPassword(email: string, password: string) {
//   const normalizedEmail = email.trim().toLowerCase();
//   if (!(normalizedEmail.length > 0)) {
//     throw new AppError("Email is too short, provide valid email.", 400);
//   }
//   const user = await db.getUserByEmail(normalizedEmail);
//
//   if (user) {
//     throw new AppError("Account already exists. Use login instead.", 409);
//   }
//
//   const passwordHash = await argon2.hash(password);
//   return await db.createUserWithPassword(normalizedEmail, passwordHash);
// }
//

export async function loginPassword(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.getUserByEmail(normalizedEmail);

  // If the user does not exist, lets just create it
  if (!user) {
    const passwordHash = await argon2.hash(password);
    return await db.createUserWithPassword(normalizedEmail, passwordHash);
  }

  // if (!user?.passwordHash) {
  //   throw new AppError("Invalid email or password.", 401);
  // }
  //
  const verified = await argon2.verify(password, user.passwordHash);
  if (!verified) {
    throw new AppError("Invalid email or password.", 401);
  }

  return user;
}

// Used for the authentication for controller, its not best but should suffice for error logging.
export async function getUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return await db.getUserByEmail(normalizedEmail);
}

