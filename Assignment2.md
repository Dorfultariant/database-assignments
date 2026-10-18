## Quick-ish start

The `2_assignment_src` should be able to run on platforms with docker compose available, setup with the three different databases by utilizing simply by cloning this repository and navigating to the assignment.

NOTE: There remains some files not specific to this setup as I moved from fullstack to simple python + postgresql

On linux (with systemd for service start):

```
## Ensure that docker service is running
[2_assignment_src]$ systemctl status docker
## Or start it
[2_assignment_src]$ sudo systemctl start --now docker

## Ignite the docker service build and setup [optionally detach from it]:
[2_assignment_src]$ docker compose up --build [-d]

## Start the application in the docker environment (REQUIRED TO RUN IF YOU EXIT IT) 
[2_assignment_src]$ docker compose run --rm frontend

## Now you should be able to test the application by pressing ENTER

"""
$ docker compose run --rm frontend
[+] run 3/3
 ✔ Container smoothtune-db-auth  Running                                                                                                  0.0s
 ✔ Container smoothtune-db-music Running                                                                                                  0.0s
 ✔ Container smoothtune-db-gigs  Running                                                                                                  0.0s
Container smoothtune-db-music Waiting 
Container smoothtune-db-gigs Waiting 
Container smoothtune-db-auth Waiting 
Container smoothtune-db-auth Healthy 
Container smoothtune-db-music Healthy 
Container smoothtune-db-gigs Healthy 
Container 2_assignment_src-frontend-run-a8319c9cf2ab Creating 
Container 2_assignment_src-frontend-run-a8319c9cf2ab Created 
Press ENTER...
Email (text): seppo
Password (text): korppi

	New user Registered

## DATABASE SELECTION ##

[A]UTH
[M]USIC
[G]IGS

[Q]UIT
Option: 

"""

## Stopping the docker services [optionally annihilating volumes and orphans]:
[2_assignment_src]$ docker compose down [--volumes --remove-orphans]
```


## Tools utilized

Specific mentions for toolusage. Postgresql documentation was used in general but these are improvement tools such as testing queries without local setup (or docker in my case).

Online postgresql SQL tester for the db creation and query testing: [onecompiler](https://onecompiler.com/postgresql)


