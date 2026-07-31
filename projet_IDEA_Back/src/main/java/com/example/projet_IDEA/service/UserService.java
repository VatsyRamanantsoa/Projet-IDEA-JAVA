package com.example.projet_IDEA.service;

import com.example.projet_IDEA.dto.UserDTO;
import com.example.projet_IDEA.entity.User;
import com.example.projet_IDEA.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔹 CREATE
    public User createUser(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());

        return userRepository.save(user);
    }

    // 🔹 GET ALL
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 GET BY ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 🔹 DELETE
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User login(String username, String password) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Wrong password");
        }

        return user;
    }

}


