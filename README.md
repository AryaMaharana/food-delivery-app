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

## Run
Prerequisites: JDK 21, Maven 3.9+, Node.js 20+, Docker.
Start PostgreSQL with: docker compose up -d postgres
Then start discovery-server, auth-service, restaurant-service, order-service and api-gateway from food-delivery-backend using the Maven commands documented in RUNBOOK.md.
Start the UI with npm install && npm run dev from food-delivery-ui.
Open http://localhost:5173.

See RUNBOOK.md for troubleshooting.