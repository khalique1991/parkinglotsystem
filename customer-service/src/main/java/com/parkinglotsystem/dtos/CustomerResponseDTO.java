package com.parkinglotsystem.dtos;

import lombok.*;
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