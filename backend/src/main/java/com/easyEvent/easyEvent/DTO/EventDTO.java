package com.easyEvent.easyEvent.DTO;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private String id;
    private String eventName;
    private String description;
    private String local;
    private LocalDate date;
    private String hostName;
    private List<GuessDTO> guessList;
    private Boolean isActive;
}
