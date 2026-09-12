import { useGigs } from "../hooks/useGig";

export default function GigsPage() {
  const {
    gigs,
    loading,
    error,
  } = useGigs();

  // async function handleNewSong() {
  //   await createSong();
  //   await reload();
  // }

  if (loading) {
    return (
      <main>
        <h1>Gigs</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>Gigs</h1>
        <p>Failure: {error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Gigs</h1>

      {gigs.length === 0 ? (
        <p>No gigs found.</p>
      ) : (
        <ul>
          {gigs.map((gig) => (
            <li key={gig.gigId}>
              <strong>{gig.country}</strong>
              {" - "}
              {gig.city}
              {" - "}
              {gig.address}
              {" - "}
              {gig.ticketPrice}
              {" - "}
              {String(gig.eventDate)}
              {" - "}
              {String(gig.creationDate)}
              {" - "}
              {gig.bandName}
              {" - "}
              {gig.orgName}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
