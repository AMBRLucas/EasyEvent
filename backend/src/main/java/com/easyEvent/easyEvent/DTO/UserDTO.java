package com.easyEvent.easyEvent.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String username;
    private List<EventDTO> events;
}
