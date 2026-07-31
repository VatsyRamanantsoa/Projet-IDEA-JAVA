package com.example.projet_IDEA.dto;

public class AIRequestDTO {

    private String prompt;
    private Long userId;

    // 🔥 nouveaux champs
    private int nbIdeas;
    private String level;

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getNbIdeas() {
        return nbIdeas;
    }

    public void setNbIdeas(int nbIdeas) {
        this.nbIdeas = nbIdeas;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
