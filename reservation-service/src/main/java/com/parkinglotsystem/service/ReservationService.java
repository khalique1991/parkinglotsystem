package com.parkinglotsystem.service;



import com.parkinglotsystem.entity.Reservation;

public interface ReservationService {
    Reservation createReservation(Long vehicleId, Long spotId);
    Reservation endReservation(Long reservationId);
    Reservation getActiveReservations();
    Reservation getReservationById(Long id);
}
