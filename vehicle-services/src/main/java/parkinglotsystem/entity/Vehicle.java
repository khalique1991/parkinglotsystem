package parkinglotsystem.entity;

import com.parkinglotsystem.dtos.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "vehicles", uniqueConstraints = @UniqueConstraint(columnNames = "licensePlate"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle extends BaseEntity {

    @NotBlank
    private String licensePlate;

    @NotBlank
    private String type; // CAR, BIKE, etc.

    private Long customerId; // reference to Customer (no FK if separate DB)
}

