package parkinglotsystem.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponseDTO {
    private Long id;
    private String licensePlate;
    private String type;
    private Long customerId;
}
