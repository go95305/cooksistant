package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class RecipeDTOpost {
    private String cookingTime;
    private String cuisine;
    private String description;
    private String nickname;
    private String image;
    private String level;
    private String serving;
    private List<StepDTOpost> stepDTOpostList = new ArrayList<>();//레시피의 진행 과정
    private List<IngredientDTOpost> ingredientDTOpostList = new ArrayList<>(); //재료 리스트
}
