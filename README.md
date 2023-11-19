## Docker

- docker run --name backend -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5435:5435 bitnami/postgresql:latest
  docker compose up -d
  docker compose stop
  docker compose down
  npx prisma migrate dev
