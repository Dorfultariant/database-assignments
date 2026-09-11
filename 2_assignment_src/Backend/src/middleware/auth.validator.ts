import { body } from "express-validator";

export const verifyEmail = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format."),
];

export const verifyPassword = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
];
