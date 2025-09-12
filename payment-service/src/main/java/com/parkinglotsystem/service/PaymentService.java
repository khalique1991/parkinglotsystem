package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Payment;

import java.math.BigDecimal;

public interface PaymentService {
    Payment processPayment(Long ticketId, BigDecimal amount);
}
