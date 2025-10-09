package com.parkinglotsystem.service;

import com.parkinglotsystem.dto.CreateUserRequest;
import com.parkinglotsystem.dto.UserDTO;
import java.util.List;

public interface UserService {
    UserDTO createUser(CreateUserRequest request);
    UserDTO getUser(Long id);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, CreateUserRequest req);
    void deleteUser(Long id);
}
