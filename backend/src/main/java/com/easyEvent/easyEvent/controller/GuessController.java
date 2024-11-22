package com.easyEvent.easyEvent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.easyEvent.easyEvent.DTO.GuessDTO;
import com.easyEvent.easyEvent.DTO.UpdateGuessDTO;
import com.easyEvent.easyEvent.model.Guess;
import com.easyEvent.easyEvent.service.GuessService;

@Controller
@RequestMapping("/guess")
public class GuessController {
    
    @Autowired
    private GuessService guessService;

    @PostMapping
    public ResponseEntity<Guess> createGuess(@RequestBody Guess guess){
        Guess newGuess = this.guessService.create(guess);

        return ResponseEntity.ok().body(newGuess);
    }


    @GetMapping("/{id}")
    public ResponseEntity<GuessDTO> findById(@PathVariable String id){
        GuessDTO guess = this.guessService.findById(id);

        return ResponseEntity.ok().body(guess);
    }

    @PutMapping("/confirm/{id}")
    public ResponseEntity<Void> confirmPresence(@PathVariable String id){
        this.guessService.confirmPresence(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateGuess(@PathVariable String id, @RequestBody UpdateGuessDTO data){
        this.guessService.UpdateGuess(id, data);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id){
        this.guessService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
