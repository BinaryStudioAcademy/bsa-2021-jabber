#!/bin/bash 

npm run install:shared

npm run build:shared

docker build -t backend -f ./__tests__/docker/Backend.Dockerfile .

docker-compose -f ./__tests__/docker-compose.tests.yml up -d

bash ./__tests__/scripts/wait.sh

npm run test
