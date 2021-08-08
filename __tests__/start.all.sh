npm run install:shared

npm run build:shared

docker build -t backend -f ./__tests__/docker/Backend.Dockerfile .

docker-compose -f ./__tests__/docker-compose.tests.yml up -d

sleep 35

npm run test
