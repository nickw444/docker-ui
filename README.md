# Docker Registry V2 UI
A lightweight UI for the Docker v2 registry. Written in ReactJS, and running on `dspfac/alpine-nginx`

### View All Repos
![Home Page](http://imgur.com/8f4kYoL.png)

### View All Tags
![Tags Page](http://imgur.com/Eaktkb4.png)

## Configure Your Registry Server
Due to CORS issues, the easiest method for getting up and running
is to put your Docker registry behind a reverse proxy.

Docker-UI will only talk to current domain/port, but if custom domain specification is a requested feature, I'll most likely add this. It is worth noting that if that method is employed, CORS headers are required with the Docker registry server.

### Sample Nginx Configuration
```
server {
    listen 0.0.0.0:443 ssl;
    server_name docker.example.com;
    ssl_certificate /path/to/my/cert;
    ssl_certificate_key /path/to/my/cert/key;
    chunked_transfer_encoding on;
    client_max_body_size 0;

    add_header Docker-Distribution-Api-Version registry/2.0 always;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Original-URI $request_uri;
    proxy_set_header Docker-Distribution-Api-Version registry/2.0;

    location / {
        # Send Docker UI Requests to Docker UI
        proxy_pass http://127.0.0.1:5001;
    }
    location /v2/ {
        # Send Registry Requests to Docker Registry
        # Enable Auth if you wish:
        # auth_basic "Restricted";
        # auth_basic_user_file /secrets/htpasswd;
        proxy_pass https://127.0.0.1:5000;
    }
}
```

Run Docker UI on Port `5001`

```
docker run --rm -it -p 127.0.0.1:5001:80 nickw444/docker-ui
```