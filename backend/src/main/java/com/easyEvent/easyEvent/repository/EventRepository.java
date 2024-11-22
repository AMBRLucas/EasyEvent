package com.easyEvent.easyEvent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyEvent.easyEvent.model.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    
}
