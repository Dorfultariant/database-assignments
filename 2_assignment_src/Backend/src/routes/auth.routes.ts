import { Router } from "express";
import {
  loginPassword
} from "../controllers/auth.controller";

import { verifyEmail, verifyPassword } from "../middleware/auth.validator";
import { validate } from "../middleware/validate";

const router: Router = Router();

router.post("/login", verifyEmail, verifyPassword, validate, loginPassword);

export default router;
