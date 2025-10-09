package com.parkinglotsystem.controller;

import com.parkinglotsystem.dto.SessionRequestDTO;
import com.parkinglotsystem.dto.SessionResponseDTO;
import com.parkinglotsystem.service.SessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class SessionController {

    private final SessionService sessionService;

    @PostMapping("/start")
    public ResponseEntity<SessionResponseDTO> start(@Valid @RequestBody SessionRequestDTO req) {
        SessionResponseDTO resp = sessionService.startSession(req);
        return ResponseEntity.created(URI.create("/api/sessions/" + resp.getId())).body(resp);
    }

    @PostMapping("/end/{id}")
    public ResponseEntity<Void> end(@PathVariable Long id) {
        sessionService.endSession(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SessionResponseDTO>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(sessionService.getSessionsForUser(userId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<SessionResponseDTO>> active() {
        return ResponseEntity.ok(sessionService.getActiveSessions());
    }
}
