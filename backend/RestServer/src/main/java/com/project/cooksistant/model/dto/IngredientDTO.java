package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientDTO {
    private Long ingredientId;
    private String ingredientName;
    private String amount;
    private String isType;
}
