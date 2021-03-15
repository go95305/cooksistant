package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipeDTO {
    private Long recipeId;
    private String cookingTime;
    private String cuisine;
    private String description;
    private String image;
    private String level;
    private String serving;
    private List<StepDTO> stepDTOList;//레시피의 진행 과정
    private Long saltiness; //해당 레시피의 평균 맛평가
    private Long sourness;//해당 레시피의 평균 맛평가
    private Long spiciness;//해당 레시피의 평균 맛평가
    private Long sweetness;//해당 레시피의 평균 맛평가
    private List<IngredientDTO> ingredientDTOList; //재료 리스트
}
