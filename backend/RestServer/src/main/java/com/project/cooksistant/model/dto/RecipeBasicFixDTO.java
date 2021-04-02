package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeBasicFixDTO {
    private Long recipId;
    private String description;
    private String cuisine;
    private String cookingTime;
}
