package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecipeListupDTO {
    private String url;
    private String description;
    private Double favor;
    private String recipename;
    private Long recipeId;
}
