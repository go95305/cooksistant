package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@ToString
public class RecipeClickDTO {
    private Long recipeId;
    private Long userId;
}
