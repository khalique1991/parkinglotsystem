package parkinglotsystem.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import parkinglotsystem.dtos.VehicleRequestDTO;
import parkinglotsystem.dtos.VehicleResponseDTO;
import parkinglotsystem.service.VehicleService;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService service;

    @PostMapping
    public VehicleResponseDTO createVehicle(@Valid @RequestBody VehicleRequestDTO dto) {
        return service.saveVehicle(dto);
    }

    @GetMapping("/customer/{customerId}")
    public List<VehicleResponseDTO> getByCustomer(@PathVariable Long customerId) {
        return service.getVehiclesByCustomer(customerId);
    }

    @GetMapping("/{id}")
    public VehicleResponseDTO getVehicle(@PathVariable Long id) {
        return service.getVehicleById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicle(@PathVariable Long id) {
        service.deleteVehicle(id);
    }
}

