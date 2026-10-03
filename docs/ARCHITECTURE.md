# Architecture

## Goal
The repository is organized so business modules can be added without changing the gateway routing table or shared UI shell.

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

There is intentionally no legacy/ copy. The active microservice implementation is the source of truth.

## Runtime
Browser -> React UI :5173 -> API Gateway :8080
API Gateway -> /api/auth-service/** -> Auth Service
API Gateway -> /api/restaurant-service/** -> Restaurant Service
API Gateway -> /api/order-service/** -> Order Service
API Gateway -> /api/modules -> module catalog
Order Service -> WebClient -> Restaurant Service
All services -> Eureka :8761

Spring Cloud Gateway can generate routes from DiscoveryClient registrations, using load-balanced service destinations. This removes a hand-maintained route list.

## Module contract
Every business service follows the same contract:
- unique service ID;
- controllers use paths relative to the service, such as /orders or /products;
- Eureka metadata declares whether it is an application module and optionally how it appears in the UI;
- service-owned persistence;
- API/event based communication for cross-service dependencies.

## UI architecture
The UI has a generic serviceApi(serviceId) factory. Authentication headers and gateway URL handling remain centralized.
The navigation shell reads /api/modules, so a service can advertise a UI navigation entry without editing Navbar.jsx.

## Adding future modules
1. Add a Maven module.
2. Register it with Eureka.
3. Add module metadata.
4. The discovery-based gateway exposes it automatically.
5. Consume it from UI through serviceApi('new-service').

Only feature-specific UI/business code remains service-specific.

## Important boundary
Zero code changes is realistic for platform plumbing, not for a new business capability. A new feature still needs domain logic and, if it has a custom screen, its own UI component. The goal is to avoid editing unrelated gateway, authentication, navigation, or shared infrastructure code.