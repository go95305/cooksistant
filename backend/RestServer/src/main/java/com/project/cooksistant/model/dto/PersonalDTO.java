package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.Recipe;
import com.project.cooksistant.model.entity.Scrap;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PersonalDTO {
    private Long userId;
    private String nickname;
    private Long saltiness;
    private Long sourness;
    private Long spiciness;
    private Long sweetness;
    private Long bitterness;
    List<ScrapMypageDTO> scrapList = new ArrayList<>();
    List<RecipeMypageDTO> recipeList = new ArrayList<>();

}
