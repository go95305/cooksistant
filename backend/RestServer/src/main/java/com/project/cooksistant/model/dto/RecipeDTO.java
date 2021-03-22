package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.RecipeIngredient;
import com.project.cooksistant.model.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecipeDTO {
    private Long recipeId;
    private User user;
    private String cuisine;
    private String description;
    private String cookingTime;
    private List<RecipeIngredient> hasIngredients = new ArrayList<>();
    private String image;
    private String level;
    private String serving;
}
