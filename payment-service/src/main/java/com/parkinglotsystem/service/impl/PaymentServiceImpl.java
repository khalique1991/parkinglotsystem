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
        // for now assume payment always succeeds
        Payment payment = Payment.builder()
                .ticketId(ticketId)
                .amount(amount)
                .status(PaymentStatus.COMPLETED)
                .paymentTime(Instant.now())
                .build();

        return paymentRepository.save(payment);
    }
}