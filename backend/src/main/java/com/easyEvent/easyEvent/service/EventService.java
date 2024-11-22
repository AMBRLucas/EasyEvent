package com.easyEvent.easyEvent.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyEvent.easyEvent.DTO.EventDTO;
import com.easyEvent.easyEvent.DTO.GuessDTO;
import com.easyEvent.easyEvent.DTO.UpdateEventDTO;
import com.easyEvent.easyEvent.model.Event;
import com.easyEvent.easyEvent.repository.EventRepository;

@Service
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event){
        event.setId(null);
        event.setIsActive(true);

        this.eventRepository.save(event);

        return event;
    }

    public EventDTO findEventById(String id){
        Event rawEvent = this.eventRepository.findById(id).orElseThrow();

        List<GuessDTO> guessList = rawEvent.getGuess().stream().map((guess) -> {
            GuessDTO guessItem = new GuessDTO(guess.getId(), guess.getName(), guess.getPhone(), guess.getIsConfirmed());
            return guessItem;
        }).collect(Collectors.toList());

        EventDTO event = new EventDTO(
            rawEvent.getId(), 
            rawEvent.getEventName(), 
            rawEvent.getDescription(), 
            rawEvent.getLocal(), 
            rawEvent.getDate(), 
            rawEvent.getUser().getUsername(),
            guessList, 
            rawEvent.getIsActive()
        );

        return event;
    }

    
    public void UpdateEvent(String id, UpdateEventDTO data){
        Event event = this.eventRepository.findById(id).orElseThrow();

        event.setEventName(data.getEventName());
        event.setDescription(data.getDescription());
        event.setLocal(data.getLocal());
        event.setDate(data.getDate());

        this.eventRepository.save(event);
    }

    public void concludeEvent(String id){
        Event event = this.eventRepository.findById(id).orElseThrow();

        event.setIsActive(false);

        this.eventRepository.save(event);
    }

    public void cancelEvent(String id){
        Event event = this.eventRepository.findById(id).orElseThrow();

        this.eventRepository.deleteById(event.getId());
    }

}
