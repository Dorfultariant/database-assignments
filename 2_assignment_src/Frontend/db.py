import psycopg

## These can be just hardcoded as I don't care
DATABASES = {
    "auth": {
        "host": "db-auth",
        "dbname": "auth",
        "user": "teppo",
        "password": "teppo",
    },
    "music": {
        "host": "db-music",
        "dbname": "music",
        "user": "teppo",
        "password": "teppo",
    },
    "gigs": {
        "host": "db-gigs",
        "dbname": "gigs",
        "user": "teppo",
        "password": "teppo",
    },
}


## NOTE: this function is called pretty often, which could be mitigated by passing a reference
## To each database as necessary rather than open / close connections constantly
## but due to this being just a demo, might as well have it like this
def get_connection(database_name: str):
    config = DATABASES[database_name]

    return psycopg.connect(
        host=config["host"],
        dbname=config["dbname"],
        user=config["user"],
        password=config["password"],
    )
