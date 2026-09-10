CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION teppo;

CREATE TABLE IF NOT EXISTS app.user (
	user_id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	born DATE,
	creation_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.message (
	msg_id SERIAL PRIMARY KEY,
	message_text TEXT,
	fk_user_sender INTEGER REFERENCES app.user(user_id) ON DELETE CASCADE,
	fk_user_receiver INTEGER REFERENCES app.user(user_id) ON DELETE CASCADE,
	created_at TIMESTAMP DEFAULT NOW()
);

