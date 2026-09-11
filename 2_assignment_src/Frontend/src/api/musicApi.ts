import { postJSON } from "../services/authService";
import type { SongModel } from "../models/models";

export async function addUpdateBand(bandname: string, description: string) {
  return postJSON("/protected/addUpdateBand", { bandname, description, });
}

export async function getAllSongs(): Promise<SongModel[]> {
  return postJSON("/protected/songs", {});
}

/* Theoretically a possibility with a great questioning... yes yes */
export async function getSpecificSongs(data: SongModel): Promise<SongModel[]> {
  return postJSON("/protected/songs", data);
}

