savedcmd_/home/spyro/App/02_better_hello/hello.mod := printf '%s\n'   hello.o | awk '!x[$$0]++ { print("/home/spyro/App/02_better_hello/"$$0) }' > /home/spyro/App/02_better_hello/hello.mod
