package com.example.projet_IDEA.repository;


import com.example.projet_IDEA.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // 🔍 trouver un user par username (utile pour login)
    Optional<User> findByUsername(String username);
}