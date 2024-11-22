package com.easyEvent.easyEvent.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEventDTO {
    private String eventName;
    private String description;
    private String local;
    private LocalDate date;
}
