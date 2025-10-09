package com.parkinglotsystem.repository;


import com.parkinglotsystem.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    List<UserSession> findByUserIdOrderByLoginTimeDesc(Long userId);
    List<UserSession> findByActiveTrue();
}
