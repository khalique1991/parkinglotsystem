# Parking Lot Management System - Enterprise Edition

## Overview

This is a production-ready microservices-based Parking Lot Management System built with Spring Boot, React, and modern DevOps practices.

### Technology Stack

**Backend:**
- Java 17 + Spring Boot 3.2.5
- Spring Cloud (Gateway, Config, Sleuth, CircuitBreaker)
- PostgreSQL 15 (distributed databases per service)
- Apache Kafka (event streaming)
- Elasticsearch + Logstash + Kibana (ELK Stack)
- HashiCorp Vault (secrets management)
- Micrometer + Prometheus (monitoring)

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- React Query (data fetching)
- React Router (navigation)
- Zustand (state management)

**Infrastructure:**
- Docker & Docker Compose
- Kubernetes-ready architecture
- Health checks & readiness probes
- Resource limits & restart policies

---

## Quick Start

### Prerequisites
- Docker & Docker Compose 
- Node.js 18+ (for frontend development)
- Java 17+ (for backend development)
- Maven 3.8+

### Environment Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd parkinglotsystem
   ```

2. **Copy environment files:**
   ```bash
   cp .env.docker .env
   # Edit .env with your configuration
   ```

3. **Start all services:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Verify services:**
   ```bash
   # Check all services are healthy
   docker-compose ps
   
   # Monitor logs
   docker-compose logs -f
   ```

### Accessing Services

| Service | URL | Purpose |
|---------|-----|---------|
| API Gateway | http://localhost:8080 | Main API endpoint |
| Auth Service | http://localhost:8081 | Authentication & JWT |
| Frontend | http://localhost:5173 | React application |
| Kibana (Logs) | http://localhost:5601 | Log visualization |
| Vault | http://localhost:8200 | Secrets management |
| Prometheus | http://localhost:9090 | Metrics (if configured) |

---

## Architecture

### Microservices

1. **Auth Service (8081)** - JWT authentication, user registration/login
2. **User Service (8087)** - User profile management
3. **Session Service (8088)** - Parking session management
4. **Payment Service (8083)** - Payment processing
5. **Notification Service (8085)** - Email & SMS notifications
6. **Reporting Service (8086)** - Analytics & reporting
7. **Edge Gateway (8080)** - API Gateway with routing & rate limiting

### Communication Patterns

- **Synchronous:** REST/HTTP via Spring Cloud Gateway
- **Asynchronous:** Apache Kafka for event streaming
- **Service Discovery:** Spring Cloud Config + Vault

### Data Flow

```
Frontend (React)
    ↓
Edge Gateway (Port 8080)
    ↓
Microservices (8081-8088)
    ↓
PostgreSQL (Multiple DBs)
    ↓
Kafka Topics
    ↓
ELK Stack (Logs)
```

---

## Configuration

### Backend Configuration

#### Application Properties
Each service has `src/main/resources/application.yml`:

```yaml
server:
  port: 8081
  compression:
    enabled: true
    
