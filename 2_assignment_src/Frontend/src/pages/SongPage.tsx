/* I start to regret my choices quite heavily ... */
/* I could have had a simple python CLI script that has while loop and a simple menu ... */

import { useSongs } from "../hooks/useSong";

export default function SongsPage() {
  const {
    songs,
    loading,
    error,
  } = useSongs();

  // async function handleNewSong() {
  //   await createSong();
  //   await reload();
  // }
  //
  if (loading) {
    return (
      <main>
        <h1>Songs</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Songs</h1>
        <p>Failure: {error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Songs</h1>

      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.songId}>
              <strong>{song.songName}</strong>
              {" - "}
              {song.songType}
              {" - "}
              {song.mood}
              {" - Album ID: "}
              {song.fkAlbumId}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
