import { postJSON } from "../services/authService";
import type { GigBandOrgModel } from "../models/models";

// TODO: We actually do need this for the gig database as well 
// export async function addUpdateBand(bandname: string, description: string) {
//   return postJSON("/protected/addUpdateBand", { bandname, description, });
// }

export async function getAllGigs(): Promise<GigBandOrgModel[]> {
  return postJSON("/protected/gig-band-org", {});
}

/* Theoretically a possibility with a great questioning... yes yes */
// export async function getSpecificSongs(data: SongModel): Promise<SongModel[]> {
//   return postJSON("/protected/songs", data);
// }

