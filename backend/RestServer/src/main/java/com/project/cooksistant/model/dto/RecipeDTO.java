package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.RecipeIngredient;
import com.project.cooksistant.model.entity.Step;
import com.project.cooksistant.model.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class RecipeDTO {
    private Long recipeId;
    private String nickname;
    private String cuisine;
    private String description;
    private String cookingTime;
    private String image;
    private String level;
    private String serving;
    private List<IngredientDTO> ingredientDTOList = new ArrayList<>();
    private List<StepDTO> stepList = new ArrayList<>();
}
