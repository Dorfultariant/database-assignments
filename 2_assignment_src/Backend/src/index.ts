import express from "express";
import cors from "cors";
import type { Express } from "express";

// NOTE: Add routes from "routes/" here:
import authorizationRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";

import errorHandler from "./middleware/error.middleware";

const app: Express = express();

// Json support
app.use(express.json());

// Cross origin resource sharing support
app.use(cors());

// NOTE: Use the routes from "routes/" here:
// When unsure, use ALL...
app.use("/api/auth", authorizationRoutes);
app.use("/api/protected", protectedRoutes);


const port = process.env.PORT || 3001;

app.use(express.json());

app.use(errorHandler);

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello there!" });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
