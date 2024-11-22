package com.easyEvent.easyEvent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyEvent.easyEvent.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsernameAndPassword(String username, String password);   
}
