package com.project.cooksistant.model.dto;

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

    private String cookingTime;

    private String cuisine;

    private String description;

    private Long userId;

    private String image;

    private String level;

    private String serving;

    private List<StepDTO> stepDTOList = new ArrayList<>();//레시피의 진행 과정

    private List<IngredientDTO> ingredientDTOList = new ArrayList<>(); //재료 리스트
}
