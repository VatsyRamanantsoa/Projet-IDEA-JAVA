package com.example.projet_IDEA.repository;

import com.example.projet_IDEA.entity.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProjetRepository extends JpaRepository<Projet, Long> {
    List<Projet> findByUserUserId(Long userId);

}
