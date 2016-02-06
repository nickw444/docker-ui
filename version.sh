#!/bin/sh
cat package.json | jq -r '.version'