package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EvaluationDTOpostUpdate {
    private Long recipeId;
    private Long userId;
    private float favor;
    private Boolean isUpdate;
    private Long evaluationId;
    private List<String> keywordList = new ArrayList<>();
//    private Boolean isSampled; //tts가 시작된순간
    private Boolean isComplete; //완전히 평가를 끝내면
}
