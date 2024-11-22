package com.easyEvent.easyEvent.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Table(name = User.TABLE_NAME)
@Data
public class User {
    
    public static final String TABLE_NAME = "user";

    @Id
    @Column(name = "id", unique = true)
    private String id;

    @Column(name = "username", length = 100, nullable = false, unique = true)
    @NotBlank
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    @NotBlank
    @Size(min = 4, max = 100)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> events;

    @PrePersist
    public void generateId() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        this.id = LocalDateTime.now().format(formatter);
    }
}
