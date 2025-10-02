package com.parkinglotsystem.service;

import com.parkinglotsystem.dto.PaymentRequestDTO;
import com.parkinglotsystem.dto.PaymentResponseDTO;

public interface PaymentGateway {
    PaymentResponseDTO process(PaymentRequestDTO request);
}

