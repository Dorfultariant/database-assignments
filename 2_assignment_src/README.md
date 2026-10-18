## Description

Initially the idea was to build a fullstack app with React frontend, express backend and postgresql db.... Yeah, nope. After realizing just how many API routes and UI logic I would have to write I decided to go with the good ol' python + psycopg (postgresql lib) and some nice table formatting (this time not trying to make my own version of it). 

The switch also is the one of the main reasons why this assignment has the `docker compose` -setup instead of just direct expectation of having the dependencies installed on the host for running the stack. I think its nice to have isolated containers and volumes that can be just erradicated once done with the project. Keeps the build consistent across platforms as well (as long as docker compose works). This does mean that to run the app in local setup you need docker, docker compose and some terminal access.

---

**Quickstart:**

```
## Build and compose the services and then detach from the session
[host]$ docker compose up --build -d
## You should inspect that all services are in healthy condition:
"""
...
[+] up 9/9
 ✔ Image 2_pythonpostgresql-frontend       Built                                                                                          1.2s
 ✔ Volume 2_pythonpostgresql_pg_data_auth  Created                                                                                        0.0s
 ✔ Network 2_pythonpostgresql_application  Created                                                                                        0.0s
 ✔ Volume 2_pythonpostgresql_pg_data_music Created                                                                                        0.0s
 ✔ Volume 2_pythonpostgresql_pg_data_gigs  Created                                                                                        0.0s
 ✔ Container smoothtune-db-music           Healthy                                                                                        6.0s
 ✔ Container smoothtune-db-gigs            Healthy                                                                                        5.5s
 ✔ Container smoothtune-db-auth            Healthy                                                                                        5.5s
 ✔ Container 2_pythonpostgresql-frontend-1 Started           
"""

## Then to access the frontend:
[host]$ docker compose run --rm frontend

## Press Enter and you can start experimenting with the app.
```



