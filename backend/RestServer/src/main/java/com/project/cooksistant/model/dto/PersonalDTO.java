package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.Keyword;
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
    private int scrapSize;
    private Long recipeUsedSize;
    private Long evaluatedSize;
    List<ScrapMypageDTO> scrapList = new ArrayList<>();
    List<RecipeMypageDTO> recipeList = new ArrayList<>();


}
