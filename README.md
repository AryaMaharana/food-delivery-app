# Food Delivery Platform

A Java 21 + Spring Boot microservices food-delivery application with a React UI and PostgreSQL test data.

## Repository layout
food-delivery-app/
  food-delivery-backend/
    pom.xml
    discovery-server/
    api-gateway/
    auth-service/
    restaurant-service/
    order-service/
  food-delivery-ui/
  db/
  docs/
  docker-compose.yml
  RUNBOOK.md
  README.md

The old monolith has been removed. The active microservice implementation is the source of truth.

## Generic module design
Gateway routes are generated from Eureka registrations. A new service does not need a new hardcoded gateway route.
The UI uses a generic serviceApi(serviceId) factory and reads UI navigation metadata from /api/modules.
See docs/ADDING-MODULE.md for the exact convention.

## Backend
- Eureka Service Discovery: 8761
- API Gateway: 8080
- Auth Service: 8081
- Restaurant Service: 8082
- Order Service: 8083
- Discovery-based gateway routing
- WebClient + Eureka LoadBalancer for service-to-service calls
- Resilience4j circuit breaker
- JWT authentication
- OpenAPI/Swagger
- PostgreSQL
- Actuator

## Database test data
After PostgreSQL and the services have created their JPA tables, apply db/sample-data.sql.
All seeded users use the password password in the intended local test dataset.

## Run locally with Docker

Prerequisite: Docker Desktop with Docker Compose.

Start the complete ZAAYKA stack from the repository root:

    docker compose up --build

This starts PostgreSQL, Eureka Discovery, Auth, Restaurant, Order, API Gateway and the React UI. The first startup also creates the JPA tables and loads the local sample restaurant/menu/order data.

Open the UI at http://localhost:5173.
Eureka is available at http://localhost:8761.
The API Gateway is available at http://localhost:8080.

To stop the stack:

    docker compose down

To stop it and remove the local PostgreSQL volume/data:

    docker compose down -v

### Run without Docker

Prerequisites: JDK 21, Maven 3.9+, Node.js 20+ and PostgreSQL.

Start PostgreSQL first, then start discovery-server, auth-service, restaurant-service, order-service and api-gateway from food-delivery-backend using the Maven commands documented in RUNBOOK.md. Start the UI with npm install && npm run dev from food-delivery-ui.

See RUNBOOK.md for troubleshooting.