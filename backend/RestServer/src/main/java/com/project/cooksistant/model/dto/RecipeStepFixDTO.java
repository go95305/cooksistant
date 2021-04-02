package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecipeStepFixDTO {
    private Long stepId;
    private String description;
    private Long level;
}
