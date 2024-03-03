# INT20H 2024 offline (Ча-ча)
**Try it online:** `https://d20ybysfnublyy.cloudfront.net/` 🚀

### Project info:

Cozy students campus by pes Patron🐶

urls:

- site: `http://localhost:3000/`
- api: `http://localhost:8080/api`
- apidocs: `http://localhost:8080/docs/` or `https://int20h-offline.fly.dev/docs/`

### First run

- `docker compose up --build frontend` (backend is a dependancy to frontend)
- `docker compose run --rm backend flask --app backend.wsgi:app db upgrade`

### Run Backend Separetly

- `docker compose up backend`

### Run Frontend Separetly

- `docker compose up frontend`
  or
- `yarn --cwd ./frontend start`

### Run Tests

- `docker compose up tests`

### DB Migrations

- Init: `docker compose run --rm backend flask --app backend.wsgi:app db init`
- Create revision: `docker compose run --rm backend flask --app backend.wsgi:app db migrate -m "<some message>"`
- Upgrade to latest revision: `docker compose run --rm backend flask --app backend.wsgi:app db upgrade`
