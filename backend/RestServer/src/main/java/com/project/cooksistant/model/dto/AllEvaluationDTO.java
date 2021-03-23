package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllEvaluationDTO {
    private String cuisine;
    private Long recipe_id;
    private Boolean favor;
    private Boolean isSampled;
    private Boolean isComplete;

}
