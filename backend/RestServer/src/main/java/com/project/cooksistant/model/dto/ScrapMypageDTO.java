package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ScrapMypageDTO {
    private Long recipeId;
    private String image;
    private User user;
    private String cuisine;
    private String description;
}
