package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.Scrap;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {

    List<Scrap> findAllByUser(User user);

    Scrap findByRecipeAndUser(Optional<Recipe> recipe, User user);
}
