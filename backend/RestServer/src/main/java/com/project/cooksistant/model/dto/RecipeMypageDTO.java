package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeMypageDTO {
    private Long recipeId;
    private String image;
    private User user;
    private String cuisine;
    private String description;
}
