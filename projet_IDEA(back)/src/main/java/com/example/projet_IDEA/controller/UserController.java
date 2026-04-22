package com.example.projet_IDEA.controller;

import com.example.projet_IDEA.dto.LoginDTO;
import com.example.projet_IDEA.dto.UserDTO;
import com.example.projet_IDEA.entity.User;
import com.example.projet_IDEA.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 🔹 CREATE USER
    @PostMapping
    public User createUser(@RequestBody UserDTO dto) {
        return userService.createUser(dto);
    }

    // 🔹 GET ALL
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // 🔹 GET BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 🔹 DELETE
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User supprimé";
    }
    //Loginn
    @PostMapping("/login")
    public User login(@RequestBody LoginDTO dto) {
        return userService.login(dto.getUsername(), dto.getPassword());
    }

}
