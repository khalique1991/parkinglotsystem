/*
package com.parkinglotsystem.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parkinglotsystem.entity.Payment;
import com.parkinglotsystem.entity.PaymentStatus;
import com.parkinglotsystem.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PaymentController.class)
class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PaymentService paymentService;

    @Test
    void testProcessPayment() throws Exception {
        Payment mockPayment = Payment.builder()
                .id(1L)
                .ticketId(100L)
                .amount(BigDecimal.valueOf(50))
                .status(PaymentStatus.COMPLETED)
                .build();

        Mockito.when(paymentService.processPayment(Mockito.eq(100L), Mockito.any(BigDecimal.class)))
                .thenReturn(mockPayment);

        mockMvc.perform(post("/payments")
                        .param("ticketId", "100")
                        .param("amount", "50.0")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ticketId").value(100))
                .andExpect(jsonPath("$.amount").value(50))
                .andExpect(jsonPath("$.status").value("COMPLETED"));
    }

    @Test
    void testGetPaymentByTicket() throws Exception {
        Payment mockPayment = Payment.builder()
                .id(2L)
                .ticketId(200L)
                .amount(BigDecimal.valueOf(75))
                .status(PaymentStatus.COMPLETED)
                .build();

        Mockito.when(paymentService.getPaymentByTicket(200L)).thenReturn(mockPayment);

        mockMvc.perform(get("/payments/200"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ticketId").value(200))
                .andExpect(jsonPath("$.amount").value(75));
    }

    @Test
    void testGetAllPayments() throws Exception {
        Payment mockPayment = Payment.builder()
                .id(3L)
                .ticketId(300L)
                .amount(BigDecimal.valueOf(100))
                .status(PaymentStatus.COMPLETED)
                .build();

        Mockito.when(paymentService.getAllPayments())
                .thenReturn(Collections.singletonList(mockPayment));

        mockMvc.perform(get("/payments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].ticketId").value(300))
                .andExpect(jsonPath("$[0].amount").value(100));
    }
}
*/
