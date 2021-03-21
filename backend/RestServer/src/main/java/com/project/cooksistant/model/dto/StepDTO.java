package com.project.cooksistant.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StepDTO {
    private Long id;
    private String stepDescription;
    private String image;
    private Long level;
}
