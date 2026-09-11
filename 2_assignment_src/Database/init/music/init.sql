CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

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
  /* E.g. Melodic, Instrumental, Lyrics, etc. These should probably be select-from-list rather than custom */
  songtype TEXT,
  /* E.g. happy, inspirational, sad, focus ... */
  mood TEXT, 
	fk_album INTEGER REFERENCES app.album(album_id),
	release_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS app.liked (
	fk_song INTEGER REFERENCES app.song(song_id) ON DELETE CASCADE,
  /* I am not entirely sure how this should be done, but I want to test whether linking logically to the
    authentication database user table (id) could work for this music database, this way there is a way to
    'join' the tables to e.g. see other users liked songs, without duplicating the user tables (though it could 
    provide a different database synchronization practice)
  I suppose this would be a bad idea for production environment...
  */
	user_id INTEGER NOT NULL, 
  PRIMARY KEY (fk_song, user_id)
);

/* At last, the actual data for one of the databases, e.g. Music */
/* Most taken from Wikipedia, band websites and what I thought to fit */

INSERT INTO app.band (bandname, genre, description, website)
VALUES
(
    'Amorphis',
    'Progressive metal / Melodic death metal',
    'Finnish melodic death metal band with songs about Finnish mythology.',
    'https://amorphis.net/'
),
(
    'Kalmah',
    'Melodic death metal / Power metal',
    'Finnish melodic death metal band with melodic guitar riffs and some keyboard action.',
    'https://www.kalmah.com/'
),
(
    'Avantasia',
    'Symphonic metal / Power metal',
    'German metal band known for its metal n opera format with some quest players.',
    'https://avantasia.com/'
),
(
    'Insomnium',
    'Melodic death metal',
    'Finnish melodic death metal band known for atmospheric melodies and melancholic themes.',
    'https://www.insomnium.net/'
);

INSERT INTO app.album (
    album_name,
    fk_band,
    release_date
)
SELECT
    'Tales from the Thousand Lakes',
    band_id,
    DATE '1994-07-12'
FROM app.band
WHERE bandname = 'Amorphis';

INSERT INTO app.album (
    album_name,
    fk_band,
    release_date
)
SELECT
    'Swamplord',
    band_id,
    DATE '2000-11-01'
FROM app.band
WHERE bandname = 'Kalmah';


INSERT INTO app.album (
    album_name,
    fk_band,
    release_date
)
SELECT
    'The Metal Opera',
    band_id,
    DATE '2001-01-22'
FROM app.band
WHERE bandname = 'Avantasia';


INSERT INTO app.album (
    album_name,
    fk_band,
    release_date
)
SELECT
    'Since the Day It All Came Down',
    band_id,
    DATE '2004-04-05'
FROM app.band
WHERE bandname = 'Insomnium';

INSERT INTO app.song (
    songname,
    songtype,
    mood,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    songs.songtype,
    songs.mood,
    album.album_id,
    DATE '1994-07-12'
FROM (
    VALUES
        ('Thousand Lakes',       'Instrumental', 'Atmospheric'),
        ('Into Hiding',          'Lyrics',      'Dark'),
        ('The Castaway',         'Lyrics',      'Melancholic'),
        ('First Doom',           'Lyrics',      'Dark'),
        ('Black Winter Day',     'Lyrics',      'Melancholic'),
        ('Drowned Maid',         'Lyrics',      'Dark'),
        ('In the Beginning',     'Lyrics',      'Atmospheric'),
        ('Forgotten Sunrise',    'Lyrics',      'Melancholic'),
        ('To Fathers Cabin',     'Lyrics',      'Reflective'),
        ('Magic and Mayhem',     'Lyrics',      'Energetic')
) AS songs(songname, songtype, mood)
JOIN app.album album
    ON album.album_name = 'Tales from the Thousand Lakes'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Amorphis';

INSERT INTO app.song (
    songname,
    songtype,
    mood,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    songs.songtype,
    songs.mood,
    album.album_id,
    DATE '2000-11-01'
FROM (
    VALUES
        ('Evil in You',              'Lyrics', 'Aggressive'),
        ('Withering Away',           'Lyrics', 'Dark'),
        ('Heritance of Berija',      'Lyrics', 'Dark'),
        ('Black Roija',              'Lyrics', 'Aggressive'),
        ('Dance of the Water',       'Lyrics', 'Atmospheric'),
        ('Hades',                    'Lyrics', 'Dark'),
        ('Alteration',               'Lyrics', 'Energetic'),
        ('Using the Word',           'Lyrics', 'Aggressive'),
        ('The Blind Leader',         'Lyrics', 'Dark'),
        ('Vezidoroga',               'Lyrics', 'Atmospheric')
) AS songs(songname, songtype, mood)
JOIN app.album album
    ON album.album_name = 'Swamplord'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Kalmah';


INSERT INTO app.song (
    songname,
    songtype,
    mood,
    fk_album,
    release_date
)

SELECT
    songs.songname,
    songs.songtype,
    songs.mood,
    album.album_id,
    DATE '2001-01-22'
FROM (
    VALUES
        ('Prelude',                'Instrumental', 'Atmospheric'),
        ('Reach Out for the Light','Lyrics',      'Epic'),
        ('Serpents in Paradise',   'Lyrics',      'Dark'),
        ('Malleus Maleficarum',    'Lyrics',      'Dark'),
        ('Breaking Away',          'Lyrics',      'Energetic'),
        ('Farewell',               'Lyrics',      'Melancholic'),
        ('The Glory of Rome',      'Lyrics',      'Epic'),
        ('In Nomine Patris',       'Instrumental', 'Atmospheric'),
        ('Avantasia',              'Lyrics',      'Epic'),
        ('A New Dimension',        'Instrumental', 'Atmospheric'),
        ('Inside',                 'Lyrics',      'Reflective'),
        ('Sign of the Cross',      'Lyrics',      'Epic'),
        ('The Tower',              'Lyrics',      'Epic')
) AS songs(songname, songtype, mood)
JOIN app.album album
    ON album.album_name = 'The Metal Opera'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Avantasia';

INSERT INTO app.song (
    songname,
    songtype,
    mood,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    songs.songtype,
    songs.mood,
    album.album_id,
    DATE '2004-04-05'
FROM (
    VALUES
        ('Nocturne',                'Instrumental', 'Atmospheric'),
        ('The Day It All Came Down', 'Lyrics',      'Melancholic'),
        ('Daughter of the Moon',    'Lyrics',      'Melancholic'),
        ('The Moment of Reckoning','Lyrics',       'Dark'),
        ('Bereavement',             'Lyrics',      'Melancholic'),
        ('Under the Plaintive Sky', 'Lyrics',      'Atmospheric'),
        ('Resonance',               'Instrumental', 'Atmospheric'),
        ('Death Walked the Earth',  'Lyrics',      'Dark'),
        ('Disengagement',           'Lyrics',      'Melancholic'),
        ('Closing Words',            'Lyrics',      'Reflective'),
        ('Song of the Forlorn Son', 'Lyrics',      'Melancholic')
) AS songs(songname, songtype, mood)
JOIN app.album album
    ON album.album_name = 'Since the Day It All Came Down'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Insomnium';
