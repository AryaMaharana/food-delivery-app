# Adding a new module

Gateway routes are generated from Eureka service registrations, so a new backend service does not need a new hardcoded gateway route.

## Backend
1. Copy an existing service under food-delivery-backend/.
2. Give it a unique spring.application.name, for example catalog-service.
3. Add the service directory to food-delivery-backend/pom.xml.
4. Add the Eureka client and register the service.
5. Expose controllers without the /api prefix, for example /products.
6. Add Eureka metadata:

eureka:
  instance:
    metadata-map:
      module-enabled: "true"
      module-name: "catalog"
      ui-enabled: "true"
      ui-label: "Catalog"
      ui-route: "/catalog"
      ui-order: "30"

The gateway will expose it as /api/catalog-service/products. No gateway route entry is required.

## UI
The shared API client supports any discovered service:

const catalogApi = serviceApi('catalog-service');
catalogApi.get('/products');

Navigation is populated from /api/modules, so UI navigation metadata is supplied by backend service registration instead of being hardcoded in Navbar.jsx.

For a genuinely new business screen, add a feature folder/page for that screen. The platform plumbing—authentication header propagation, discovery-based routing, service client creation and navigation metadata—does not need to be rewritten.

## Design rule
Keep each module independently owned: API/controller, application/service, persistence, and integration clients.
Do not let another service access its repository or database tables directly. Cross-service communication should use APIs or events.

Eureka metadata is available to remote discovery clients and can carry application-specific module information.