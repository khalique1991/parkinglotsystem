/*
package com.parkinglotsystem.service;

import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.entity.PaymentStatus;
import com.parkinglotsystem.repository.PaymentRepository;
import com.parkinglotsystem.service.impl.PaymentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PaymentServiceTest {
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    @BeforeEach
    void setUp() {
        paymentRepository = mock(PaymentRepository.class);
        paymentService = new PaymentServiceImpl(paymentRepository);
    }

    @Test
    void testProcessPayment() {
        // Arrange
        Long ticketId = 1L;
        BigDecimal amount = BigDecimal.valueOf(50.0);

        // Make repository return the *same object* passed in
        when(paymentRepository.save(any(Payment.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Payment result = paymentService.processPayment(ticketId, amount);

        // Assert
        assertNotNull(result);
        assertEquals(ticketId, result.getTicketId());
        assertEquals(amount, result.getAmount());
        assertEquals(PaymentStatus.COMPLETED, result.getStatus());

        // Verify repository interaction
        ArgumentCaptor<Payment> captor = ArgumentCaptor.forClass(Payment.class);
        verify(paymentRepository, times(1)).save(captor.capture());

        Payment captured = captor.getValue();
        assertEquals(ticketId, captured.getTicketId());
        assertEquals(amount, captured.getAmount());
    }

    @Test
    void testProcessPayment_ZeroAmount_Fails() {
        Long ticketId = 2L;
        BigDecimal zeroAmount = BigDecimal.ZERO;

        assertThrows(IllegalArgumentException.class, () ->
                paymentService.processPayment(ticketId, zeroAmount));

        verify(paymentRepository, never()).save(any(Payment.class));
    }
}
*/
