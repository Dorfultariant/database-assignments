// Import the db connections
import { authDb } from "./db";
import { musicDb } from "./db";
import { gigsDb } from "./db";
import type { UserModel, SongModel, AlbumModel, BandModel, GigModel, OrganizerModel, LikedModel } from "./models";

/* Mappers for each SQL table to Typecript model */
function mapUser(row: Record<string, unknown>): UserModel {
  return {
    userId: row.id as number,
    email: String(row.email),
    passwordHash: String(row.password_hash),
    creationDate: row.creation_date as Date,
  };
}

function mapSong(row: Record<string, unknown>): SongModel {
  return {
    songId: row.song_id as number,
    songName: String(row.songname),
    songType: String(row.songtype),
    mood: String(row.mood),
    fkAlbumId: row.fk_album as number,
  };
}

function mapBand(row: Record<string, unknown>): BandModel {
  return {
    bandId: row.band_id as number,
    bandName: String(row.bandname),
    genre: String(row.genre),
    description: String(row.mood),
    website: String(row.website),
    createdAt: row.created_at as Date
  };
}

function mapAlbum(row: Record<string, unknown>): AlbumModel {
  return {
    albumId: row.album_id as number,
    albumName: String(row.album_name),
    fkBandId: row.fk_band as number,
  };
}

function mapLiked(row: Record<string, unknown>): LikedModel {
  return {
    fkSong: row.fk_song as number,
    userId: row.user_id as number,
    likedId: row.liked_id as number
  };
}

export default {
  async getUserByEmail(email: string): Promise<UserModel | null> {
    const res = await authDb.query(
      "SELECT * FROM app.user WHERE email = $1",
      [email],
    );

    return res.rows[0] ? mapUser(res.rows[0]) : null;
  },

  async getUserByID(user_id: number): Promise<UserModel | null> {
    const res = await authDb.query(
      "SELECT * FROM app.user WHERE user_id = $1",
      [user_id],
    );

    return res.rows[0] ? mapUser(res.rows[0]) : null;
  },

  async createUserWithPassword(
    email: string,
    passwordHash: string,
  ): Promise<UserModel> {
    const res = await authDb.query(
      `INSERT INTO app.user (email, password_hash)
       VALUES ($1, $2)
       RETURNING *`,
      [email, passwordHash],
    );

    if (!res.rows[0]) {
      throw new Error("Database returned no rows");
    }

    return mapUser(res.rows[0]);
  },

  async updateUserPassword(
    userId: number,
    passwordHash: string,
  ): Promise<void> {
    await authDb.query(
      `UPDATE app.user
       SET password_hash = $1
       WHERE id = $2`,
      [passwordHash, userId],
    );
  },

  async createBand(bandname: string, genre: string, desc: string, website: string): Promise<BandModel> {
    const res = await musicDb.query(
      `
      INSERT INTO app.band (bandname, genre, description, website) VALUES ($1,$2,$3,$4) RETURNING *
      `, [bandname, genre, desc, website]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return mapBand(res.rows[0]);
  },

  async getBands(band_id: number, bandname: string, genre: string): Promise<BandModel[]> {
    const res = await musicDb.query(
      `
      SELECT * FROM app.band WHERE band_id = $1 OR bandname = $2 OR genre = $3 
      `, [band_id, bandname, genre]);
    // if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return res.rows.map(mapBand);
  },

  async updateBand(bandid: number, bandname: string, genre: string, desc: string, website: string): Promise<BandModel> {
    const res = await musicDb.query(
      `
      UPDATE app.band SET (bandname, genre, description, website) = ($2,$3,$4,$5) 
      WHERE band_id = $1 
      RETURNING *
      `, [bandid, bandname, genre, desc, website]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return mapBand(res.rows[0]);
  },

  async createAlbum(bandid: number, album_name: string, release_date: Date): Promise<AlbumModel> {
    const res = await musicDb.query(
      `
      INSERT INTO app.album (album_name, release_date, fk_band) VALUES ($1,$2,$3) RETURNING *
      `, [album_name, release_date, bandid]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return mapAlbum(res.rows[0]);
  },

  async getAlbums(album_id: number, band_id: number, album_name: string): Promise<AlbumModel[]> {
    const res = await musicDb.query(
      `
      SELECT * FROM app.album 
      WHERE album_id = $1 OR fk_band = $2 OR album_name = $3
      `, [album_id, band_id, album_name]);
    // if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return res.rows.map(mapAlbum);
  },

  async createSong(album_id: number, songname: string, songtype: string, mood: string, release_date: Date): Promise<SongModel> {
    const res = await musicDb.query(
      `
      INSERT INTO app.song (songname, songtype, mood, fk_album, release_date) VALUES ($1,$2,$3,$4,$5) RETURNING *
      `, [songname, songtype, mood, album_id, release_date]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return mapSong(res.rows[0]);
  },

  async getSongs(song_id: number, songname: string, songtype: string, mood: string): Promise<SongModel[]> {
    const res = await musicDb.query(
      `
      SELECT * FROM app.song WHERE song_id = $1 OR songname = $2 OR songtype = $3 OR mood = $4
      `, [song_id, songname, songtype, mood]);
    // if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    // Map each found song to a list of songmodels
    return res.rows.map(mapSong);
  },

  async queryAllSongs(): Promise<SongModel[]> {
    const res = await musicDb.query(`SELECT * FROM app.song`);
    // if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    // Map each found song to a list of songmodels
    return res.rows.map(mapSong);
  },


  async likeSong(song_id: number, user_id: number): Promise<LikedModel> {
    const res = await musicDb.query(
      `
      INSERT INTO app.liked (fk_song, user_id) VALUES ($1,$2) RETURNING *
      `, [song_id, user_id]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return mapLiked(res.rows[0]);
  },

  async unlikeSong(song_id: number, user_id: number): Promise<void> {
    const res = await musicDb.query(
      `
      DELETE FROM app.liked WHERE song_id = $1 AND user_id = $2 RETURNING *
      `, [song_id, user_id]);
    if (!res.rows[0]) { throw new Error("Database returned no rows"); }
    return res.rows[0];
  },

};

