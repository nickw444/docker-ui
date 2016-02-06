FROM dspfac/alpine-nginx:latest
MAINTAINER Nick Whyte (nick@nickwhyte.com)

WORKDIR /usr/html
ADD ["./dist", "package.json", "./"]
