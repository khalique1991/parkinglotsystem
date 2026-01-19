# Enterprise Development & Security Guidelines

## Input Validation Standards

All REST endpoints must validate input using Jakarta Validation (formerly javax.validation):

### Backend DTO Validation Examples

```java
@Data
public class UserRegistrationDTO {
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    @Pattern(regexp = "^[a-zA-Z0-9_-]*$")
    private String username;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 8, max = 100)
    private String password;
}
```

### Validation Decorators for Use

Place `@Valid` on controller methods:
```java
@PostMapping("/register")
public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserRegistrationDTO request) {
    // validated input
}
```

### Common Validators

- `@NotNull`, `@NotBlank` - Required fields
- `@Size(min, max)` - String/Collection length
- `@Min`, `@Max`, `@Positive`, `@Negative` - Numeric bounds
- `@Email` - Email format
- `@Pattern(regexp)` - Regex validation
- `@Past`, `@PastOrPresent`, `@Future`, `@FutureOrPresent` - Temporal

---

## Frontend Form Validation

### React Hook Form Example

```jsx
import { useForm } from 'react-hook-form'

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur'
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
          }
        })}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
    </form>
  )
}
```

---

## API Request/Response Handling

### Client-side Retry Logic

```javascript
// Exponential backoff retry
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries) throw error
      
      const delay = Math.pow(2, attempt) * 1000
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Usage
const response = await retryWithBackoff(() => api.get('/users'))
```

### Loading States

```jsx
function UserList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users')
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  return <ul>{data.map(user => <li key={user.id}>{user.name}</li>)}</ul>
}
```

---

## Error Handling Patterns

### Backend Global Exception Handler

All services inherit from common module's `GlobalExceptionHandler` which provides:

1. **Consistent Error Responses** - All errors use standard ErrorResponse DTO
2. **Trace IDs** - Every error includes unique UUID for tracking
3. **Logging** - All errors logged with appropriate level (warn/error)
4. **HTTP Status Codes** - Proper REST status codes returned
5. **Validation Errors** - Field-level validation error details

### Frontend Error Boundaries

Wrap application with ErrorBoundary component:

```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

This prevents entire app crash on component errors.

---

## Logging Best Practices

### Backend Logging

```java
@Slf4j
@Service
public class UserService {
    
    public User createUser(UserDTO dto) {
        log.info("Creating new user with email: {}", dto.getEmail());
        
        try {
            User user = userRepository.save(new User(dto));
            log.info("User created successfully with ID: {}", user.getId());
            return user;
        } catch (Exception e) {
            log.error("Failed to create user", e);
            throw new BadRequestException("User creation failed");
        }
    }
}
```

### Log Levels

- `DEBUG` - Detailed information for development (variable values, method entry/exit)
- `INFO` - General informational messages (application startup, user actions)
- `WARN` - Warning messages (deprecated methods, unusual conditions)
- `ERROR` - Error messages (exceptions, failures)

### Frontend Logging

```javascript
// Development
if (import.meta.env.DEV) {
  console.log('User logged in:', user)
}

// Error tracking
console.error('Failed to fetch data:', error)

// Structured logging for production
if (import.meta.env.VITE_ENABLE_ERROR_TRACKING) {
  logToSentry({ error, context: 'payment-submission' })
}
```

---

## CORS Configuration

### Backend (Spring Security)

```java
@Bean
public CorsWebFilter corsWebFilter() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "https://yourfrontend.com"
    ));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);
    
    return new CorsWebFilter(new UrlBasedCorsConfigurationSource(){{
        registerCorsConfiguration("/**", config);
    }});
}
```

---

## Database Query Optimization

### Connection Pooling (HikariCP)

```yaml
spring.datasource.hikari:
  maximum-pool-size: 20        # Max connections
  minimum-idle: 5              # Min idle connections
  connection-timeout: 30000    # 30 seconds
  idle-timeout: 600000         # 10 minutes
  max-lifetime: 1800000        # 30 minutes
