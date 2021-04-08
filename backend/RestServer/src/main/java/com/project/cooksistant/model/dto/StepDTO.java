package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StepDTO {
    private Long stepId;
    private String description;
    private String image;
    private Long level;
}
