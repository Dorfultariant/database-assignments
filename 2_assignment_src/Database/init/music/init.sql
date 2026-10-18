CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

CREATE TABLE IF NOT EXISTS app.band (
	band_id SERIAL PRIMARY KEY,
	bandname TEXT NOT NULL,
	genre TEXT,
	description TEXT
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
	fk_album INTEGER REFERENCES app.album(album_id),
	release_date DATE DEFAULT CURRENT_DATE
);

/* At last, the actual data for one of the databases, e.g. Music */
/* Most taken from Wikipedia, band websites and what I thought to fit */

INSERT INTO app.band (bandname, genre, description)
VALUES
(
    'Amorphis',
    'Progressive metal / Melodic death metal',
    'Finnish melodic death metal band with songs about Finnish mythology.'
),
(
    'Kalmah',
    'Melodic death metal / Power metal',
    'Finnish melodic death metal band with melodic guitar riffs and some keyboard action.'
),
(
    'Avantasia',
    'Symphonic metal / Power metal',
    'German metal band known for its metal n opera format with some quest players.'
),
(
    'Insomnium',
    'Melodic death metal',
    'Finnish melodic death metal band known for atmospheric melodies and melancholic themes.'
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
    fk_album,
    release_date
)
SELECT
    songs.songname,
    album.album_id,
    DATE '1994-07-12'
FROM (
    VALUES
        ('Thousand Lakes'),
        ('Into Hiding'),
        ('The Castaway'),
        ('First Doom'),
        ('Black Winter Day'),
        ('Drowned Maid'),
        ('In the Beginning'),
        ('Forgotten Sunrise'),
        ('To Fathers Cabin'),
        ('Magic and Mayhem')
) AS songs(songname)
JOIN app.album album
    ON album.album_name = 'Tales from the Thousand Lakes'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Amorphis';

INSERT INTO app.song (
    songname,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    album.album_id,
    DATE '2000-11-01'
FROM (
    VALUES
        ('Evil in You'),
        ('Withering Away'),
        ('Heritance of Berija'),
        ('Black Roija'),
        ('Dance of the Water'),
        ('Hades'),
        ('Alteration'),
        ('Using the Word'),
        ('The Blind Leader'),
        ('Vezidoroga')
) AS songs(songname)
JOIN app.album album
    ON album.album_name = 'Swamplord'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Kalmah';


INSERT INTO app.song (
    songname,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    album.album_id,
    DATE '2001-01-22'
FROM (
    VALUES
        ('Prelude'),
        ('Reach Out for the Light'),
        ('Serpents in Paradise'),
        ('Malleus Maleficarum'),
        ('Breaking Away'),
        ('Farewell'),
        ('The Glory of Rome'),
        ('In Nomine Patris'),
        ('Avantasia'),
        ('A New Dimension'),
        ('Inside'),
        ('Sign of the Cross'),
        ('The Tower')
) AS songs(songname)
JOIN app.album album
    ON album.album_name = 'The Metal Opera'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Avantasia';

INSERT INTO app.song (
    songname,
    fk_album,
    release_date
)
SELECT
    songs.songname,
    album.album_id,
    DATE '2004-04-05'
FROM (
    VALUES
        ('Nocturne'),
        ('The Day It All Came Down'),
        ('Daughter of the Moon'),
        ('The Moment of Reckoning'),
        ('Bereavement'),
        ('Under the Plaintive Sky'),
        ('Resonance'),
        ('Death Walked the Earth'),
        ('Disengagement'),
        ('Closing Words'),
        ('Song of the Forlorn Son')
) AS songs(songname)
JOIN app.album album
    ON album.album_name = 'Since the Day It All Came Down'
JOIN app.band band
    ON band.band_id = album.fk_band
WHERE band.bandname = 'Insomnium';
