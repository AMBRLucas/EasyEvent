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

import com.easyEvent.easyEvent.DTO.EventDTO;
import com.easyEvent.easyEvent.DTO.UpdateEventDTO;
import com.easyEvent.easyEvent.model.Event;
import com.easyEvent.easyEvent.service.EventService;

@Controller
@RequestMapping("/event")
public class EventController {
    
    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> create(@RequestBody Event event){
        this.eventService.createEvent(event);

        return ResponseEntity.ok().body(event);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> findEventById(@PathVariable String id){
        EventDTO event = this.eventService.findEventById(id);

        return ResponseEntity.ok().body(event);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable String id, @RequestBody UpdateEventDTO data){
        this.eventService.UpdateEvent(id, data);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/conclude/{id}")
    public ResponseEntity<Void> concludeEvent(@PathVariable String id){
        this.eventService.concludeEvent(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelEvent(@PathVariable String id){
        this.eventService.cancelEvent(id);

        return ResponseEntity.noContent().build();
    }
}

