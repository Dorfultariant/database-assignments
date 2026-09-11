export type UserModel = {
  userId: number;
  email: string;
  passwordHash: string;
  creationDate: Date;
};

export type BandModel = {
  bandId: number;
  bandName: string;
  genre: string;
  description: string;
  website?: string | null;
  createdAt: Date;
};

export type AlbumModel = {
  albumId: number;
  albumName: string;
  fkBandId: number;
};

export type SongModel = {
  songId: number;
  songName: string;
  songType?: string | null;
  mood?: string | null;
  fkAlbumId: number;
};

export type GigModel = {
  gigId: number;
  country: string;
  city: string;
  address: string;
  ticket_price?: number | null;
  event_date: Date;
  creation_date: Date;
  fkBand: number;
  fkOrganizer: number;
};

export type OrganizerModel = {
  organizerId: number;
  orgName: string;
  description: string;
  joined: Date;
};

export type LikedModel = {
  fkSong: number;
  userId: number;
  likedId: number;
};
