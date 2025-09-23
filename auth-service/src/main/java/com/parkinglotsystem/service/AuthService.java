package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Role;
import com.parkinglotsystem.entity.User;
import com.parkinglotsystem.enums.RoleName;
import com.parkinglotsystem.model.AuthResponse;
import com.parkinglotsystem.repository.RoleRepository;
import com.parkinglotsystem.repository.UserRepository;
import com.parkinglotsystem.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtUtils jwtUtils;

    public AuthResponse login(String username, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        String token = jwtUtils.generateToken(user.getUsername(), roles);
        System.out.println("Generated Token: " + token);
        return new AuthResponse(token);
    }

    public AuthResponse register(String username, String password, String roleUser) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(userRole));

        userRepository.save(user);

        String token = jwtUtils.generateToken(username, user.getRoles().stream()
                .map(r -> r.getName().name())
                .collect(java.util.stream.Collectors.toSet()));

        return new AuthResponse(token);
    }
}
