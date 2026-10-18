CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

CREATE TABLE IF NOT EXISTS app.band (
	band_id SERIAL PRIMARY KEY,
	bandname TEXT NOT NULL,
	genre TEXT,
	description TEXT
);

CREATE TABLE IF NOT EXISTS app.gig (
	gig_id SERIAL PRIMARY KEY,
	country TEXT NOT NULL,
	city TEXT NOT NULL,
	address TEXT NOT NULL,
	event_date DATE NOT NULL,
	fk_band INTEGER REFERENCES app.band(band_id) ON DELETE SET NULL
);

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

INSERT INTO app.gig (
    country,
    city,
    address,
    event_date,
    fk_band
)
SELECT
    'Finland',
    'Tampere',
    'Itsenäisyydenkatu 2',
    DATE '2026-10-10',
    band.band_id
FROM app.band AS band
WHERE band.bandname = 'Kalmah';

INSERT INTO app.gig (
    country,
    city,
    address,
    event_date,
    fk_band
)
SELECT
    'Finland',
    'Joensuu',
    'Ilosaari',
    DATE '2027-07-16',
    b.band_id
FROM app.band AS b
WHERE b.bandname = 'Amorphis';

INSERT INTO app.gig (
    country,
    city,
    address,
    event_date,
    fk_band
)
SELECT
    'Finland',
    'Tampere',
    'Itsenäisyydenkatu 2',
    DATE '2026-12-20',
    b.band_id
FROM app.band AS b
WHERE b.bandname = 'Avantasia';

INSERT INTO app.gig (
    country,
    city,
    address,
    event_date,
    fk_band
)
SELECT
    'Finland',
    'Helsinki',
    'Sörnäisten rantatie 22',
    DATE '2027-07-02',
    b.band_id
FROM app.band AS b
WHERE b.bandname = 'Insomnium';
