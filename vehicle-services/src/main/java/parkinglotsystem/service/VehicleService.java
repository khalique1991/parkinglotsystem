package parkinglotsystem.service;

import parkinglotsystem.dtos.VehicleRequestDTO;
import parkinglotsystem.dtos.VehicleResponseDTO;

import java.util.List;

public interface VehicleService {
    VehicleResponseDTO saveVehicle(VehicleRequestDTO dto);
    List<VehicleResponseDTO> getVehiclesByCustomer(Long customerId);
    VehicleResponseDTO getVehicleById(Long id);
    void deleteVehicle(Long id);
}
