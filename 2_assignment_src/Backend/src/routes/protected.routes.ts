import { authenticateToken } from "../middleware/auth.middleware";
import { helloThere, getSongsFromDatabase, getGigBandOrgFromDatabase } from "../controllers/protected.controller";
import { Router } from "express";

const router: Router = Router();

/**
 * Test endpoint to verify authentication.
 */
router.get("/hello-there", authenticateToken, helloThere);

router.post("/songs", authenticateToken, getSongsFromDatabase);

router.post("/gig-band-org", authenticateToken, getGigBandOrgFromDatabase);

export default router;
