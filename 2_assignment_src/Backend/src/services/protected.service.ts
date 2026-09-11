// Global error class
import { AppError } from "../utils/errors";

import type { BandModel, SongModel } from "../database/models.ts";
import db from "../database/helpers";

export async function addBandToDatabase(data: BandModel | any): Promise<BandModel> {
  if (!data || typeof data !== "object") {
    throw new AppError("Invalid music data.", 400);
  }
  const band = await db.createBand(data.bandName, data.genre, data.description, data.website);
  if (!band) { throw new AppError("Could not add band.", 400); }

  return band;
}


export async function getAllSongs(): Promise<SongModel[]> {
  return await db.queryAllSongs();
}

export async function getSpecificSongs(data: SongModel | any): Promise<SongModel[]> {
  if (!data) throw new AppError("No query information given");
  return await db.getSongs(data.songId, data.songname, data.songtype, data.mood);
}

