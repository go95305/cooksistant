package com.project.cooksistant.model.dto;

public class EvaluationDTO {
    private Long recipeId;
    private Long uid;
    private Long  bitterness;
    private Long saltiness;
    private Long sourness;
    private Long spiciness;
    private Long sweetness;
    private boolean isSampled; //tts가 시작된순간
    private boolean isComplete; //완전히 평가를 끝내면
}
