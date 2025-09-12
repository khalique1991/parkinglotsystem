package com.parkinglotsystem.dtos;

import lombok.Data;


@Data
public class EntryRequest {
    private String licensePlate;
    private String ownerName;
    private String type;
}