package com.parkinglotsystem.controller;

import com.parkinglotsystem.model.AuthRequest;
import com.parkinglotsystem.model.AuthResponse;
import com.parkinglotsystem.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        System.out.println("Login with Jwt AccessToken");
        return ResponseEntity.ok(authService.login(request.getUsername(), request.getPassword()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        System.out.println("Register with Username and password");
        return ResponseEntity.ok(authService.register(request.getUsername(), request.getPassword(), "ROLE_USER"));
    }
}
