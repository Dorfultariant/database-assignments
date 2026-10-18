## NOTE:The following program is by no means perfect, it has probably more bugs than a biomass in a dumbster but hey, it works, sort of
## It is not really as complete as I would have liked it to be (mainly regarding foreign keys being just numbers rather than connect to data)
## , but considering that I moved from the initial Vite + react, express monster to this, I think its fine.

## WARNING: Some functions are generated with Microsoft Copilot due to me not really bothering to investigate the good solution and these are marked with: "## WARNING: [Microsoft Copilot]: "<prompt>" "

import hashlib as h
from datetime import datetime

## Postgresql controlling
## https://www.psycopg.org/psycopg3/docs/basic/usage.html
import psycopg
from db import get_connection

## We can get the rows as dicts with row_factory=dict_row, otherwise we get tuples, could work but dict is more elegant
from psycopg.rows import dict_row

## Makes the table prints easier: https://pypi.org/project/tabulate/
from tabulate import tabulate


## WARNING: [Microsoft Copilot]: "todo: type/format hints for adding new / modifying rows to table. <code>"
## Didn't really think of doing it this way, seems nice
def get_type_hint(data_type: str) -> str:

    hints = {
        "integer": "integer (e.g. 123)",
        "bigint": "integer (e.g. 123)",
        "numeric": "decimal (e.g. 12.50)",
        "real": "decimal (e.g. 12.50)",
        "double precision": "decimal (e.g. 12.50)",
        "text": "text",
        "character varying": "text",
        "date": "YYYY-MM-DD",
        "timestamp": "YYYY-MM-DD HH:MM:SS",
        "timestamp without time zone": "YYYY-MM-DD HH:MM:SS",
        "boolean": "true/false",
    }

    return hints.get(data_type, data_type)


## WARNING: [Microsoft Copilot]: "todo: type/format hints for adding new / modifying rows to table. <code>"
## Didn't really think of doing it this way, seems nice
def parse_input(value: str, data_type: str):
    value = value.strip()

    if value == "":
        return None
    if data_type in ("integer", "bigint"):
        return int(value)
    if data_type in ("numeric", "real", "double precision"):
        return float(value)
    if data_type == "boolean":
        return value.lower() in ("true", "t", "yes", "y", "1")
    if data_type == "date":
        return datetime.strptime(value, "%Y-%m-%d").date()
    if data_type in ("timestamp", "timestamp without time zone"):
        return datetime.strptime(value, "%Y-%m-%d %H:%M:%S")

    return value


## We can just extract the tables from the db connectio ndirectly
## src: https://stackoverflow.com/questions/10598002/how-do-i-get-tables-in-postgres-using-psycopg2
## for psycopg2 but remaiins valid for the psycopg
def list_tables(db: str):
    con = get_connection(db)

    try:
        with con.cursor() as cur:
            cur.execute("""
                SELECT table_name
                FROM information_schema.tables
                WHERE table_schema = 'app'
                ORDER BY table_name
            """)
            return [row[0] for row in cur.fetchall()]

    finally:
        con.close()


## Same as with the tables, we can get the cols from db for the table dynamically
## src: https://www.geeksforgeeks.org/python/get-column-names-from-postgresql-table-using-psycopg2/
def get_columns(database, table):
    con = get_connection(database)

    try:
        with con.cursor(row_factory=dict_row) as cur:
            cur.execute(
                """
                SELECT
                    column_name,
                    data_type,
                    column_default
                FROM information_schema.columns
                WHERE table_schema='app'
                  AND table_name=%s
                ORDER BY ordinal_position
                """,
                (table,),
            )
            return cur.fetchall()

    finally:
        con.close()


## Similar to the tables and columnsm, we could have the "SELECT <something>_id FROM <sometable>"
## but this reduces to a single function and does not require hardcoded <table>_ids
## (I suppose it could be formed from the table name but eh)
def get_primary_key(db, table):
    con = get_connection(db)

    try:
        with con.cursor() as cur:
            cur.execute(
                """
                SELECT kcu.column_name
                FROM information_schema.table_constraints tc
                JOIN information_schema.key_column_usage kcu
                    ON tc.constraint_name = kcu.constraint_name
                WHERE tc.table_schema = 'app'
                  AND tc.table_name = %s
                  AND tc.constraint_type = 'PRIMARY KEY'
                """,
                (table,),
            )
            row = cur.fetchone()
            return row[0] if row else None

    finally:
        con.close()


