package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.Step;
import com.project.cooksistant.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StepRepository extends JpaRepository<Step,Long> {
    List<Step> findAllByRecipe(Optional<Recipe> recipe);
    Step findAllByRecipeAndLevel(Optional<Recipe> recipe, Long level);
}
