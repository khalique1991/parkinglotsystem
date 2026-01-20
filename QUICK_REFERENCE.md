# Quick Reference Guide - Enterprise Parking Lot System

## 🚀 Quick Start (5 minutes)

```bash
# 1. Clone and navigate
cd parkinglotsystem

# 2. Set environment
cp .env.docker .env

# 3. Start services
docker-compose -f docker-compose.prod.yml up -d

# 4. Check health
curl http://localhost:8081/actuator/health
```

---

## 📍 Service Endpoints

| Service | Port | Health Check |
|---------|------|--------------|
| API Gateway | 8080 | `curl http://localhost:8080/actuator/health` |
| Auth Service | 8081 | `curl http://localhost:8081/actuator/health` |
| User Service | 8087 | `curl http://localhost:8087/actuator/health` |
| Session Service | 8088 | `curl http://localhost:8088/actuator/health` |
| Payment Service | 8083 | `curl http://localhost:8083/actuator/health` |
| Notification Service | 8085 | `curl http://localhost:8085/actuator/health` |
| Reporting Service | 8086 | `curl http://localhost:8086/actuator/health` |
| Frontend (React) | 5173 | Direct access |
| Kibana (Logs) | 5601 | `http://localhost:5601` |
| Vault (Secrets) | 8200 | `http://localhost:8200` |
| Elasticsearch | 9200 | `curl http://localhost:9200` |

---

## 🔧 Common Commands

### Docker Management
```bash
# View all services
docker-compose ps

# View logs
docker-compose logs -f

# Logs for specific service
docker-compose logs -f auth-service

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# Full rebuild
docker-compose down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Database Access
```bash
# Connect to main PostgreSQL
psql -h localhost -U postgres -d parkingdb -p 5432

# Connect to user database
psql -h localhost -U user -d userdb -p 5433

# Connect to session database
psql -h localhost -U session -d sessiondb -p 5434
```

### View Logs in Kibana
1. Open http://localhost:5601
2. Create index pattern: `logstash-*`
3. Navigate to Discover
4. Filter by service name or trace ID

### Check Metrics
```bash
# All metrics
curl http://localhost:8081/actuator/metrics

# Specific metric
curl http://localhost:8081/actuator/metrics/http.server.requests

# Prometheus format
curl http://localhost:8081/actuator/prometheus
```

### Health Checks
```bash
# Liveness (is service running?)
curl http://localhost:8081/actuator/health/live

# Readiness (can accept traffic?)
curl http://localhost:8081/actuator/health/ready

# Full health details
curl http://localhost:8081/actuator/health
```

---

## 🔐 Environment Variables

### Required
```env
DB_USER=postgres
DB_PASSWORD=root
JWT_SECRET=<256-bit-encoded-secret>
VAULT_TOKEN=root
```

### Optional (with defaults)
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173
VITE_API_BASE_URL=http://localhost:8080/api
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
```

### Loading from .env
```bash
# Automatically loaded when in file
# Or explicit load
export $(cat .env.docker | xargs)
docker-compose up -d
```

---

## 📝 API Examples

### Authentication
```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"Secure123!"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"Secure123!"}'
```

### Using Token
```bash
TOKEN="eyJhbGciOiJIUzI1NiJ9..."
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer $TOKEN"
```

### Error Response Format
```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Validation failed",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "path": "/api/users",
  "timestamp": "2026-01-18T10:00:00",
  "errors": {
    "email": "Invalid email format"
  }
}
```

---

## 🐛 Troubleshooting Quick Fixes

### Service won't start
```bash
# Check logs
docker-compose logs auth-service

# Check health
curl http://localhost:8081/actuator/health

# Restart service
docker-compose restart auth-service
```

### Database connection error
```bash
# Check if database is healthy
docker-compose ps postgres

# Check PostgreSQL logs
docker-compose logs postgres

# Verify connection
psql -h localhost -U postgres -d parkingdb
```

### Frontend can't reach API
```bash
# Check CORS configuration
curl -H "Origin: http://localhost:5173" http://localhost:8080/api/auth/login -v

# Verify gateway is running
curl http://localhost:8080/actuator/health

# Check .env configuration
cat .env | grep VITE_API_BASE
```

### Missing logs in Kibana
```bash
# Check logstash is running
docker-compose logs logstash

# Verify Elasticsearch
curl http://localhost:9200

# Check Kafka topics
docker exec kafka kafka-topics.sh --list --bootstrap-server localhost:9092
```

---

## 📊 Monitoring Checklist

