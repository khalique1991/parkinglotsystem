Parking Lot System — README (Enterprise Edition)

Complete guide for the Parking Lot System microservices platform: architecture, setup, local development, Docker Compose, Kafka, ELK (Elasticsearch / Logstash / Kibana), Postman collections, testing, monitoring, and production considerations.

Table of Contents

Overview & Goals

Architecture

Microservices & Responsibilities

Kafka Topics & Event Flow

Repo Layout / Project Structure

Prerequisites (local machine)

Configuration files & Where to put them

Running locally (without Docker)

Docker Compose: full stack (recommended for E2E testing)

Postman Collections & Test Flow

ELK: Logstash pipeline and Kibana dashboards

Notification (WebSocket + Email) testing

Reporting service behaviour & indexing strategy

Security (Auth, JWT) & Best practices

Observability & Monitoring (Prometheus / Grafana optional)

Scaling, resilience & production notes

CI/CD suggestions

Troubleshooting & FAQs

Contacts & Next steps

Overview & Goals

This Parking Lot System is implemented as a set of decoupled microservices with an event-driven backbone (Apache Kafka). It supports:

Starting/stopping parking sessions

Creating and managing reservations (ticket service)

Payments processing (payment-service)

Notifications (email + WebSocket)

Reporting (event-driven, stored in PostgreSQL and indexed in Elasticsearch for Kibana)

Centralized authentication (Auth service)

ELK stack for analytics and logs (via Logstash consuming Kafka topics)

Goals:

Strong separation of concerns

Event-driven communication (Kafka)

Near-real-time reporting via ELK

Easy local reproducibility via Docker Compose

Production-ready patterns: DLQ, indexing, monitoring, JWT security

Architecture
Clients (web/mobile)
│
▼
Auth Service (JWT)
│
▼
Parking Service → publishes parking_session_created → Kafka
Ticket Service (consumes parking_session_created) → creates reservation → publishes payment_request → Kafka
Payment Service (consumes payment_request) → process payment → publishes payment_completed → Kafka
Notification Service (consumes events) → sends email / WebSocket pushes
Reporting Service (consumes events) → persists to Postgres + indexes to Elasticsearch (via Logstash or direct)
└── Kibana visualizes data (parking-lot-*)


Important infra:

Kafka (broker + zookeeper)

Elasticsearch + Logstash + Kibana (ELK)

PostgreSQL per service (or centralized reporting DB if preferred)

Microservices & Responsibilities

Each service is a Spring Boot application. Typical packages: controller, service, repository, entity, dto, listener, event, config.

auth-service

JWT-based authentication (login/register)

Issues tokens used by other services

parking-service

Start/stop parking sessions

Exposes POST /api/parking-sessions/start, PUT /api/parking-sessions/{id}/stop, GET /api/parking-sessions/{id}, etc.

Publishes parking_session_created event

reservation-service (ticket-service)

Creates reservations from parking session events

Exposes GET /api/reservations, POST /api/reservations (manual), PUT /api/reservations/{id}/status

Publishes payment_request event when reservation is created

payment-service

Processes payment requests (or simulates payment)

Exposes POST /api/payments, GET /api/payments/{id}

Publishes payment_completed event (with transactionId, status, customerId, timestamp, currency, reservationId, parkingSessionId)

notification-service

Consumes parking_session_created & payment_completed and sends:

Emails (SMTP)

WebSocket/STOMP notifications (/ws-notifications)

Exposes small test endpoints to publish test events

reporting-service

Consumes events and stores reporting DTOs in PostgreSQL

Indexes records to Elasticsearch (directly or via Logstash)

Exposes GET /api/reports/payments, GET /api/reports/reservations, GET /api/reports/payments/summary

common (module)

Shared DTOs/events: PaymentCompletedEvent, ParkingSessionCreatedEvent, PaymentRequestEvent, etc.

Kafka Topics & Event Flow

Main topics (canonical names used across the system):

parking_session_created — published by parking-service

reservation_created — (optional) published by ticket-service when manual/reservation created

payment_request — published by ticket-service to request payment

payment_completed — published by payment-service after processing

(Optional) payment_failed, reservation_cancelled, dlq_* for dead-letter

Event payloads: JSON serialized objects — use a shared common module with events for strong typing.

PaymentCompletedEvent (recommended schema):

{
"reservationId": 123,
"parkingSessionId": 456,
"customerId": 101,
"transactionId": "UUID-TXN-123",
"amount": 150.0,
"currency": "INR",
"status": "SUCCESS",
"timestamp": "2025-10-04T12:34:56"
}

Repo Layout / Project Structure

Top-level repo example:

