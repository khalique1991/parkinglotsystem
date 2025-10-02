package parkinglotsystem.service.impl;

import com.parkinglotsystem.exception.DuplicateCustomerException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import parkinglotsystem.client.CustomerClient;
import parkinglotsystem.dtos.VehicleRequestDTO;
import parkinglotsystem.dtos.VehicleResponseDTO;
import parkinglotsystem.entity.Vehicle;
import parkinglotsystem.exception.VehicleValidateException;
import parkinglotsystem.mapper.VehicleMapper;
import parkinglotsystem.repository.VehicleRepository;
import parkinglotsystem.service.VehicleService;

import java.util.List;
import java.util.stream.Collectors;

import static parkinglotsystem.mapper.VehicleMapper.mapToDTO;

@Service
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository repo;
    private final CustomerClient customerClient;

    @Override
    public VehicleResponseDTO saveVehicle(VehicleRequestDTO dto) {
        // Validate customer exists
        try { customerClient.getCustomer(dto.getCustomerId()); }
        catch(Exception e) { throw new DuplicateCustomerException("Customer not found"); }

        if(repo.existsByLicensePlate(dto.getLicensePlate()))
            throw new VehicleValidateException("License plate already exists::" +dto.getLicensePlate() );

        Vehicle v = Vehicle.builder()
                .licensePlate(dto.getLicensePlate())
                .type(dto.getType())
                .customerId(dto.getCustomerId())
                .build();
        Vehicle saved = repo.save(v);

        return mapToDTO(saved);
    }

    @Override
    public List<VehicleResponseDTO> getVehiclesByCustomer(Long customerId) {
        return repo.findByCustomerId(customerId).stream().map(VehicleMapper::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public VehicleResponseDTO getVehicleById(Long id) {
        Vehicle v = repo.findById(id).orElseThrow(() -> new VehicleValidateException("Vehicle not found::" +id));
        return mapToDTO(v);
    }

    @Override
    public void deleteVehicle(Long id) {
        repo.deleteById(id);
    }


}

