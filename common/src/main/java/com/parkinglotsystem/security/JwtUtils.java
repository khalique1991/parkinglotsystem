package com.parkinglotsystem.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    private final Key key;
    private final long expirationMs;

    public JwtUtils(JwtProperties jwtProperties) {
        this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
        this.expirationMs = jwtProperties.getExpirationMs();
    }

    public String generateToken(String username, Set<String> roles) {
        String token = Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
        System.out.println("🔑 Generated JWT for user=" + username + " : " + token);
        return token;
    }

    public String generateToken(String username, String role) {
        return generateToken(username, Collections.singleton(role));
    }

    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    public List<String> getRolesFromToken(String token) {
        Object roles = parseClaims(token).get("roles");
        if (roles instanceof Collection<?>) {
            return ((Collection<?>) roles).stream().map(Object::toString).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("❌ JWT expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("❌ JWT unsupported: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("❌ JWT malformed: " + e.getMessage());
        } catch (SecurityException e) {
            System.out.println("❌ JWT signature invalid: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("❌ JWT claims string empty: " + e.getMessage());
        }
        return false;
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
}