parking-lot-system/
├─ auth-service/
├─ parking-service/
├─ reservation-service/
├─ payment-service/
├─ notification-service/
├─ reporting-service/
├─ parking-common/           # shared DTOs/events
├─ elk/
│   └─ logstash/
│       └─ pipeline/
├─ docker-compose.yml
└─ postman-collections/


Each microservice contains:

src/main/java/... (code)

src/main/resources/application.yml (dev)

src/main/resources/application-docker.yml (Docker profile)

Dockerfile

pom.xml (or build.gradle)

Prerequisites (local machine)

Docker & Docker Compose (v2/3)

Java 17 (if running services locally)

Maven 3.8+ (if building locally)

Postman for testing (optional but recommended)

(Optional) Kibana to view dashboards at http://localhost:5601

Configuration files & Where to put them

application.yml — default local config (in src/main/resources)

application-docker.yml — overrides when SPRING_PROFILES_ACTIVE=docker; place under src/main/resources/

Dockerfile — in each microservice root (e.g., parking-service/Dockerfile)

.env — environment secrets for Docker Compose (do not commit)

elk/logstash/pipeline/parking.conf — logstash pipeline config (referenced by docker-compose)

Sensitive settings (SMTP, DB passwords, JWT secret) — use Docker Compose environment variables or Docker secrets. Do not commit credentials to repository.

Running locally (without Docker)

Build each microservice:

cd parking-service
mvn clean package -DskipTests


Configure application.yml (point Kafka to local dev Kafka, databases, etc.)

Start Kafka locally (or use Docker just for Kafka). Starting everything locally is more complex; Docker Compose is recommended.

Docker Compose: full stack (recommended for E2E testing)

A docker-compose.yml is provided at repo root. Key notes:

Build images from each microservice using provided Dockerfile.

Ensure .env contains values for:

SPRING_MAIL_HOST, SPRING_MAIL_PORT, SPRING_MAIL_USERNAME, SPRING_MAIL_PASSWORD

KAFKA_BOOTSTRAP_SERVERS=kafka:9092 (Docker internal address)

DB credentials for reporting DBs (if using Postgres containers)

Start stack:

docker-compose up --build


Services expose ports:

Auth: 8080

Parking: 8081

Reservation: 8082

Payment: 8083

Notification: 8085

Reporting: 8086

Kibana: 5601

Elasticsearch: 9200

Kafka: 9092

Important: Wait for Kafka & Elasticsearch to be healthy before starting services that depend on them.

Postman Collections & Test Flow

Postman collections are provided under postman-collections/:

Parking Lot Enterprise E2E Flow.postman_collection.json — full end-to-end (Auth → Parking → Reservation → Payment → Notification → Reporting)

Notification Service E2E.postman_collection.json — tests for WebSocket and test endpoints

ELK Reporting E2E.postman_collection.json — triggers events and verifies reporting endpoints

How to use:

Import collection into Postman.

Set environment variables:

authToken (populated after login)

parkingServiceUrl, ticketServiceUrl, paymentServiceUrl, notificationServiceUrl, reportingServiceUrl

Run requests in order (Login → Start Session → Check Reservations → Make Payment → Check Reporting)

ELK — Logstash pipeline and Kibana dashboards

Logstash pipeline elk/logstash/pipeline/parking.conf (example):

input {
kafka {
bootstrap_servers => "kafka:9092"
topics => ["parking_session_created","payment_completed","reservation_created"]
group_id => "logstash-reporting-group"
codec => json
}
}
filter {
# optional enrichments here
}
output {
elasticsearch {
hosts => ["http://elasticsearch:9200"]
index => "parking-lot-%{+YYYY.MM.dd}"
}
stdout { codec => rubydebug }
}


Kibana dashboards: pre-built JSONs under elk/kibana/:

parking-lot-dashboard.json — import via Stack Management → Saved Objects → Import

Visualizations included:

Total revenue (metric)

Reservation status (pie)

Payments over time (line)

Indexing strategy:

Daily time-based indices (parking-lot-YYYY.MM.DD) for retention and performance.

Use Logstash to map fields and ensure timestamp, amount, status have correct types.

Notification (WebSocket + Email) testing

Notification service exposes:

WebSocket endpoint: /ws-notifications (STOMP + SockJS)

Test endpoints: POST /api/test/parking, POST /api/test/payment — used to create test events to Kafka for local testing

To test:

Connect a STOMP client (or Postman WebSocket tab) to ws://localhost:8085/ws-notifications

Subscribe to /topic/customer-{customerId}

Trigger test events via Postman or through normal flows

Email: configure SMTP in .env (for local dev you can use Mailtrap or a local SMTP dev server like smtp4dev)

