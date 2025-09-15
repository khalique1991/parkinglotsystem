package com.parkinglotsystem.controller;

import com.parkinglotsystem.entity.ParkingLot;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.service.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking")
@RequiredArgsConstructor
public class ParkingController {
    private final ParkingService parkingService;

    @PostMapping("/parkinglots")
    public ResponseEntity<ParkingLot> createParkingLot(@RequestBody ParkingLot parkingLot) {
        return ResponseEntity.status(201).body(parkingService.createParkingLot(parkingLot));
    }

    @GetMapping("/lots/{lotId}/available-spots")
    public ResponseEntity<List<ParkingSpot>> getAvailableSpots(@PathVariable Long lotId) {
        return ResponseEntity.ok(parkingService.findAvailableSpots(lotId));
    }
}