spring:
  datasource:
    url: jdbc:postgresql://postgres:5432/parkingdb
    hikari:
      maximum-pool-size: 20
      
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
```

#### Vault Integration
```yaml
spring:
  cloud:
    vault:
      uri: ${VAULT_ADDR:http://localhost:8200}
      token: ${VAULT_TOKEN:root}
```

### Frontend Configuration

Create `.env` file in `parking-frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000
VITE_ENABLE_REQUEST_RETRY=true
VITE_MAX_RETRIES=3
VITE_SENTRY_DSN=https://your-sentry-dsn
VITE_ENABLE_ERROR_TRACKING=true
```

---

## Security Best Practices

### 1. Secrets Management
- **Never** commit secrets to version control
- Use `.env.docker` for Docker environments (add to `.gitignore`)
- Use HashiCorp Vault for production
- Rotate secrets regularly

### 2. Authentication & Authorization
- JWT tokens with 1-hour expiration
- Refresh token rotation mechanism
- Role-based access control (RBAC)
- Secure password hashing (BCrypt)

### 3. API Security
- CORS properly configured
- Rate limiting on API Gateway
- Input validation on all endpoints
- SQL injection prevention (Hibernate)
- CSRF protection enabled

### 4. Network Security
- Private Docker networks
- TLS/HTTPS in production
- Network policies for Kubernetes
- Vault encryption at rest

---

## Monitoring & Observability

### Logging
- **Format:** JSON (Logstash format)
- **Pipeline:** App → Logstash → Elasticsearch
- **Visualization:** Kibana
- **Trace ID:** Auto-generated for request tracking

Access Kibana at http://localhost:5601

### Metrics
- **Collection:** Micrometer
- **Export:** Prometheus
- **Application Metrics:**
  - HTTP request latency
  - Database connection pool
  - JVM memory/GC
  - Custom business metrics

### Health Checks
- Liveness probe: `/actuator/health/live`
- Readiness probe: `/actuator/health/ready`
- Check interval: 10 seconds
- Used by Docker and Kubernetes

### Distributed Tracing
- Spring Cloud Sleuth integration
- Trace IDs propagated across services
- Available in ELK Stack

---

## Database Schema

### PostgreSQL Databases

| Database | Purpose |
|----------|---------|
| parkingdb | Main application DB |
| userdb | User service DB |
| sessiondb | Session service DB |

Run migrations:
```bash
# Hibernate auto-creates schema
# Set spring.jpa.hibernate.ddl-auto=update
```

---

## API Documentation

### OpenAPI/Swagger

Each service exposes API documentation:

```
http://localhost:8081/swagger-ui.html - Auth Service
http://localhost:8087/swagger-ui.html - User Service
```

### API Versioning

All endpoints follow `/api/v1/...` pattern.

### Error Response Format

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Validation failed",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "path": "/api/v1/users",
  "timestamp": "2026-01-18T10:00:00",
  "errors": {
    "email": "Invalid email format"
  }
}
```

---

## Deployment

### Docker Compose (Development/Staging)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes (Production)

Kubernetes manifests available in `k8s/` directory.

```bash
kubectl apply -f k8s/
```

### CI/CD

Integrated with Jenkins (see `Jenkinsfile`):
- Maven build
- Unit/Integration tests
- SonarQube analysis
- Docker image push
- Deployment to staging

---

## Testing

### Backend Tests

```bash
cd parkinglotsystem
mvn clean test
```

### Frontend Tests

```bash
cd parking-frontend
npm run test
```

### Integration Tests

```bash
docker-compose -f docker-compose.prod.yml up -d
# Run full stack tests
mvn clean verify
```

---

## Troubleshooting

### Services Not Starting

1. Check health endpoints:
   ```bash
   curl http://localhost:8081/actuator/health
   ```

2. View logs:
   ```bash
   docker-compose logs -f <service-name>
   ```

3. Verify environment variables:
   ```bash
   docker-compose config | grep -A 20 "environment:"
   ```

### Database Connection Issues

```bash
# Connect to PostgreSQL
psql -h localhost -U postgres -d parkingdb

# Check pool size
SELECT datname, usename, count(*) FROM pg_stat_activity GROUP BY datname, usename;
```

### Kafka Issues

```bash
# Check Kafka topics
docker exec kafka kafka-topics.sh --list --bootstrap-server localhost:9092

# Describe topic
docker exec kafka kafka-topics.sh --describe --topic <topic-name> --bootstrap-server localhost:9092
```

---

## Performance Tuning

### Connection Pool (HikariCP)
```yaml
spring.datasource.hikari:
  maximum-pool-size: 20
  minimum-idle: 5
  connection-timeout: 30000
```

### JVM Settings
```bash
export JAVA_OPTS="-Xmx2g -Xms1g -XX:+UseG1GC"
```

### HTTP Compression
```yaml
server.compression:
  enabled: true
  min-response-size: 1024
```

---

## Maintenance

### Health Check Intervals
- Database: Every 10 seconds
- Services: Every 10 seconds
- Kafka: Every 10 seconds

### Log Rotation
- Max file size: 100MB
- Max history: 30 days
- Total cap: 5GB

### Backup Strategy
- Database daily backups (configure in production)
- Elasticsearch snapshots
- Kubernetes persistent volumes

---

## Contributing

1. Follow Spring Boot & React best practices
2. Add unit tests for new features
3. Update documentation
4. Use feature branches
5. Submit pull requests

---

## Support

For issues and questions:
1. Check documentation
2. Review logs in Kibana
3. Check health endpoints
4. Contact DevOps team

---

## License

[Your License Here]

---

## Changelog

### Version 1.0.0 (2026-01-18)
- Initial enterprise release
- Microservices architecture
- Full ELK stack integration
- Kubernetes-ready
- Production security hardening

---

**Last Updated:** January 18, 2026
**Maintained By:** DevOps Team
