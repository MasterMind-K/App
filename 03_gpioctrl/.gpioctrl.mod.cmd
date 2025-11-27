savedcmd_/home/spyro/App/03_gpioctrl/gpioctrl.mod := printf '%s\n'   gpioctrl.o | awk '!x[$$0]++ { print("/home/spyro/App/03_gpioctrl/"$$0) }' > /home/spyro/App/03_gpioctrl/gpioctrl.mod
