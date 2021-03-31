package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecipeListupDTO {
    private String url;
    private String description;
    private float favor;
    private String recipename;
    private Long recipeId;
}
