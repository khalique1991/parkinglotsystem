package com.parkinglotsystem.service;

public interface NotificationService {
    void notifyParkingStarted(Long customerId, Long sessionId);
    void notifyPaymentStatus(Long customerId, Long reservationId, String status);
}

