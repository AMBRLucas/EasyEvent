package com.easyEvent.easyEvent.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = Event.TABLE_NAME)
@Data
public class Event {
    public static final String TABLE_NAME = "event";

    @Id
    @Column(name = "id", unique = true)
    private String id;

    @Column(name = "eventName", length = 100, nullable = false)
    @NotBlank
    private String eventName;

    @Column(name = "description", length = 250, nullable = false)
    @NotBlank
    private String description;

    @Column(name = "local", length = 250, nullable = false)
    @NotBlank
    private String local;

    @Column(name = "date", nullable = false)
    private LocalDate date;
    
    @Column(name = "isActive")
    private Boolean isActive;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Guess> guess;

    @PrePersist
    public void generateId() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        this.id = LocalDateTime.now().format(formatter);
    }
}
