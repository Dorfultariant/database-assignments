
/* Follows similar setup as the DatabasePage, though now the values should be dynamic based on the contents of db */
import { Link } from "react-router-dom";

export default function MusicPage() {
  return (
    <main>
      <h1>Music Database</h1>

      <nav>
        <Link key="/music/bands" to="/music/bands">
          Bands
        </Link>

        <Link key="/music/albums" to="/music/albums">
          Albums
        </Link>

        <Link key="/music/songs" to="/music/songs">
          Songs
        </Link>
      </nav>
    </main>
  );
}
