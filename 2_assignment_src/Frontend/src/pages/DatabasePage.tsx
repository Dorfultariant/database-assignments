import { Link } from "react-router-dom";
interface Database {
  name: string;
  description: string;
  path: string;
}

/* The databases the are available for viewing and their routing / redirection to their respective views */
const databases: Database[] = [
  {
    name: "User",
    description: "See and edit users.",
    path: "/user",
  },
  {
    name: "Music",
    description: "See and edit bands, albums and songs.",
    path: "/music",
  },
  {
    name: "Gigs",
    description: "See and edit gigs, organizers and bands.",
    path: "/gigs",
  },
];

export default function DatabasePage() {
  return (
    <main>
      <h1>Databases Currently Available</h1>
      <section>
        {databases.map((db) => (
          <Link key={db.path} to={db.path}>
            <article>
              <h2>{db.name}</h2>
              <p>{db.description}</p>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
