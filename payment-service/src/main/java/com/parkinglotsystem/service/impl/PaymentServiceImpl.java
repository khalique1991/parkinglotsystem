package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.enums.PaymentStatus;
import com.parkinglotsystem.repository.PaymentRepository;
import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;

    @Override
    public Payment processPayment(Long ticketId, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        Payment payment = Payment.builder()
                .ticketId(ticketId)
                .amount(amount)
                .status(PaymentStatus.COMPLETED)
                .build();

        return paymentRepository.save(payment);
    }
}