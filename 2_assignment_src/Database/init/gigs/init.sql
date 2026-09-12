CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

CREATE TABLE IF NOT EXISTS app.organizer (
	organizer_id SERIAL PRIMARY KEY,
	org_name TEXT NOT NULL,
  description TEXT NOT NULL,
	joined DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS app.band (
	band_id SERIAL PRIMARY KEY,
	bandname TEXT NOT NULL,
	genre TEXT,
	description TEXT,
	website TEXT,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.gig (
	gig_id SERIAL PRIMARY KEY,
	country TEXT NOT NULL,
	city TEXT NOT NULL,
	address TEXT NOT NULL,
	ticket_price NUMERIC(10, 2),
	event_date DATE NOT NULL,
	creation_date TIMESTAMP DEFAULT NOW(),
	fk_band INTEGER REFERENCES app.band(band_id) ON DELETE SET NULL,
  fk_organizer INTEGER REFERENCES app.organizer(organizer_id) ON DELETE SET NULL
);


INSERT INTO app.organizer (
org_name,
description
) 
VALUES
(
'Onelife',
'Band manager service that organizes events and gigs for music festivals.'
),
(
'Second Chance',
'A life of lived old school outdoor event organizer with the capability to manage thousand participant setups.'
),
(
'Tertier',
'Event organizer that is focused to smaller indoor music setups.'
);

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

INSERT INTO app.gig (
    country,
    city,
    address,
    ticket_price,
    event_date,
    creation_date,
    fk_band,
    fk_organizer
)
SELECT
    'Finland',
    'Tampere',
    'Itsenäisyydenkatu 2',
    20.00,
    DATE '2026-10-10',
    DATE '2026-09-12',
    band.band_id,
    org.organizer_id
FROM app.band AS band
CROSS JOIN app.organizer AS org
WHERE band.bandname = 'Kalmah'
  AND org.org_name = 'Second Chance';

INSERT INTO app.gig (
    country,
    city,
    address,
    ticket_price,
    event_date,
    creation_date,
    fk_band,
    fk_organizer
)
SELECT
    'Finland',
    'Joensuu',
    'Ilosaari',
    100.00,
    DATE '2027-07-16',
    DATE '2026-09-13',
    b.band_id,
    o.organizer_id
FROM app.band AS b
CROSS JOIN app.organizer AS o
WHERE b.bandname = 'Amorphis'
  AND o.org_name = 'Onelife';

INSERT INTO app.gig (
    country,
    city,
    address,
    ticket_price,
    event_date,
    creation_date,
    fk_band,
    fk_organizer
)
SELECT
    'Finland',
    'Tampere',
    'Itsenäisyydenkatu 2',
    50.00,
    DATE '2026-12-20',
    DATE '2026-09-12',
    b.band_id,
    o.organizer_id
FROM app.band AS b
CROSS JOIN app.organizer AS o
WHERE b.bandname = 'Avantasia'
  AND o.org_name = 'Tertier';

INSERT INTO app.gig (
    country,
    city,
    address,
    ticket_price,
    event_date,
    creation_date,
    fk_band,
    fk_organizer
)
SELECT
    'Finland',
    'Helsinki',
    'Sörnäisten rantatie 22',
    249.00,
    DATE '2027-07-02',
    DATE '2026-09-12',
    b.band_id,
    o.organizer_id
FROM app.band AS b
CROSS JOIN app.organizer AS o
WHERE b.bandname = 'Insomnium'
  AND o.org_name = 'Second Chance';