```

### JPA Optimization

```java
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_email", columnList = "email"),
    @Index(name = "idx_username", columnList = "username")
})
public class User {
    // Entity definition
}
```

### Query Optimization

```java
// Use EntityGraph for eager loading
@Query("SELECT u FROM User u LEFT JOIN FETCH u.roles")
public List<User> findAllWithRoles();

// Pagination
public Page<User> findAll(Pageable pageable);
```

---

## Security Hardening Checklist

- [ ] All secrets in environment variables (Vault in production)
- [ ] HTTPS/TLS enabled in production
- [ ] CORS properly configured for allowed origins only
- [ ] Rate limiting enabled on API Gateway
- [ ] JWT token expiration set (1 hour recommended)
- [ ] Password validation rules enforced
- [ ] SQL injection prevention (use parameterized queries)
- [ ] CSRF protection enabled
- [ ] Input validation on all endpoints
- [ ] Output encoding to prevent XSS
- [ ] Authentication/Authorization on sensitive endpoints
- [ ] Audit logging for critical operations
- [ ] Regular dependency updates checked
- [ ] Health checks configured
- [ ] Error details not exposed to clients (generic messages)

---

## Performance Checklist

- [ ] Database indexes created for frequently queried columns
- [ ] Connection pooling configured
- [ ] Query N+1 problems eliminated
- [ ] Lazy loading used for large collections
- [ ] Response compression enabled
- [ ] Frontend bundle analyzed for size
- [ ] Code splitting implemented for routes
- [ ] Images optimized and lazy loaded
- [ ] Caching strategy implemented
- [ ] HTTP caching headers set appropriately

---

## Monitoring & Observability

### Health Checks

All services expose health endpoints:
```
GET /actuator/health/live  - Liveness (is service running?)
GET /actuator/health/ready - Readiness (can accept traffic?)
```

### Metrics

Application metrics available at:
```
GET /actuator/metrics
```

View specific metric:
```
GET /actuator/metrics/http.server.requests
```

### Distributed Tracing

Request flows tracked via Trace IDs:
- Generated automatically by Spring Cloud Sleuth
- Included in all logs
- Propagated across service boundaries
- Visible in Kibana

---

## Testing Standards

### Unit Tests

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @InjectMocks
    private UserService userService;
    
    @Mock
    private UserRepository userRepository;
    
    @Test
    void testCreateUser() {
        // Arrange
        UserDTO dto = new UserDTO("john@example.com", "John Doe");
        
        // Act
        User result = userService.createUser(dto);
        
        // Assert
        assertEquals("john@example.com", result.getEmail());
        verify(userRepository).save(any(User.class));
    }
}
```

### Integration Tests

```java
@SpringBootTest
@Testcontainers
class UserControllerTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = 
        new PostgreSQLContainer<>("postgres:15");
    
    @Test
    void testCreateUserEndpoint() {
        // Test full flow
    }
}
```

### Frontend Tests

```javascript
import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'

test('displays validation error on invalid email', async () => {
  render(<LoginForm />)
  
  const input = screen.getByPlaceholderText('Email')
  userEvent.type(input, 'invalid-email')
  
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
})
```

---

## Deployment Checklist

- [ ] All environment variables defined in .env.docker
- [ ] Database migrations tested
- [ ] Health checks responding
- [ ] Logs being sent to ELK Stack
- [ ] Metrics being collected
- [ ] Resource limits set
- [ ] Restart policies configured
- [ ] Volume mounts persisted
- [ ] Network isolation verified
- [ ] Load balancer configured
- [ ] SSL certificates valid
- [ ] Backup strategy tested
- [ ] Rollback procedure documented

---

## References

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [OWASP Security Guidelines](https://owasp.org)
- [12 Factor App](https://12factor.net)

---

**Last Updated:** January 18, 2026
