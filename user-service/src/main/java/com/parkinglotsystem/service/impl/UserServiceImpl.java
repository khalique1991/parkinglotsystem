package com.parkinglotsystem.service.impl;

import com.parkinglotsystem.dto.CreateUserRequest;
import com.parkinglotsystem.dto.UserDTO;
import com.parkinglotsystem.entity.User;
import com.parkinglotsystem.event.UserCreatedEvent;
import com.parkinglotsystem.mapper.UserMapper;
import com.parkinglotsystem.repository.UserRepository;
import com.parkinglotsystem.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private static final String TOPIC_USER_CREATED = "user.created";

    @Override
    public UserDTO createUser(CreateUserRequest request) {
        User u = UserMapper.toEntity(request);
        // TODO: hash password using BCrypt in production
        u = repo.save(u);
        kafkaTemplate.send(TOPIC_USER_CREATED, new UserCreatedEvent(u.getId(), u.getUsername(), u.getEmail(), LocalDateTime.now()));
        return UserMapper.toDTO(u);
    }

    @Override
    public UserDTO getUser(Long id) {
        return repo.findById(id).map(UserMapper::toDTO).orElse(null);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return repo.findAll().stream().map(UserMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, CreateUserRequest req) {
        return repo.findById(id).map(u -> {
            u.setUsername(req.getUsername());
            u.setEmail(req.getEmail());
            u.setPhone(req.getPhone());
            if (req.getPassword() != null && !req.getPassword().isBlank()) u.setPassword(req.getPassword());
            u.setRole(req.getRole());
            User saved = repo.save(u);
            return UserMapper.toDTO(saved);
        }).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}
