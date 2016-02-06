#!/bin/sh
REMOTE_ARTIFACT="nickw444/docker-ui"
PACKAGE_VERSION=$(cat package.json | jq -r '.version')
docker build -t "$REMOTE_ARTIFACT:$PACKAGE_VERSION" .
docker tag "$REMOTE_ARTIFACT:$PACKAGE_VERSION" "$REMOTE_ARTIFACT:latest"
docker push "$REMOTE_ARTIFACT:latest"
docker push "$REMOTE_ARTIFACT:$PACKAGE_VERSION"
