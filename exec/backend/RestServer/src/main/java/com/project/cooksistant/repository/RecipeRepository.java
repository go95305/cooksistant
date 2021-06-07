package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findAllByUser(User user);
    List<Recipe> findByCuisineContaining(String cuisine);
}
