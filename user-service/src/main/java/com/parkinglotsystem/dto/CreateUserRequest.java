package com.parkinglotsystem.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {
    @NotBlank
    private String username;
    @NotBlank @Email
    private String email;
    private String phone;
    @NotBlank
    private String password;
    private String role;
}
