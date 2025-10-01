package com.parkinglotsystem.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    private final Key key;
    private final long expirationMs;

    public JwtUtils(JwtProperties jwtProperties) {
        // 1️⃣ Try to decode Base64 secret
        Key tempKey;
        try {
            byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.getSecret());
            tempKey = Keys.hmacShaKeyFor(keyBytes);
        } catch (IllegalArgumentException | WeakKeyException e) {
            // 2️⃣ If decoding fails or key too weak, generate a strong HS512 key
            System.out.println("⚠️ Weak or invalid JWT key detected. Generating a new strong HS512 key.");
            tempKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
            System.out.println("🔑 Generated new strong key (Base64): " +
                    Base64.getEncoder().encodeToString(tempKey.getEncoded()));
        }
        this.key = tempKey;
        this.expirationMs = jwtProperties.getExpirationMs();
    }

    // ================== Token Generation ==================
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

    // ================== Token Parsing ==================
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

    // ================== Token Validation ==================
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
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ================== Debug Helper ==================
    public void printTokenDetails(String token) {
        try {
            Claims claims = parseClaims(token);
            System.out.println("Subject: " + claims.getSubject());
            System.out.println("Roles: " + claims.get("roles"));
            System.out.println("Expiration: " + claims.getExpiration());
        } catch (Exception e) {
            System.out.println("❌ Invalid token: " + e.getMessage());
        }
    }
}
