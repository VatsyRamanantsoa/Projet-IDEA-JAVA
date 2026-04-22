package com.example.projet_IDEA.controller;

import com.example.projet_IDEA.dto.ProjetDTO;
import com.example.projet_IDEA.entity.Projet;
import com.example.projet_IDEA.entity.User;
import com.example.projet_IDEA.service.ProjetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
@CrossOrigin
public class ProjetController {

    private final ProjetService projetService;

    public ProjetController(ProjetService projetService) {
        this.projetService = projetService;
    }

    // 🔹 CREATE
    @PostMapping
    public Projet createProjet(@RequestBody ProjetDTO request) {

        System.out.println("DTO RECEIVED = " + request.getTasks());
        System.out.println("DURATION RECEIVED = " + request.getDuration());

        Projet projet = new Projet();

        projet.setTitle(request.getTitle());
        projet.setType(request.getType());
        projet.setDescription(request.getDescription());

        // 🔥 AJOUT
        projet.setDifficulty(request.getDifficulty());
        projet.setTechnologies(request.getTechnologies());
        projet.setFeatures(request.getFeatures());
        projet.setDuration(request.getDuration());
        projet.setTasks(request.getTasks());

        return projetService.createProjet(projet, request.getUserId());
    }



    // 🔹 GET ALL
    @GetMapping
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }

    // 🔹 GET BY ID
    @GetMapping("/{id}")
    public Projet getProjet(@PathVariable Long id) {
        return projetService.getProjetById(id);
    }



    // 🔹 DELETE
    @DeleteMapping("/{id}")
    public String deleteProjet(@PathVariable Long id) {
        projetService.deleteProjet(id);
        return "Projet supprimé";
    }


}
