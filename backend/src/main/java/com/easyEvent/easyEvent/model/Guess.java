package com.easyEvent.easyEvent.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = Guess.TABLE_NAME)
@Data
public class Guess {
    public static final String TABLE_NAME = "guess";

    @Id
    @Column(name = "id", unique = true)
    private String id;

    @Column(name = "name", length = 100, nullable = false)
    @NotBlank
    private String name;

    @Column(name = "phone", length = 100, nullable = false)
    @NotBlank
    private String phone;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "isConfirmed")
    private Boolean isConfirmed;

    @PrePersist
    public void generateId() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        this.id = LocalDateTime.now().format(formatter);
    }
}
