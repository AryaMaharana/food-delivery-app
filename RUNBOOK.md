# Local Development Runbook

## 1. Start PostgreSQL

```bash
docker compose up -d postgres
```

## 2. Start backend

From the repository root, run each command in a separate terminal:

```bash
mvn -f food-delivery-backend/pom.xml -pl discovery-server -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl auth-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl restaurant-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl order-service -am spring-boot:run
mvn -f food-delivery-backend/pom.xml -pl api-gateway -am spring-boot:run
```

## 3. Load test data

Start the services once so Hibernate creates the tables, then run:

```bash
psql -h localhost -U fooddelivery -d fooddelivery -f db/sample-data.sql
```

Or use any PostgreSQL client and execute `db/sample-data.sql`.

## 4. Start UI

```bash
cd food-delivery-ui
npm install
npm run dev
```

Open http://localhost:5173.

## 5. Service URLs

- Eureka: http://localhost:8761
- Gateway: http://localhost:8080
- Auth Swagger: http://localhost:8081/swagger-ui.html
- Restaurant Swagger: http://localhost:8082/swagger-ui.html
- Order Swagger: http://localhost:8083/swagger-ui.html
- Actuator health: `/actuator/health` on each backend service

## 6. Test flow

1. Login with `owner@demo.com / password` or a seeded customer.
2. Browse restaurants.
3. Open a restaurant menu.
4. Place an order.
5. Gateway validates the JWT and propagates the customer email.
6. Order Service calls Restaurant Service through WebClient and Eureka.
7. The order is stored in PostgreSQL.

## 7. Reset

```bash
docker compose down -v
docker compose up -d postgres
```

Then restart services and reload `db/sample-data.sql`.
