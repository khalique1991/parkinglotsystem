package parkinglotsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import parkinglotsystem.entity.Vehicle;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle,Long> {
    List<Vehicle> findByCustomerId(Long customerId);
    boolean existsByLicensePlate(String licensePlate);
}
