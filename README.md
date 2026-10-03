# Food Delivery Platform

A local-first food-delivery demo built as a microservice system with Java 21, Spring Boot, Spring Cloud, WebClient, JWT, PostgreSQL, OpenAPI/Swagger and React.

## Repository structure

- `services/` — independently deployable Spring Boot services.
- `frontend/` — React/Vite web application.
- `legacy/monolith/` — original monolith retained for migration/reference only.
- `docs/` — architecture and project documentation.
- `docker-compose.yml` — local PostgreSQL infrastructure.
- Root `pom.xml` — Maven aggregator for all active backend services.

## Architecture

- Discovery Server (Eureka): 8761
- API Gateway (Spring Cloud Gateway): 8080
- Auth Service: 8081
- Restaurant Service: 8082
- Order Service: 8083
- PostgreSQL: 5432
- React UI: 5173

Browser -> API Gateway -> Auth / Restaurant / Order  
Order Service -> WebClient -> Restaurant Service

## Prerequisites

JDK 21, Maven 3.9+, Node.js 20+, Docker Desktop/Engine.

Check:
`java -version`  
`mvn -version`  
`node -v`  
`docker --version`

## Run locally

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Start all backend services from the repository root in separate terminals:

```bash
mvn -pl services/discovery-server spring-boot:run
mvn -pl services/auth-service spring-boot:run
mvn -pl services/restaurant-service spring-boot:run
mvn -pl services/order-service spring-boot:run
mvn -pl services/api-gateway spring-boot:run
```

Or enter a service directory and run `mvn spring-boot:run`.

Start the UI:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**.

## Service URLs

- Eureka: http://localhost:8761
- Gateway: http://localhost:8080
- Auth Swagger: http://localhost:8081/swagger-ui.html
- Restaurant Swagger: http://localhost:8082/swagger-ui.html
- Order Swagger: http://localhost:8083/swagger-ui.html
- Actuator: `/actuator/health` on each service

## Demo account

The restaurant owner is seeded as:
- owner@demo.com
- password

Create a customer account through the UI.

## What this demonstrates

- Service discovery with Eureka
- API Gateway routing
- JWT authentication
- Stateless Spring Security
- Service-to-service calls with Spring WebClient
- Load-balanced service discovery
- Circuit-breaker/fault-tolerance boundary
- PostgreSQL/JPA
- OpenAPI + Swagger UI
- Spring Boot Actuator
- React/Vite frontend
- Dockerized local infrastructure

Payments are demo-only; no real card/UPI data is collected.

## Build

Build all active backend services from the root:

```bash
mvn clean package
```

The services remain independently deployable. The legacy monolith is intentionally excluded from the root build.
