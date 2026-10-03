# Food Delivery Platform

A Java 21 + Spring Boot microservices food-delivery application with a React UI and PostgreSQL test data.

## Repository layout

```text
food-delivery-app/
├── food-delivery-backend/
│   ├── discovery-server/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── restaurant-service/
│   └── order-service/
├── food-delivery-ui/
│   ├── src/
│   ├── package.json
│   └── index.html
├── db/
│   └── sample-data.sql
├── docs/
├── docker-compose.yml
├── RUNBOOK.md
└── README.md
```

The old monolith is kept under `legacy/monolith/` only for migration/reference.

## Backend

- Eureka Service Discovery: 8761
- API Gateway: 8080
- Auth Service: 8081
- Restaurant Service: 8082
- Order Service: 8083
- WebClient + Eureka LoadBalancer for service-to-service calls
- Resilience4j circuit breaker
- JWT authentication
- OpenAPI/Swagger
- PostgreSQL
- Actuator

## UI

React + Vite runs on port 5173.

## Database test data

After PostgreSQL and the services have created their JPA tables, apply:

```bash
psql -h localhost -U fooddelivery -d fooddelivery -f db/sample-data.sql
```

The script contains related users, restaurants, menu items and orders with stable IDs. Cross-service relationships are represented by business identifiers rather than database foreign keys because the microservices own their data independently.

All seeded users use the password `password`.

## Run

Prerequisites: JDK 21, Maven 3.9+, Node.js 20+, Docker.

```bash
docker compose up -d postgres
```

From the repository root, start each backend service in a separate terminal:

```bash
mvn -f food-delivery-backend/pom.xml -pl discovery-server -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl auth-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl restaurant-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl order-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl api-gateway -am spring-boot:run
```

Start UI:

```bash
cd food-delivery-ui
npm install
npm run dev
```

Open http://localhost:5173.

See `RUNBOOK.md` for the complete flow and troubleshooting.
