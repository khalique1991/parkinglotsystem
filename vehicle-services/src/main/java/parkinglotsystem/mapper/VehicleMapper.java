package parkinglotsystem.mapper;

import parkinglotsystem.dtos.VehicleResponseDTO;
import parkinglotsystem.entity.Vehicle;

public class VehicleMapper {
    public static VehicleResponseDTO mapToDTO(Vehicle v) {
        return VehicleResponseDTO.builder()
                .id(v.getId())
                .licensePlate(v.getLicensePlate())
                .type(v.getType())
                .customerId(v.getCustomerId())
                .build();
    }
}