def get_all_rows(db, table):
    con = get_connection(db)

    try:
        with con.cursor(row_factory=dict_row) as cur:
            cur.execute(f"SELECT * FROM app.{table}")
            return cur.fetchall()
    finally:
        con.close()


def get_specific_row(db, column, value, table) -> dict:
    con = get_connection(db)

    try:
        with con.cursor(row_factory=dict_row) as cur:
            cur.execute(f"SELECT * FROM app.{table} WHERE {column} = %s", (value,))
            return cur.fetchone()
    finally:
        con.close()


def get_row_by_id(db, table, row_id):
    pk = get_primary_key(db, table)
    con = get_connection(db)

    try:
        with con.cursor(row_factory=dict_row) as cur:
            cur.execute(
                f"""
                SELECT *
                FROM app.{table}
                WHERE {pk} = %s
                """,
                (row_id,),
            )
            return cur.fetchone()

    finally:
        con.close()


def print_rows(rows):
    if not rows:
        print("\nNo rows found.\n")
        return

    print()
    print(tabulate(rows, headers="keys", tablefmt="grid"))
    print()


## Just to check that the particular table is listed within the particular database
## With one db, could be hardcoded but since we have three and dynamic functions
## I think this is a good verification step
def validate_table(database, table):
    return table in list_tables(database)


def print_table(db):
    table = input("Table name: ").strip()

    if not validate_table(db, table):
        print("\nInvalid table.\n")
        return

    try:
        rows = get_all_rows(db, table)
        print_rows(rows)

    except Exception as e:
        print(f"\nError: {e}\n")

    ## Less jumpy output
    input("Press ENTER...")


## WARNING: [Microsoft Copilot]: "todo: type/format hints for adding new / modifying rows to table. <code>"
## This function had my original implementation that was combined with the injection (and some logic error fixing)
##  for the parse_input() and get_type_hint() related calls
def add_row(db):
    table = input("Table name: ").strip()

    if not validate_table(db, table):
        print("\nInvalid table.\n")
        return

    cols = get_columns(db, table)
    pk = get_primary_key(db, table)
    data = {}

    print(f"\n=== Add Row To {table} ===\n")
    for col in cols:
        name = col["column_name"]
        dtype = col["data_type"]
        default = col["column_default"]
        if name == pk:
            continue
        if default is not None:
            continue

        while True:
            try:
                value = input(f"{name} " f"({get_type_hint(dtype)}): ")
                data[name] = parse_input(value, dtype)
                break
            except Exception as e:
                print(f"Invalid value: {e}")

    if not data:
        print("Nothing to insert.")
        return

    ## Basically, we form the clause for the query and value array
    cols_sql = ", ".join(data.keys())
    newdata = ", ".join(["%s"] * len(data))
    values = list(data.values())

    con = get_connection(db)

    try:
        with con.cursor() as cur:
            cur.execute(
                f"""
                INSERT INTO app.{table} ({cols_sql})
                VALUES ({newdata})
                """,
                values,
            )
            con.commit()
            print("\n\tRow ADDED.\n")

    except Exception as e:
        con.rollback()
        print(f"\nDatabase error: {e}")

    finally:
        con.close()


## WARNING: [Microsoft Copilot]: "todo: type/format hints for adding new / modifying rows to table. <code>"
## This function had my original implementation that was combined with the injection (and some logic error fixing)
##  for the parse_input() and get_type_hint() related calls
## NOTE: There is a bug in here... can you spot it?
def modify_row(db):
    table = input("Table name: ").strip()

    if not validate_table(db, table):
        print("\nInvalid table.\n")
        return

    ## Print rows for user to select
    rows = get_all_rows(db, table)
    print_rows(rows)

    ## Ask the row to modify
    pk = get_primary_key(db, table)
    row_id = input(f"{pk}: ").strip()
    row = get_row_by_id(db, table, row_id)

    if not row:
        print("\nRow not found.\n")
        return

    ## Form the dict for the column and dataformats
    col_info = {col["column_name"]: col["data_type"] for col in get_columns(db, table)}

    updates = {}
    print("\n=== Modify Row ===\n")

    for col, val in row.items():
        if col == pk:
            continue

        while True:
            try:
                hint = get_type_hint(col_info[col])
                ## We give the user the current value of the row column value, and provide hint for the new value
                new_value = input(f"{col} " f"[{val}] " f"({hint}): ")
                ## If the _given_ value is empty, then dont update it (has limit if we would like to null it, maybe insert ' ')
                if new_value == "":
                    updates[col] = val
                else:
                    updates[col] = parse_input(new_value, col_info[col])
                break

            except Exception as e:
                print(f"Invalid value: {e}")

    set_cols = ", ".join([f"{key}=%s" for key in updates])
    vals = list(updates.values())
    vals.append(row_id)
    con = get_connection(db)

    try:
        with con.cursor() as cur:
            cur.execute(
                f"""
                UPDATE app.{table}
                SET {set_cols}
                WHERE {pk} = %s
                """,
                vals,
            )
            con.commit()
            print("\n\tRow UPDATED.\n")

    except Exception as e:
        con.rollback()
        print(f"\nDatabase error:\n{e}\n")

    finally:
        con.close()


