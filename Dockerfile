FROM nginx:latest
MAINTAINER Nick Whyte (nick@nickwhyte.com)

WORKDIR /usr/share/nginx/html
ADD ["./dist", "package.json", "./"]
