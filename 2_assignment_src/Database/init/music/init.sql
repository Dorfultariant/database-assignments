CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

CREATE TABLE IF NOT EXISTS app.user (
	user_id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	born DATE,
	creation_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.band (
	band_id SERIAL PRIMARY KEY,
	bandname TEXT NOT NULL,
	genre TEXT,
	description TEXT,
	website TEXT,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.album (
	album_id SERIAL PRIMARY KEY,
  album_name TEXT NOT NULL,
	fk_band INTEGER REFERENCES app.band(band_id),
	release_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS app.song (
	song_id SERIAL PRIMARY KEY,
  songname TEXT NOT NULL,
  /* E.g. Melodic, Instrumental, Lyrics, etc. */
  songtype TEXT,
  /* E.g. happy, inspirational, sad, focus ... */
  mood TEXT, 
	fk_album INTEGER REFERENCES app.album(album_id),
	release_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS app.liked (
	fk_song INTEGER REFERENCES app.song(song_id) ON DELETE CASCADE,
	fk_user INTEGER REFERENCES app.user(user_id) ON DELETE CASCADE
);

