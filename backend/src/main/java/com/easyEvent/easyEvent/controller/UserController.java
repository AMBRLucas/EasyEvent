package com.easyEvent.easyEvent.controller;

import com.easyEvent.easyEvent.DTO.LoginDTO;
import com.easyEvent.easyEvent.DTO.UserDTO;
import com.easyEvent.easyEvent.model.User;
import com.easyEvent.easyEvent.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService; 

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user){
        this.userService.create(user);

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable String id){
        UserDTO user = this.userService.findById(id);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO data){
        String userID = this.userService.login(data);

        return ResponseEntity.ok().body(userID);
    }
    
}
