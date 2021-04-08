package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecipeIngredientFixDTO {
    private Long recipeIngredientId;
    private String amount;
    private String type;
}
