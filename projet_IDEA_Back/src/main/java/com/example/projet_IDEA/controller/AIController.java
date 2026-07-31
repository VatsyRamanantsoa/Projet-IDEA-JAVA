//package com.example.projet_IDEA.controller;
//
//import com.example.projet_IDEA.dto.AIRequestDTO;
//import com.example.projet_IDEA.dto.AIResponseDTO;
//import com.example.projet_IDEA.service.AIService;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/ai")
//@CrossOrigin
//public class AIController {
//
//    private final AIService aiService;
//
//    public AIController(AIService aiService) {
//        this.aiService = aiService;
//    }
//
//    // 🔥 GENERATE IDEA
//    @PostMapping("/generate")
//    public AIResponseDTO generateIdea(@RequestBody AIRequestDTO request) {
//        return aiService.generateIdea(request);
//    }
//}


package com.example.projet_IDEA.controller;

import com.example.projet_IDEA.dto.AIRequestDTO;
import com.example.projet_IDEA.dto.IdeaDTO;
import com.example.projet_IDEA.service.AIService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate")
    public List<IdeaDTO> generateIdea(@RequestBody AIRequestDTO request) {
        return aiService.generateIdea(request);
    }
}
