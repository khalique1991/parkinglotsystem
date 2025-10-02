package parkinglotsystem.dtos;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRequestDTO {
    @NotBlank
    private String licensePlate;

    @NotBlank
    private String type;

    @NotNull
    private Long customerId;
}

