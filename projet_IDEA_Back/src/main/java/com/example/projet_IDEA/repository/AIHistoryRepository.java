package com.example.projet_IDEA.repository;

import com.example.projet_IDEA.entity.AIHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AIHistoryRepository extends JpaRepository<AIHistory, Long> {

    // 🔍 historique d’un user
    List<AIHistory> findByUserUserId(Long userId);
}
