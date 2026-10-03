# Local Development Runbook

## 1. Infrastructure
Start PostgreSQL:
```bash
docker compose up -d postgres
```

Check it:
```bash
docker ps
```

## 2. Start services in this order

### Terminal 1 - Discovery
```bash
cd discovery-server
mvn spring-boot:run
```
Wait for http://localhost:8761.

### Terminal 2 - Auth
```cd auth-service
mvn spring-boot:run
```

### Terminal 3 - Restaurant
```cd restaurant-service
mvn spring-boot:run
```

### Terminal 4 - Order
```cd order-service
mvn spring-boot:run
```

### Terminal 5 - Gateway
```cd api-gateway
mvn spring-boot:run
```

### Terminal 6 - Frontend
```cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## 3. Verify
- Eureka: http://localhost:8761
- Auth health: http://localhost:8081/actuator/health
- Restaurant health: http://localhost:8082/actuator/health
- Order health: http://localhost:8083/actuator/health
- Gateway health: http://localhost:8080/actuator/health
- Auth Swagger: http://localhost:8081/swagger-ui.html
- Restaurant Swagger: http://localhost:8082/swagger-ui.html
- Order Swagger: http://localhost:8083/swagger-ui.html

## 4. Typical flow
1. Register a customer in the UI.
2. Login.
3. Browse restaurants.
4. Open a restaurant and add menu items.
5. Place an order.
6. Gateway reads the JWT and propagates the authenticated email as X-User-Email.
7. Order Service calculates the total by calling Restaurant Service through WebClient + Eureka load balancing.
8. The order is persisted in PostgreSQL.

## 5. Troubleshooting
If a service cannot connect to PostgreSQL, make sure Docker PostgreSQL is running on port 5432.

If Gateway returns 503, open Eureka and check that AUTH-SERVICE, RESTAURANT-SERVICE and ORDER-SERVICE are registered.

If Order Service reports Restaurant Service unavailable, verify Restaurant Service is registered in Eureka.

If frontend requests fail, verify the API Gateway is running on port 8080.

To reset local data:
```bash
docker compose down -v
docker compose up -d postgres
```
