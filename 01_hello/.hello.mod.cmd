savedcmd_/home/spyro/App/01_hello/hello.mod := printf '%s\n'   hello.o | awk '!x[$$0]++ { print("/home/spyro/App/01_hello/"$$0) }' > /home/spyro/App/01_hello/hello.mod
