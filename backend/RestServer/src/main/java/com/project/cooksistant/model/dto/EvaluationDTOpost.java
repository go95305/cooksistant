package com.project.cooksistant.model.dto;

import com.project.cooksistant.model.entity.EvaluationKeyword;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EvaluationDTOpost {
    private Long recipeId;
    private Long userId;
    private float favor;
    private List<String> keywordList = new ArrayList<>();
    private boolean isSampled; //tts가 시작된순간
    private boolean isComplete; //완전히 평가를 끝내면
}
