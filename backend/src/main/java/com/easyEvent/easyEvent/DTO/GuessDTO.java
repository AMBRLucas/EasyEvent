package com.easyEvent.easyEvent.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GuessDTO {
    private String id;
    private String name;
    private String phone;
    private Boolean isConfirmed;
}
