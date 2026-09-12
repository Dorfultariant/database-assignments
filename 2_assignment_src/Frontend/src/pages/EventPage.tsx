/* Follows similar setup as the DatabasePage, though now the values should be dynamic based on the contents of db */
import { Link } from "react-router-dom";

export default function EventPage() {
  return (
    <main>
      <h1>Gig Database</h1>

      <nav>
        <Link key="/gigs/bands" to="/gigs/bands">
          Bands
        </Link>

        <Link key="/gigs/organizers" to="/gigs/organizers">
          Organizers
        </Link>

        <Link key="/gigs/gig-band-org" to="/gigs/gig-band-org">
          Gigs
        </Link>
      </nav>
    </main>
  );
}
