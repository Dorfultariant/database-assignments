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
	fk_band_id INTEGER REFERENCES app.organizer(organizer_id) ON DELETE SET NULL,
  fk_organizer INTEGER REFERENCES app.organizer(organizer_id) ON DELETE SET NULL
);

