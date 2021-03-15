package com.project.cooksistant.service;

import com.project.cooksistant.model.entity.User;
import com.project.cooksistant.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class RecipeService {
    Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @PersistenceContext
    EntityManager entityManager;
    private final UserRepository userRepository;

    public RecipeService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> findRecipeName() {
        List<User> list = userRepository.findAll();
        return list;
    }
}
