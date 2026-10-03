# Architecture

## Repository layout

- `services/` — independently deployable Spring Boot services.
- `frontend/` — React/Vite web application.
- `legacy/monolith/` — original monolithic backend retained only as a migration/reference implementation.
- `docker-compose.yml` — local PostgreSQL infrastructure.
- `README.md` — project overview and prerequisites.
- `RUNBOOK.md` — exact local startup and troubleshooting steps.

## Runtime flow

```text
Browser
  |
  v
React / Vite :5173
  |
  v
API Gateway :8080
  |
  +--> Auth Service       :8081
  +--> Restaurant Service :8082
  +--> Order Service      :8083
                          |
                          +--> WebClient --> Restaurant Service
  |
  v
Eureka Discovery :8761

All business services use PostgreSQL locally.
```

## Service ownership

Each microservice owns its application code and persistence model. Cross-service calls happen through service APIs, not direct repository/database access.

- **Auth Service** — users, registration, login, JWT issuance.
- **Restaurant Service** — restaurants and menu items.
- **Order Service** — orders and customer order history; calls Restaurant Service with WebClient.
- **API Gateway** — single client entry point, routing and JWT header propagation.
- **Discovery Server** — Eureka service registry.
