/* As the assignment (and future project) will have to have at least three different databases, 
* I am going to do three connections to the different databases, and each will have their own 
* helpers to access their contents, again, this is probably wasted effort from the assignment perspective
* but as it helps with the project, it is done like this...
  *
  * */

import { Pool } from "pg";

export const authDb = new Pool({
  host: process.env.DB_AUTH_HOST ?? "localhost",
  port: Number(process.env.DB_AUTH_PORT ?? 4117),
  database: process.env.DB_AUTH_NAME,
  user: process.env.DB_AUTH_USER,
  password: process.env.DB_AUTH_PASSWORD,
  max: 20,
  idleTimeoutMillis: 3600 * 1000,
  connectionTimeoutMillis: 3600 * 1000,
});

export const gigsDb = new Pool({
  host: process.env.DB_GIGS_HOST ?? "localhost",
  port: Number(process.env.DB_GIGS_PORT ?? 5117),
  database: process.env.DB_GIGS_NAME,
  user: process.env.DB_GIGS_USER,
  password: process.env.DB_GIGS_PASSWORD,
  max: 20,
  idleTimeoutMillis: 3600 * 1000,
  connectionTimeoutMillis: 3600 * 1000,
});

export const musicDb = new Pool({
  host: process.env.DB_MUSIC_HOST ?? "localhost",
  port: Number(process.env.DB_MUSIC_PORT ?? 6117),
  database: process.env.DB_MUSIC_NAME,
  user: process.env.DB_MUSIC_USER,
  password: process.env.DB_MUSIC_PASSWORD,
  max: 20,
  idleTimeoutMillis: 3600 * 1000,
  connectionTimeoutMillis: 3600 * 1000,
});

export async function closeDatabases() {
  await Promise.all([
    authDb.end(),
    gigsDb.end(),
    musicDb.end(),
  ]);
}
