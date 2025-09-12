Parking Lot System

An enterprise-level Parking Lot Management System built with Java 17, Spring Boot, Spring Data JPA, and Microservices architecture (modular design).
The system manages vehicle entry/exit, reservations, payments, notifications, and reporting for multi-site parking facilities.

🔹 Features

✅ Multi-level parking lot management

✅ Vehicle entry/exit session tracking

✅ Reservation (pre-booking & cancellation)

✅ Dynamic pricing & payment integration

✅ User management with roles (Admin, Attendant, Customer)

✅ Notifications (Email, SMS, Push)

✅ Real-time occupancy monitoring

✅ Reporting & analytics

🔹 Architecture

This project follows a multi-module (Maven) architecture, which can later evolve into microservices.

parking-system/
 ├── pom.xml                # Parent POM (packaging=pom)
 ├── common-utils/          # Shared DTOs, error handling, constants
 ├── parking-core/          # Core domain models, allocation engine
 ├── reservation-service/   # Reservation module (booking, cancellation)
 ├── session-service/       # Entry/exit session tracking
 ├── payment-service/       # Billing & integration with PSPs
 ├── user-service/          # Authentication & roles
 ├── notification-service/  # Email/SMS notifications
 ├── reporting-service/     # Analytics & dashboards
 └── edge-gateway/          # On-site device integration (gates, sensors)

🔹 Tech Stack

Backend: Java 17, Spring Boot, Spring Data JPA, Spring Security

Database: PostgreSQL / MySQL (configurable)

Messaging/Eventing: Apache Kafka (for async events)

Build Tool: Maven (multi-module)

Cloud Ready: Deployable on Docker, Kubernetes, GCP/AWS/Azure

API Style: REST + OpenAPI/Swagger

🔹 Getting Started
1. Clone Repository
git clone https://github.com/<your-username>/parking-system.git
cd parking-system

2. Build Project
mvn clean install

3. Run Individual Module (example: reservation-service)
cd reservation-service
mvn spring-boot:run

4. Access API Docs

Each service exposes Swagger UI at:

http://localhost:8080/swagger-ui.html

🔹 Example Use Case Flow

Customer books a parking spot → Reservation Service creates reservation.

Payment Service verifies and charges customer.

Notification Service sends booking confirmation.

On arrival, Session Service validates vehicle and opens gate.

On exit, session is closed → final bill generated.

Reporting Service updates occupancy and revenue stats.

🔹 Future Enhancements

AI-based parking spot recommendation

Integration with ANPR (Automatic Number Plate Recognition) cameras

Dynamic surge pricing

Multi-tenant support (franchise parking operators)

Mobile app (React Native/Flutter)

🔹 Contribution

Fork the repo

Create a feature branch (feature/new-module)

Commit changes


Push to branch

Open Pull Request

🔹 License

This project is licensed under the MIT License – free to use, modify, and distribute.

System Architecture (High-Level)
flowchart LR
    subgraph User
        C[Customer]
        A[Admin]
    end

    subgraph Services
        R[Reservation Service]
        S[Session Service]
        P[Payment Service]
        U[User Service]
        N[Notification Service]
        Re[Reporting Service]
        PC[Parking Core]
    end

    subgraph Infra
        DB[(Database)]
        MQ[(Kafka/Event Bus)]
    end

    C -->|Book Spot| R
    R -->|Confirm Reservation| P
    P --> DB
    P --> MQ
    R --> MQ
    S --> MQ
    MQ --> N
    MQ --> Re
    U --> DB
    PC --> DB
    A --> Re
    A --> U


👉 This shows services, database, event bus, and user interactions.

🔹 Class Diagram (Core Domain Model)
classDiagram
    class ParkingLot {
      -Long id
      -String name
      -String location
      +List~ParkingSpot~ spots
    }

    class ParkingSpot {
      -Long id
      -SpotType type
      -boolean isOccupied
    }

    class Vehicle {
      -String licensePlate
      -VehicleType type
    }

    class Reservation {
      -Long id
      -Date startTime
      -Date endTime
      +cancel()
    }

    class ParkingSession {
      -Long id
      -Date entryTime
      -Date exitTime
      +closeSession()
    }

    class Payment {
      -Long id
      -double amount
      -PaymentStatus status
      +process()
    }

    ParkingLot "1" --> "*" ParkingSpot
    ParkingSpot "1" --> "0..1" Vehicle
    Vehicle "1" --> "0..*" Reservation
    Reservation "1" --> "1" ParkingSpot
    ParkingSession "1" --> "1" Vehicle
    Payment "1" --> "1" Reservation


👉 This shows domain relationships:

A ParkingLot has many ParkingSpots

A Reservation links Vehicle ↔ Spot

Payment is tied to a Reservation

🔹 Sequence Diagram (Booking a Spot)
sequenceDiagram
    participant C as Customer
    participant R as Reservation Service
    participant P as Payment Service
    participant N as Notification Service
    participant DB as Database

    C->>R: Request Reservation
    R->>P: Request Payment
    P->>DB: Save Payment
    P-->>R: Payment Success
    R->>DB: Save Reservation
    R->>N: Send Confirmation
    N-->>C: Booking Confirmation
