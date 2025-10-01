package com.parkinglotsystem.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponseDTO {
    private Long customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}