Daily:
- [ ] All services healthy: `docker-compose ps`
- [ ] Check error logs in Kibana
- [ ] Monitor memory usage: `docker stats`

Weekly:
- [ ] Review security logs
- [ ] Check disk space
- [ ] Verify backups
- [ ] Review error trends

Monthly:
- [ ] Dependency updates
- [ ] Security patches
- [ ] Performance analysis
- [ ] Capacity planning

---

## 🔒 Security Reminders

✅ **DO:**
- Use environment variables for secrets
- Validate all inputs
- Check health endpoints regularly
- Review logs for anomalies
- Keep dependencies updated
- Use HTTPS in production
- Rotate tokens regularly

❌ **DON'T:**
- Commit .env files
- Hardcode credentials
- Skip security patches
- Expose error details
- Use default passwords
- Run with admin privileges
- Skip validation

---

## 📚 Documentation Links

- **Deployment:** See `ENTERPRISE-DEPLOYMENT.md`
- **Development:** See `DEVELOPMENT_GUIDELINES.md`
- **Configuration:** See `.env.docker`
- **Docker Setup:** See `docker-compose.prod.yml`
- **Completion Status:** See `ENTERPRISE_COMPLETION_SUMMARY.md`

---

## 🆘 Getting Help

### Check Logs First
```bash
# Service logs
docker-compose logs -f <service-name>

# Elasticsearch/Kibana
http://localhost:5601 → Discover → filter logs
```

### Common Issues & Solutions

| Issue | Check | Fix |
|-------|-------|-----|
| 401 Unauthorized | Token expired | Refresh token or login again |
| 503 Service Unavailable | Health check | Restart service |
| Connection refused | Port in use | Change port or kill process |
| CORS error | Browser console | Check allowed origins |
| Out of memory | Docker resources | Increase memory limit |

### Support Escalation
1. Check documentation
2. Review logs in Kibana
3. Check health endpoints
4. Contact DevOps team

---

## 🎯 Key Metrics to Monitor

### Infrastructure
- **CPU Usage:** `docker stats`
- **Memory:** Should not exceed 80%
- **Disk:** Keep > 20% free
- **Network:** Monitor for spikes

### Application
- **Response Time:** Target < 500ms
- **Error Rate:** Target < 0.1%
- **Availability:** Target 99.9%
- **Throughput:** Requests per second

### Database
- **Connection Pool:** Healthy connections
- **Query Time:** Average < 100ms
- **Deadlocks:** Should be zero
- **Replication Lag:** Should be minimal

---

## 📱 Frontend Development

### Setup
```bash
cd parking-frontend
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Environment
Create `.env` from `.env.example`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_ERROR_TRACKING=true
```

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│              Error Boundary + Retry Logic            │
└────────────────┬────────────────────────────────────┘
                 │ HTTPS
┌────────────────▼────────────────────────────────────┐
│         API Gateway (Port 8080)                      │
│    CORS + Rate Limiting + Request Routing           │
└────────────────┬────────────────────────────────────┘
                 │
    ┌────────────┼────────────┬─────────────┐
    │            │            │             │
    ▼            ▼            ▼             ▼
 Auth-8081  Users-8087  Session-8088  Payment-8083
    │            │            │             │
    └────────────┴────────────┴─────────────┘
                 │
            PostgreSQL
         (Multiple DBs)
                 │
        ┌────────┼────────┐
        │        │        │
       Kafka   Elasticsearch  Vault
        │        │        │
        ▼        ▼        ▼
    Logstash  Kibana  (Secrets)
        │        │
        └────────┘
    (ELK Stack - Logs)
```

---

## 💡 Pro Tips

1. **Use Trace IDs for debugging**
   - Every error includes a unique trace ID
   - Search in Kibana by trace ID
   - Cross-service tracing ready

2. **Monitor in Kibana**
   - Create dashboards for key metrics
   - Set up alerts for errors
   - Filter by service/trace ID

3. **Performance tuning**
   - Connection pooling configured
   - Response compression enabled
   - Async logging for minimal overhead

4. **Security best practices**
   - Rotate JWT tokens
   - Use strong passwords
   - Keep dependencies updated
   - Monitor for anomalies

---

## 📞 Contact & Support

- **Documentation:** See `ENTERPRISE-DEPLOYMENT.md`
- **Guidelines:** See `DEVELOPMENT_GUIDELINES.md`
- **Issues:** Check logs in Kibana
- **Health:** Verify with actuator endpoints

---

**Last Updated:** January 18, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
