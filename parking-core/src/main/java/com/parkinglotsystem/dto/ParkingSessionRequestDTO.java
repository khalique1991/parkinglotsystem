package com.parkinglotsystem.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParkingSessionRequestDTO {
    private Long vehicleId;
    private Long customerId;// must exist in vehicle-service
}
