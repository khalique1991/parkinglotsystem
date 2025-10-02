package com.parkinglotsystem.controller;

import com.parkinglotsystem.dto.ParkingSessionRequestDTO;
import com.parkinglotsystem.dto.ParkingSessionResponseDTO;
import com.parkinglotsystem.service.ParkingSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-sessions")
@RequiredArgsConstructor
@Tag(name = "Parking Session API", description = "Operations related to parking sessions")
@SecurityRequirement(name = "bearerAuth")
public class ParkingSessionController {

    private final ParkingSessionService service;

    @PostMapping("/start")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Start a parking session", description = "Starts a new parking session for a customer and vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Parking session started successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    public ResponseEntity<ParkingSessionResponseDTO> start(@Valid @RequestBody ParkingSessionRequestDTO dto) {
        ParkingSessionResponseDTO response = service.startSession(dto.getCustomerId(), dto.getVehicleId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/stop/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Stop a parking session", description = "Stops an active parking session and calculates the fee")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Parking session stopped successfully"),
            @ApiResponse(responseCode = "404", description = "Parking session not found")
    })
    public ResponseEntity<ParkingSessionResponseDTO> stop(@PathVariable Long id) {
        ParkingSessionResponseDTO response = service.stopSession(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vehicle/{vehicleId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Get parking sessions by vehicle", description = "Retrieve all parking sessions for a specific vehicle")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of parking sessions returned"),
            @ApiResponse(responseCode = "404", description = "Vehicle not found")
    })
    public ResponseEntity<List<ParkingSessionResponseDTO>> getByVehicle(@PathVariable Long vehicleId) {
        List<ParkingSessionResponseDTO> sessions = service.getSessionsByVehicle(vehicleId);
        return ResponseEntity.ok(sessions);
    }
}
