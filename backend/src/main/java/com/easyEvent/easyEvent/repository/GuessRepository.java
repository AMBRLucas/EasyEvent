package com.easyEvent.easyEvent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyEvent.easyEvent.model.Guess;

@Repository
public interface GuessRepository extends JpaRepository<Guess, String> {
    
}
