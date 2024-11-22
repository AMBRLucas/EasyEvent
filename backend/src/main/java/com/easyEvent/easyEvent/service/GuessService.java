package com.easyEvent.easyEvent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyEvent.easyEvent.DTO.GuessDTO;
import com.easyEvent.easyEvent.DTO.UpdateGuessDTO;
import com.easyEvent.easyEvent.model.Guess;
import com.easyEvent.easyEvent.repository.GuessRepository;

@Service
public class GuessService {
    
    @Autowired
    private GuessRepository guessRepository;

    public Guess create(Guess guess){
        guess.setId(null);
        guess.setIsConfirmed(false);

        this.guessRepository.save(guess);

        return guess;
    }


    public GuessDTO findById(String id){
        Guess rawGuess = this.guessRepository.findById(id).orElseThrow();

        GuessDTO guess = new GuessDTO(
            rawGuess.getId(), 
            rawGuess.getName(),
            rawGuess.getPhone(), 
            rawGuess.getIsConfirmed()
        );        

        return guess;
    }

    public void deleteById(String id){
        this.guessRepository.deleteById(id);
    }

    public void confirmPresence(String id){
        Guess guess = this.guessRepository.findById(id).orElseThrow();

        guess.setIsConfirmed(true);

        this.guessRepository.save(guess);
    }

    public void UpdateGuess(String id, UpdateGuessDTO data){
        Guess guess = this.guessRepository.findById(id).orElseThrow();

        guess.setName(data.getName());
        guess.setPhone(data.getPhone());

        this.guessRepository.save(guess);
    }
}