def remove_row(db):
    table = input("Table name: ").strip()

    if not validate_table(db, table):
        print("\nInvalid table.\n")
        return

    rows = get_all_rows(db, table)
    print_rows(rows)
    pk = get_primary_key(db, table)
    row_id = input(f"{pk}: ")
    row = get_row_by_id(db, table, row_id)

    if not row:
        print("\nRow not found.\n")
        return

    print("\n\tSelected row:\n")

    for key, value in row.items():
        print(f"\t{key}: {value}")

    confirm = input("\n\tDelete row [y/N]: ")

    if confirm.lower() != "y":
        print("\n\tRow removal CANCELLED!\n")
        return

    con = get_connection(db)
    try:
        with con.cursor() as cur:
            cur.execute(
                f"""
                DELETE FROM app.{table}
                WHERE {pk} = %s
                """,
                (row_id,),
            )
            con.commit()
            print("\n\tRow REMOVED.\n")

    except Exception as e:
        con.rollback()
        print(f"\nDatabase error:\n{e}\n")

    finally:
        con.close()


def show_tables(db):
    tables = list_tables(db)
    print("\nAvailable tables:\n")
    for t in tables:
        print(f"- {t}")

    print()
    ## Less jumpy output
    input("Press ENTER...")


def db_menu(db):
    while True:
        print(f"## {db.upper()} ##\n")
        print("[L]IST ALL TABLES")
        print("[P]RINT TABLE")
        print("[A]DD TO TABLE")
        print("[M]ODIFY TABLE")
        print("[R]EMOVE TABLE ROW")
        print("\n[B]ACK")
        print("[Q]UIT")

        option = input("Option: ").lower()
        if option == "l":
            show_tables(db)
        elif option == "p":
            print_table(db)
        elif option == "a":
            add_row(db)
        elif option == "m":
            modify_row(db)
        elif option == "r":
            remove_row(db)
        elif option == "b":
            return
        elif option == "q":
            raise SystemExit


## Added as a way to add "organically" data to auth database
def login(db) -> bool:
    con = get_connection(db)

    try:
        email = input(f"Email ({get_type_hint('text')}): ")
        ## Yes yes, very secure, it does not actually validate anything
        pw = input(f"Password ({get_type_hint('text')}): ")
        hpw = h.sha256(pw.encode()).hexdigest()

        res = get_specific_row(db, "email", email, "user")

        if res == None:
            with con.cursor() as cur:
                ## Lets just assume that we can register new user
                cur.execute(
                    """
                    INSERT INTO app.user (email, password_hash) VALUES (%s, %s)
                    """,
                    (email, hpw),
                )
                con.commit()
                print("\n\tNew user Registered\n")
        else:
            if res["password_hash"] == hpw:
                print("\n\tWELCOME!")
                return True
            else:
                print("\n\tIncorrect user or password\n")
                return False
    finally:
        con.close()


def main():
    input("Press ENTER...")

    ## Around it goes
    while login("auth") == False:
        continue

    while True:
        print("## DATABASE SELECTION ##\n")
        print("[A]UTH")
        print("[M]USIC")
        print("[G]IGS")
        print("\n[Q]UIT")

        ## As stated in the db.py, we could pass a reference of the connection to the functions
        ## rather than open and close the connection multiple times but I didn't originally think this
        ## and cant be bothered to fix AND test it anymore
        option = input("Option: ").lower()
        if option == "a":
            db_menu("auth")
        elif option == "m":
            db_menu("music")
        elif option == "g":
            db_menu("gigs")
        elif option == "q":
            break


if __name__ == "__main__":
    main()
