package com.project.cooksistant.repository;

import com.project.cooksistant.model.entity.Ingredient;
import com.project.cooksistant.model.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {


    Ingredient findByIngredientId(Long ingredientId);

    Ingredient findByName(String ingredientName);
}
