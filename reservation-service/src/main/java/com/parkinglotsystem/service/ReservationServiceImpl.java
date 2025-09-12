package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.ParkingSpot;
import com.parkinglotsystem.entity.Reservation;
import com.parkinglotsystem.entity.Vehicle;
import com.parkinglotsystem.enums.ReservationStatus;
import com.parkinglotsystem.exception.ResourceNotFoundException;
import com.parkinglotsystem.repository.ParkingSpotRepository;
import com.parkinglotsystem.repository.ReservationRepository;
import com.parkinglotsystem.repository.VehicleRepository;
import com.parkinglotsystem.service.ReservationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final VehicleRepository vehicleRepository;
    private final ParkingSpotRepository parkingSpotRepository;

    @Override
    @Transactional
    public Reservation createReservation(Long vehicleId, Long spotId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow(() -> new ResourceNotFoundException("vehicle Not Found: " + vehicleId));
        ParkingSpot parkingSpot = parkingSpotRepository.findById(spotId).orElseThrow(() -> new ResourceNotFoundException("parking spot not found" + spotId));
        if (parkingSpot.isOccupied()) {
            throw new IllegalStateException("Spot Already occupied");
        }
        parkingSpot.isOccupied();
        parkingSpotRepository.save(parkingSpot);
        Reservation reservation = Reservation.builder()
                .vehicle(vehicle).spot(parkingSpot)
                .status(ReservationStatus.ACTIVE)
                .startTime(LocalDateTime.now())
                .build();

        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation endReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(() -> new ResourceNotFoundException("Reservation Not Found::" + reservationId));
        reservation.setEndTime(LocalDateTime.now());
        reservation.setStatus(ReservationStatus.COMPLETED);
        ParkingSpot parkingSpot = reservation.getSpot();
        parkingSpot.setOccupied(false);
        parkingSpotRepository.save(parkingSpot);
        return reservationRepository.save(reservation);
    }

    @Override
    public Reservation getActiveReservations() {
        return (Reservation) reservationRepository.findByStatus(ReservationStatus.ACTIVE);
    }

    @Override
    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Reservation Not found" + id));
    }
}
