package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient,Long> {
    List<RecipeIngredient> findAllByRecipe(Optional<Recipe> recipe);
}
