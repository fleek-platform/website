#!/bin/bash

port=7700
img="getmeili/meilisearch"
tag="v1.7"

echo "🌈 Starting Search server (Development only)"

if ! command -v docker &> /dev/null; then
  echo "👹 Oops! Docker is not installed. Learn to install it by visiting https://www.docker.com"
  exit 1
fi

if [[ "$(uname)" == "Darwin" ]]; then
  if ! pgrep -f "Docker" &> /dev/null; then
    echo "👹 Oops! Docker service is not running, start Docker and try again!"
    exit 1
  fi
else
  if ! systemctl is-active --quiet docker; then
    echo "👹 Oops! Docker service is not running, start Docker and try again!"
    exit 1
  fi
fi

if ! docker run -it --rm -p "$port:$port" -v "$(pwd)/meili_data:/meili_data" "$img:$tag"; then
  echo
  echo
  echo "🦖 Rooaar! The container $img:$tag on port number $port is not running."
  exit 1
fi

