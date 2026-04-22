package com.example.projet_IDEA.service;

import com.example.projet_IDEA.entity.Projet;
import com.example.projet_IDEA.entity.User;
import com.example.projet_IDEA.repository.ProjetRepository;
import com.example.projet_IDEA.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetService {

    private final ProjetRepository projetRepository;
    private final UserRepository userRepository;

    public ProjetService(ProjetRepository projetRepository,
                         UserRepository userRepository) {
        this.projetRepository = projetRepository;
        this.userRepository = userRepository;
    }

    // 🔹 CREATE (CORRIGÉ)
    public Projet createProjet(Projet projet, Long userId) {

        // ✅ récupérer le user depuis la base
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ attacher le user au projet
        projet.setUser(user);

        return projetRepository.save(projet);
    }

    // 🔹 GET ALL
    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

    // 🔹 GET BY ID
    public Projet getProjetById(Long id) {
        return projetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Projet not found"));
    }

    // 🔹 GET BY USER
    public List<Projet> getProjetsByUser(Long userId) {
        return projetRepository.findByUserUserId(userId);
    }

    // 🔹 DELETE
    public void deleteProjet(Long id) {
        projetRepository.deleteById(id);
    }
}
