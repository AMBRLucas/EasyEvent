package com.easyEvent.easyEvent.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyEvent.easyEvent.DTO.EventDTO;
import com.easyEvent.easyEvent.DTO.GuessDTO;
import com.easyEvent.easyEvent.DTO.LoginDTO;
import com.easyEvent.easyEvent.DTO.UserDTO;
import com.easyEvent.easyEvent.model.User;
import com.easyEvent.easyEvent.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User create(User user){
        user.setId(null);
        userRepository.save(user);

        return user;
    }

    public UserDTO findById(String id){
        User rawUser = this.userRepository.findById(id).orElseThrow();

        List<EventDTO> eventList = rawUser.getEvents().stream().map((event)-> {

            List<GuessDTO> guessList = event.getGuess().stream().map((guess) -> {
                GuessDTO guessItem = new GuessDTO(guess.getId(), guess.getName(), guess.getPhone(), guess.getIsConfirmed());
                return guessItem;
            }).collect(Collectors.toList());

            EventDTO eventItem = new EventDTO(
                event.getId(), 
                event.getEventName(), 
                event.getDescription(), 
                event.getLocal(), 
                event.getDate(), 
                event.getUser().getUsername(),
                guessList, 
                event.getIsActive()
            );

            return eventItem;
        }).collect(Collectors.toList());

        UserDTO user = new UserDTO(rawUser.getId(), rawUser.getUsername(), eventList);

        return user;
    }

    public String login(LoginDTO data){
        User user = this.userRepository.findByUsernameAndPassword(data.getUsername(), data.getPassword()).orElseThrow();

        return user.getId();
    }
}