Reporting service behaviour & indexing strategy

Reporting service consumes Kafka events and:

Persists structured reports to PostgreSQL (for detailed historical queries)

Indexes events in Elasticsearch for dashboards and fast aggregations

For production:

Use a schema-less approach in ES but enforce field types via mapping templates

Batch indexing if throughput is high

Use consumer offsets and DLQ for failed messages

Security (Auth, JWT) & Best practices

Auth service issues JWT tokens (short-lived access + refresh token optional)

All service endpoints should validate JWT (via Spring Security filter)

Use mutual TLS for inter-service communication in production if necessary

Store secrets in a secret manager (Vault, AWS Secrets Manager) — do not hardcode in repo

Use role-based access control (RBAC) for reporting endpoints (finance vs ops)

Observability & Monitoring (Prometheus / Grafana optional)

Expose Spring Boot actuator endpoints (/actuator/health, /actuator/prometheus)

Use micrometer-registry-prometheus and configure Prometheus to scrape services

Grafana dashboards for:

Kafka consumer lag

Request latency/per service

Error rates

Reporting ingest throughput

ELK handles business analytics and log search; Prometheus/Grafana handle metrics & alerts

Scaling, resilience & production notes

Horizontal scaling: run multiple instances of services; Kafka consumer groups will distribute load

High availability:

Kafka: multi-broker with replication

Elasticsearch: multi-node cluster

Postgres: set up read replicas & backups

DLQ: configure Kafka dead-letter topics for poison messages

Backups: snapshot Elasticsearch indices on schedule; regular DB backups

Data retention: purge old indices with ILM (Index Lifecycle Management)

CI/CD suggestions

Use multi-stage Docker build in CI:

Build JAR, run tests, build image, push to registry

Deploy with Helm charts on Kubernetes (recommended for production)

Canary/Blue-Green deployment strategy for zero-downtime updates

Automated integration tests: spin up ephemeral Kafka + ES, run smoke tests

Troubleshooting & FAQs

Q: My consumer is not receiving messages

Check group.id and auto.offset.reset.

Ensure topic exists.

Check Kafka bootstrap servers value from container you run.

Q: Kibana shows no data

Confirm Logstash pipeline is running and consuming topics.

Check Logstash logs for parsing errors.

Query Elasticsearch directly: curl http://localhost:9200/_cat/indices?v

Q: Payment events don't update reservation

Verify payment_completed event contains reservationId and correct types.

Check ticket-service logs for deserialization errors.

Q: SMTP failing

For local tests use Mailtrap or smtp4dev. For production use SendGrid/SES and credentials via secrets.

Contacts & Next steps

Use provided Postman collections to validate full E2E workflow.

Import Kibana saved objects to visualize data.

Replace .env and SMTP placeholders with real credentials for staging.

If you want, I can:

Provide Dockerfile templates for each microservice (ready-to-copy)

Provide an automated script to build and bring up the entire compose stack

Provide Helm charts for Kubernetes deployment

Appendix: Helpful commands

Start the full Docker stack:

docker-compose up --build


Show logs for a service:

docker-compose logs -f parking-service


List Kafka topics (using kafka-topics CLI inside container):

docker exec -it kafka bash
kafka-topics --bootstrap-server kafka:9092 --list


Query Elasticsearch indices:

curl 'http://localhost:9200/_cat/indices?v'


Import Kibana saved objects:

Kibana → Stack Management → Saved Objects → Import → Upload JSON dashboard file

1️⃣ application-docker.yml for all microservices

Separate file per microservice (auth-service, parking-service, reservation-service, payment-service, notification-service, reporting-service)

Configures:

Kafka bootstrap server

DB connection

SMTP (notification-service)

Profiles and logging

Elasticsearch URLs (reporting-service)

2️⃣ Dockerfile for each microservice

Multi-stage build with Maven → final JAR in minimal openjdk:17 image

Exposes proper ports

Uses SPRING_PROFILES_ACTIVE=docker to pick docker config

3️⃣ Postman Collection

E2E flow including:

Auth login → retrieve JWT token

Start parking session → parking-service

Reservation creation → reservation-service

Payment → payment-service

Notification verification → WebSocket/email

Reporting → reporting-service endpoints

Environment variables for URLs and JWT token

4️⃣ Kibana Saved Objects

Dashboard JSON for:

Reservations by status

Payments over time

Revenue metrics

Parking sessions metrics

5️⃣ ELK Logstash Pipeline Example

parking.conf for consuming Kafka topics

Sends to Elasticsearch indices parking-lot-YYYY.MM.DD

Filters JSON events and maps fields correctly