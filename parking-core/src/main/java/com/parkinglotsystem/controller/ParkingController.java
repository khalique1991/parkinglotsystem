package com.parkinglotsystem.controller;

import com.parkinglotsystem.constant.AppConstant;
import com.parkinglotsystem.dtos.ApiResponse;
import com.parkinglotsystem.entity.ParkingLot;
import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.service.ParkingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        ParkingLot created = parkingService.createParkingLot(parkingLot);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    @PostMapping("/lots/{lotId}/spots")
    public ApiResponse<ParkingSpot> createSpot(@PathVariable Long lotId,
                                                  @RequestBody ParkingSpot spot) {
        return ApiResponse.<ParkingSpot>builder().status(AppConstant.SUCCESS).message("Parking Created").data(parkingService.createSpot(lotId,spot)).build();
    }
    @PostMapping("/vehicles")
    public ApiResponse<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        return ApiResponse.<Vehicle>builder().status(AppConstant.SUCCESS).message("Vehicle Created").data(parkingService.createVehicle(vehicle)).build();

    }
    @GetMapping("/lots/{lotId}/available-spots")
    public ResponseEntity<List<ParkingSpot>> getAvailableSpots(@PathVariable Long lotId) {
        return ResponseEntity.ok(parkingService.findAvailableSpots(lotId));
    }
}
