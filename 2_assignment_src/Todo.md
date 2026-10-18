## Frontend

Currently Vite + React but its complicated, so movement toward python CLI interface I think...

Idea for the implementation:

Python:

```
## LOGIN/REGISTER ##
Email: 
Password:

> Success / Failure: <return code>

# Database selection # 
[U]SERS
[M]USIC
[G]IGS
[q]uit

## USERS/GIGS/MUSIC ##
[L]IST ALL TABLES
[P]RINT TABLE
[A]DD TO TABLE
[M]ODIFY TABLE
[R]EMOVE TABLE ROW

[B]ACK
[q]uit

### List All Tables ###
<list of tables>

### List <table> ###
<table rows>

### Add to <table> ###
Input field for each column (excluding ID) (of the specific database table), column name and type

### Modify <table> ###
1. <List rows>

2. Select (id) 

3. Input field for each column (excluding ID) (of the specific database table row), column name and type, prefilled with existing data, modify to update (continue with enter to next column)

### Remove <table> row ### 

1. <list rows>
2. Select (id)
2.1 Row data: <row data>
3. Remove selected row [y/N]:

Usage:
## MUSIC ##
[L]IST ALL TABLES
[P]RINT TABLE
[A]DD TO TABLE
[M]ODIFY TABLE
[R]EMOVE TABLE ROW

Option: M song

<song table list>

Select row: 2340204

<row columns prefilled with existing data to be modified>

```

So, to reduce the number of functions that do similar things, the column printing should be dynamic allowing different number of columns and rows and named headers.

The main operations should have their own functions and these functions can work with different databases dynamically (**kwargs?).

The modification and data alteration should ideally allow fixing issues in previous columns but I think this might require TUI such as ncurses so, no..

~The API routes might need to be standardized~ for this to work effectively, and the relation between the different tables becomes quickly an issue. E.g. Song is tied to album and then to a band via the album, so adding a song requires the knowledge of an album, so adding song requires adding either to an existing album (with e.g. same name) or creating a new album, on the latter we also have to create a band to the database to link to.

Decided to lower the bar by not thinking about the relations (and linking foreign keys when showing data) and made the python frontend just directly connect to the database without the backend shenanigans, way too complicated for my time.

