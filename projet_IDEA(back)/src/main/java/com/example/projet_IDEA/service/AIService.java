//package com.example.projet_IDEA.service;
//
//import com.example.projet_IDEA.dto.AIRequestDTO;
//import com.example.projet_IDEA.dto.AIResponseDTO;
//import com.example.projet_IDEA.entity.AIHistory;
//import com.example.projet_IDEA.entity.User;
//import com.example.projet_IDEA.repository.AIHistoryRepository;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.http.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class AIService {
//
//    private final AIHistoryRepository aiHistoryRepository;
//    private final UserService userService;
//
//    @Value("${mistral.api.key}")
//    private String apiKey;
//
//    private final String URL = "https://api.mistral.ai/v1/chat/completions";
//
//    public AIService(AIHistoryRepository aiHistoryRepository, UserService userService) {
//        this.aiHistoryRepository = aiHistoryRepository;
//        this.userService = userService;
//    }
//
//    public AIResponseDTO generateIdea(AIRequestDTO request) {
//
//        // 🔹 récupérer user
//        User user = userService.getUserById(request.getUserId());
//
//        // 🔹 appel API Mistral
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("Authorization", "Bearer " + apiKey);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // 🔥 PROMPT FORCÉ EN JSON
//        String prompt = request.getPrompt() + """
//
//Donne exactement 4 idées de projets web.
//
//Réponds UNIQUEMENT en JSON valide, sans texte autour.
//
//Format :
//[
//  {
//    "title": "string",
//    "type": "string",
//    "description": "string"
//  }
//]
//""";
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("model", "mistral-small");
//
//        Map<String, String> message = new HashMap<>();
//        message.put("role", "user");
//        message.put("content", prompt);
//
//        body.put("messages", new Object[]{message});
//
//        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
//
//        ResponseEntity<Map> response = restTemplate.exchange(
//                URL,
//                HttpMethod.POST,
//                entity,
//                Map.class
//        );
//
//        // 🔹 extraction réponse IA
//        Map choices = ((java.util.List<Map>) response.getBody().get("choices")).get(0);
//        Map messageResponse = (Map) choices.get("message");
//
//        String aiText = (String) messageResponse.get("content");
//
//        // 🔥 nettoyage des blocs markdown éventuels
//        aiText = aiText.replace("```json", "")
//                .replace("```", "")
//                .trim();
//
//        // 🔹 sauvegarde en base (log brut)
//        AIHistory history = new AIHistory();
//        history.setPrompt(request.getPrompt());
//        history.setResponse(aiText);
//        history.setUser(user);
//
//        aiHistoryRepository.save(history);
//
//        // 🔥 IMPORTANT :
//        // on renvoie le JSON brut (string JSON)
//        return new AIResponseDTO(aiText);
//    }
//}


package com.example.projet_IDEA.service;

import com.example.projet_IDEA.dto.AIRequestDTO;
import com.example.projet_IDEA.dto.IdeaDTO;
import com.example.projet_IDEA.entity.AIHistory;
import com.example.projet_IDEA.entity.User;
import com.example.projet_IDEA.repository.AIHistoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    private final AIHistoryRepository aiHistoryRepository;
    private final UserService userService;

    @Value("${mistral.api.key}")
    private String apiKey;

    private final String URL = "https://api.mistral.ai/v1/chat/completions";

    public AIService(AIHistoryRepository aiHistoryRepository, UserService userService) {
        this.aiHistoryRepository = aiHistoryRepository;
        this.userService = userService;
    }

    public List<IdeaDTO> generateIdea(AIRequestDTO request) {

        User user = userService.getUserById(request.getUserId());

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String levelInstruction;

        if ("random".equalsIgnoreCase(request.getLevel())) {
            levelInstruction = "Choisis aléatoirement entre beginner, intermediate ou advanced pour chaque idée.";
        } else {
            levelInstruction = "Toutes les idées doivent être de niveau : " + request.getLevel();
        }

        String userPrompt = request.getPrompt();

        if (userPrompt == null || userPrompt.trim().isEmpty()) {
            userPrompt = "Génère des idées de projets modernes en programmation (web, mobile, IA, SaaS).";

        }
        // 🔥 PROMPT MODERNE
        String prompt =
                userPrompt + "\n\n" +
                        "Tu dois générer EXACTEMENT " + request.getNbIdeas() + " idées de projets .\n\n" +
                        "Niveau de difficulté : " + levelInstruction + "\n\n" +
                        "Réponds UNIQUEMENT en JSON valide.\n\n" +
                        "Format :\n" +
                        "[\n" +
                        "  {\n" +
                        "    \"title\": \"string\",\n" +
                        "    \"type\": \"string\",\n" +
                        "    \"description\": \"string\",\n" +
                        "    \"difficulty\": \"string\",\n" +
                        "    \"technologies\": [\"string\"],\n" +
                        "    \"duration\": \"string\",\n" +
                        "    \"features\": [\"string\"],\n" +
                        "    \"tasks\": [\"string\"]\n" +

                        "  }\n" +
                        "]";


        Map<String, Object> body = new HashMap<>();
        body.put("model", "mistral-small");

        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        body.put("messages", new Object[]{message});

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                URL,
                HttpMethod.POST,
                entity,
                Map.class
        );

        Map choices = ((List<Map>) response.getBody().get("choices")).get(0);
        Map messageResponse = (Map) choices.get("message");

        String aiText = (String) messageResponse.get("content");

        // 🔥 nettoyage markdown
        aiText = aiText.replace("```json", "")
                .replace("```", "")
                .trim();

        // 🔥 parse JSON
        ObjectMapper mapper = new ObjectMapper();
        List<IdeaDTO> ideas;

        try {
            ideas = mapper.readValue(aiText, new TypeReference<List<IdeaDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Erreur parsing IA: " + aiText);
        }

        // 🔥 sauvegarde
        AIHistory history = new AIHistory();
        history.setPrompt(request.getPrompt());
        history.setResponse(aiText);
        history.setUser(user);

        aiHistoryRepository.save(history);

        return ideas;
    }
}
