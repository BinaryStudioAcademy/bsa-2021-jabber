FROM node:14.17.1-alpine3.13

WORKDIR /app
COPY /tsconfig.json /app/tsconfig.json

COPY /backend /app/backend
COPY /__tests__/scripts/backend.entry.sh /app/backend
COPY /shared/build /app/shared/build
COPY /shared/src /app/shared/src

WORKDIR /app/backend

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "sh", "backend.entry.sh" ]


