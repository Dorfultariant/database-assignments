## Declaration

The `./2_assignment_src/` utilizes a previous course project in which I was the main culprit behind backend implementation and I decided to utilize the source in this assignment as well, there are some modifications and some are straight copy.

The reason for implementing such complex setup for this assignment was mainly due to it helping (hopefully) with the project work ignition as it can be further modded to get the MVP working quicker.

## Quick-ish start

The `2_assignment_src` should be able to run on localhost setup with the three different databases by utilizing simply by cloning this repository and navigating to the assignment.

On linux (with systemd for service start):

```
## Ensure that docker service is running
[2_assignment_src]$ systemctl status docker
## Or start it
[2_assignment_src]$ sudo systemctl start --now docker

## Ignite the docker service build and setup:
[2_assignment_src]$ docker compose up [-d]

## Env should be available (with good principles in a public repository) to get the setup running quickly
```

You should then be able to just navigate in browser to `localhost:5173` which should bring you to "login" screen where you must login to get further (if authorization works as planned)

After logging in successfully, you should be able to see a list of the different databases and by clicking either one get to further details and actions about them.


## Tools utilized

Specific mentions for toolusage. Postgresql documentation was used in general but these are improvement tools such as testing queries without local setup (or docker in my case).

Online postgresql SQL tester for the db creation and query testing: [onecompiler](https://onecompiler.com/postgresql)


