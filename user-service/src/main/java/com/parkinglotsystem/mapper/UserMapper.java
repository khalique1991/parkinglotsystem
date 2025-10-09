package com.parkinglotsystem.mapper;


import com.parkinglotsystem.dto.CreateUserRequest;
import com.parkinglotsystem.dto.UserDTO;
import com.parkinglotsystem.entity.User;

public final class UserMapper {
    public static UserDTO toDTO(User u) {
        if (u == null) return null;
        return UserDTO.builder()
                .id(u.getId())
                .username(u.getUsername())
                .email(u.getEmail())
                .phone(u.getPhone())
                .role(u.getRole())
                .active(u.isActive())
                .build();
    }

    public static User toEntity(CreateUserRequest req) {
        if (req == null) return null;
        return User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .phone(req.getPhone())
                .password(req.getPassword()) // hash in production
                .role(req.getRole() == null ? "ROLE_USER" : req.getRole())
                .active(true)
                .build();
    }
}
