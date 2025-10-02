package com.parkinglotsystem.controller;

import com.parkinglotsystem.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * REST endpoint to process a payment
     */
    @PostMapping
    public ResponseEntity<String> makePayment(
            @RequestParam Long reservationId,
            @RequestParam Long parkingSessionId,
            @RequestParam Double amount
    ) {
        paymentService.processPayment(reservationId, parkingSessionId, amount);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Payment processed successfully for reservation " + reservationId);
    }
}
