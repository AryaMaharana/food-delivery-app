# Food Delivery App

Full-stack demo food delivery application built with **Java 21, Spring Boot 3.5, Spring Security + JWT, PostgreSQL, React, Vite and Docker Compose**.

## Features
- JWT registration/login and role-based Spring Security
- Restaurant and menu APIs
- Cart/order flow
- Demo payment transaction IDs (no real money is charged)
- PostgreSQL persistence
- React responsive UI
- Seed restaurant/menu data

## Run backend
```bash
docker compose up -d
cd backend
mvn spring-boot:run
```
Backend: http://localhost:8080

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Demo
The backend seeds `Spice Garden` with sample menu items. Register a customer account from the UI, sign in, add items and place an order.

## Architecture
The supplied design was consolidated into a production-friendly modular package for easier local development. Domain, security, order and payment responsibilities are separated by package/service boundaries; this can later be split into independent Maven modules or microservices.

## Important
Payment is intentionally simulated. Replace the demo payment service with a provider such as Stripe/Razorpay only after adding server-side webhook verification, idempotency and secret management.
