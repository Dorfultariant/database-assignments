import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
// import { AppError } from "../utils/errors";
import {
  getSpecificSongs,
  getAllSongs
} from "../services/protected.service";

export async function helloThere(req: AuthenticatedRequest, res: Response) {
  res.status(200).json({ msg: "Hello There but from protected!" });
}

export async function getSongsFromDatabase(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { data } = req.body;
    // || typeof Data !== "object"
    // Essentially, if the request does not contain specifying information, we can return all available data
    let results;
    if (!data) {
      // throw new AppError("", 400);
      results = await getAllSongs();
    } else {
      results = await getSpecificSongs(data);
    }

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}
